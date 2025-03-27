import { withDraw } from '@/queries/affilate.api';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select
} from 'antd';
import React, { FC, useEffect, useRef, useState } from 'react';

export const RequestWithdraw: FC = ({ getData, profile }) => {
  console.log(profile);
  const [isModal, setIsModal] = useState(false);
  const [form] = Form.useForm();
  const [urlLogo, setUrlLogo] = useState(null);
  const timeoutRef = useRef(null);
  // const [options, setOptions] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [dataOption, setDataOption] = useState([]);

  // const fetchCompanyTypes = async () => {
  //   setLoading(true);
  //   APIgetIdCam().then((data) => {
  //     // setDataOption(data.data?.data);
  //     setOptions(
  //       data.data?.data
  //         .filter((item) => item.admin_approve == 1)
  //         .map((item) => ({
  //           label: `${item.id}. ${item.name}`,
  //           value: item.id,
  //         }))
  //     );
  //     console.log(data);
  //   });

  //   setLoading(false);
  // };

  // const handleDropdownVisibleChange = (open) => {
  //   if (open && options.length === 0) {
  //     fetchCompanyTypes();
  //   }
  // };

  const showModal = () => {
    // GET LABEL Ở ĐÂY LUÔN NÈ
    form.setFieldValue(
      'bank',
      ` ${profile?.bankBranch}-${profile?.bankName}-${profile?.bankAccountNumber}-${profile?.firstName}${profile?.lastName}`
    );
    setIsModal(true);
  };

  // const handleChange = (event) => {
  //   const newValue = event.target.value;

  //   // Xóa timeout cũ nếu có
  //   clearTimeout(timeoutRef.current);

  //   // Thiết lập timeout mới
  //   timeoutRef.current = setTimeout(() => {
  //     setUrlLogo(event.target.value);
  //   }, 1000); // Thay đổi sau 3 giây
  // };

  const handleCancel = () => {
    setIsModal(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
    const model = {
      amount: values.amount
    };
    console.log(model);
    withDraw(model)
      .then((data) => {
        console.log(data);
        message.success('Bạn đã tạo đơn rút tiền thành công');
        handleCancel();
        getData();
      })
      .catch((error) => {
        console.log(error);
        // message.error(error.response?.data?.msg);
      });
  };
  useEffect(() => {}, []);
  return (
    <>
      <Modal
        title="Tạo đơn rút tiền"
        visible={isModal}
        onCancel={handleCancel}
        width={1000}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,

          <Button
            type="primary"
            onClick={() => {
              form.submit();
            }}
          >
            Confirm
          </Button>
        ]}
      >
        <div style={{ width: '100%', margin: 'auto' }}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="amount"
                  label="Số tiền"
                  rules={[
                    {
                      required: true,
                      message: 'Hãy nhập số tiền muốn rút'
                    }
                  ]}
                >
                  <Input placeholder="Nhập số tiền muốn rút " />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="bank"
                  label="Tài khoản ngân hàng"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Summary of New Post!'
                    }
                  ]}
                >
                  <Input placeholder="Tài khoản ngân hàng" readOnly />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
      <button
        onClick={() => showModal()}
        className="mt-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 font-montserrat font-semibold text-white shadow-lg transition hover:scale-105"
      >
        Tạo đơn rút tiền
      </button>
    </>
  );
};
