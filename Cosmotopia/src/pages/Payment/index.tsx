import BasePages from '@/components/shared/base-pages.js';
import OrderInfo from './OrderInfo';
import { MapPin } from 'lucide-react';
import PaymentMethods from './PaymentMethod';
import { getAccountSelf, postOrder, postPayment } from '@/queries/user.api';
import { useEffect, useState } from 'react';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import axios from 'axios';
import { dataAddressJSOn } from '@/store/dataAddress';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Payment() {
  const location = useLocation();
  const products = location.state;
  const navigate = useNavigate();
  console.log(products);

  const [user, setUser] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [address, setAddress] = useState({
    district: 'Thành phố Thủ Đức',
    ward: 'Phường Long Thạnh Mỹ',
    house: 'VinHome s10.02'
  });
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(selectedDistrict, selectedWard);
    const modelAdress = {
      district: values.district,
      ward: values.ward,
      house: values.house
    };
    setAddress(modelAdress);
    setVisible(false);
  };
  const textAddress = `${address.house}, ${address.ward}, ${address.district}, TPHCM`;
  const PostOrder = () => {
    const model = {
      orderDetails: products.map((product) => ({
        productId: product.productId,
        quantity: product.quantity
      })),
      address: textAddress,
      paymentMethod: 'payment'
    };
    console.log(model);
    postOrder(model)
      .then((order) => {
        console.log(order);
        const modelPayemnt = {
          orderId: order.orderId,
          amount: order.totalAmount,
          returnUrl: '',
          paymentMethod: 'Vnpay'
        };
        postPayment(modelPayemnt).then((data) => {
          console.log(data);
          message.success('oke');
          navigate('/success', {
            state: {
              type: 'Đặt hàng',
              url: data.paymentUrl
            }
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    console.log('dknn');
    console.log(dataAddressJSOn.districts);
    getAccountSelf()
      .then((data) => {
        console.log(data);
        setUser(data?.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    if (visible) {
      setSelectedDistrict(address.district);
      setSelectedWard(address.ward);
      form.setFieldsValue({
        house: address.house,
        district: address.district,
        ward: address.ward
      });
    }
  }, [visible]);
  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  return (
    <>
      <BasePages className="relative mx-auto max-h-screen w-[80%] p-4">
        <h2 className="mb-8 ml-4 bg-gradient-to-r from-[#936EFF] to-[#936EFF] bg-clip-text   font-montserrat text-2xl text-3xl font-bold capitalize text-[#3D3D3D] text-transparent">
          Xem trước thông tin đơn hàng
        </h2>
        <div className="mb-8 flex  w-full items-start justify-between gap-10">
          <div className="flex w-2/5 min-w-[400px] flex-col gap-5">
            <OrderInfo />
          </div>
          <div className="flex w-4/5 flex-col gap-5 rounded-md">
            <div className="flex h-2/5 flex-row rounded-md bg-white p-5 shadow-lg ">
              <div className="flex w-full flex-col">
                <div className="flex w-full flex-row items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center">
                    <MapPin className="h-5 w-5 stroke-[1.5px] text-[#4E4663]" />
                  </div>
                  <span className="font-montserrat text-[22px] font-medium text-[#4E4663]">
                    Địa chỉ
                  </span>
                </div>

                <div className="flex w-full flex-row items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    <h3 className="font-montserrat text-[22px] font-normal text-[#4E4663]">
                      {user?.firstName +
                        ' ' +
                        user?.lastName +
                        ' ' +
                        user?.phone}
                    </h3>
                    <p className="font-montserrat text-base font-normal text-[#837D92]">
                      {textAddress}
                    </p>
                  </div>
                  <button
                    className="font-montserrat text-lg font-normal text-[#936EFF]"
                    onClick={() => setVisible(true)}
                  >
                    Thay đổi
                  </button>
                </div>
              </div>
            </div>
            <div className="flex h-4/5 flex-row rounded-md bg-white p-5 shadow-lg">
              <PaymentMethods ConfirmPayMent={PostOrder} />
            </div>
          </div>
        </div>
        <Modal
          title="Chọn địa chỉ"
          open={visible}
          onCancel={handleCancel}
          footer={
            <>
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>
              ,
              <Button
                type="primary"
                onClick={() => {
                  form.submit();
                }}
              >
                Confirm
              </Button>
            </>
          }
        >
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: ''
                }
              ]}
              label="Thành phố"
            >
              <Select disabled placeholder="Chọn quận/huyện" value={'TPHCM'} />
            </Form.Item>
            <Form.Item
              name="district"
              rules={[
                {
                  required: true,
                  message: ''
                }
              ]}
              label="Quận/Huyện"
              required
            >
              <Select
                placeholder="Chọn quận/huyện"
                onChange={(value) => {
                  setSelectedDistrict(value);
                  form.setFieldValue('ward', null); // Reset phường khi đổi quận
                }}
              >
                {dataAddressJSOn.districts.map((district) => (
                  <Select.Option key={district.code} value={district.name}>
                    {district.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            {/* Chọn Phường/Xã */}
            <Form.Item
              rules={[
                {
                  required: true,
                  message: ''
                }
              ]}
              name="ward"
              label="Phường/Xã"
              required
            >
              <Select
                placeholder="Chọn phường/xã"
                value={selectedWard}
                // onChange={(value) => setSelectedWard(value)}
                disabled={!selectedDistrict}
              >
                {selectedDistrict &&
                  dataAddressJSOn.districts
                    .find((d) => d.name === selectedDistrict)
                    ?.wards.map((ward) => (
                      <Select.Option key={ward.code} value={ward.name}>
                        {ward.name}
                      </Select.Option>
                    ))}
              </Select>
            </Form.Item>

            {/* Nhập số nhà */}
            <Form.Item
              rules={[
                {
                  required: true,
                  message: ''
                }
              ]}
              label="Số nhà, đường"
              name="house"
              required
            >
              <Input placeholder="Nhập số nhà, tên đường" />
            </Form.Item>
          </Form>
        </Modal>
        {/* <Footer /> */}
      </BasePages>
    </>
  );
}
