import { RootState } from '@/redux/store';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Steps
} from 'antd';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import helper from '@/helpers/index';
import { registerAffiliate } from '@/queries/affilate.api';
import { Card } from '@/components/ui/card';
import { RocketIcon } from 'lucide-react';
import { sSpin } from '@/store/spin';
const banks = [
  { label: 'Ngân hàng TMCP Ngoại thương Việt Nam (Vietcombank)', value: 'VCB' },
  { label: 'Ngân hàng TMCP Công Thương Việt Nam (VietinBank)', value: 'CTG' },
  { label: 'Ngân hàng TMCP Kỹ Thương Việt Nam (Techcombank)', value: 'TCB' },
  {
    label: 'Ngân hàng TMCP Đầu tư và Phát triển Việt Nam (BIDV)',
    value: 'BID'
  },
  {
    label: 'Ngân hàng Nông nghiệp và Phát triển Nông thôn (Agribank)',
    value: 'AGR'
  },
  { label: 'Ngân hàng TMCP Quân đội (MB Bank)', value: 'MBB' },
  { label: 'Ngân hàng TMCP Á Châu (ACB)', value: 'ACB' },
  { label: 'Ngân hàng TMCP Sài Gòn Thương Tín (Sacombank)', value: 'STB' },
  { label: 'Ngân hàng TMCP Tiên Phong (TPBank)', value: 'TPB' },
  { label: 'Ngân hàng TMCP Việt Nam Thịnh Vượng (VPBank)', value: 'VPB' }
];
const provinces = [
  { label: 'Hà Nội', value: 'HN' },
  { label: 'TP. Hồ Chí Minh', value: 'HCM' },
  { label: 'Đà Nẵng', value: 'DN' },
  { label: 'Hải Phòng', value: 'HP' },
  { label: 'Cần Thơ', value: 'CT' },
  { label: 'An Giang', value: 'AG' },
  { label: 'Bà Rịa - Vũng Tàu', value: 'VT' },
  { label: 'Bắc Giang', value: 'BG' },
  { label: 'Bắc Kạn', value: 'BK' },
  { label: 'Bạc Liêu', value: 'BL' },
  { label: 'Bắc Ninh', value: 'BN' },
  { label: 'Bến Tre', value: 'BT' },
  { label: 'Bình Định', value: 'BĐ' },
  { label: 'Bình Dương', value: 'BD' },
  { label: 'Bình Phước', value: 'BP' },
  { label: 'Bình Thuận', value: 'BTH' },
  { label: 'Cà Mau', value: 'CM' },
  { label: 'Cao Bằng', value: 'CB' },
  { label: 'Đắk Lắk', value: 'DL' },
  { label: 'Đắk Nông', value: 'DN' },
  { label: 'Điện Biên', value: 'DB' },
  { label: 'Đồng Nai', value: 'ĐN' },
  { label: 'Đồng Tháp', value: 'ĐT' },
  { label: 'Gia Lai', value: 'GL' },
  { label: 'Hà Giang', value: 'HG' },
  { label: 'Hà Nam', value: 'HNa' },
  { label: 'Hà Tĩnh', value: 'HT' },
  { label: 'Hải Dương', value: 'HD' },
  { label: 'Hậu Giang', value: 'HG' },
  { label: 'Hòa Bình', value: 'HB' },
  { label: 'Hưng Yên', value: 'HY' },
  { label: 'Khánh Hòa', value: 'KH' },
  { label: 'Kiên Giang', value: 'KG' },
  { label: 'Kon Tum', value: 'KT' },
  { label: 'Lai Châu', value: 'LC' },
  { label: 'Lâm Đồng', value: 'LĐ' },
  { label: 'Lạng Sơn', value: 'LS' },
  { label: 'Lào Cai', value: 'LC' },
  { label: 'Long An', value: 'LA' },
  { label: 'Nam Định', value: 'NĐ' },
  { label: 'Nghệ An', value: 'NA' },
  { label: 'Ninh Bình', value: 'NB' },
  { label: 'Ninh Thuận', value: 'NT' },
  { label: 'Phú Thọ', value: 'PT' },
  { label: 'Quảng Bình', value: 'QB' },
  { label: 'Quảng Nam', value: 'QN' },
  { label: 'Quảng Ngãi', value: 'QNG' },
  { label: 'Quảng Ninh', value: 'QNH' },
  { label: 'Quảng Trị', value: 'QT' },
  { label: 'Sóc Trăng', value: 'ST' },
  { label: 'Sơn La', value: 'SL' },
  { label: 'Tây Ninh', value: 'TN' },
  { label: 'Thái Bình', value: 'TB' },
  { label: 'Thái Nguyên', value: 'TN' },
  { label: 'Thanh Hóa', value: 'TH' },
  { label: 'Thừa Thiên Huế', value: 'TTH' },
  { label: 'Tiền Giang', value: 'TG' },
  { label: 'Trà Vinh', value: 'TV' },
  { label: 'Tuyên Quang', value: 'TQ' },
  { label: 'Vĩnh Long', value: 'VL' },
  { label: 'Vĩnh Phúc', value: 'VP' },
  { label: 'Yên Bái', value: 'YB' }
];
interface RegisterAffiliateProps {}
const { Step } = Steps;
export const RegisterAffiliate: FC<RegisterAffiliateProps> = ({}) => {
  const [current, setCurrent] = useState(0);
  const [agreed, setAgreed] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const auth = useSelector((state: RootState) => state.auth.isLogin);
  const [form] = Form.useForm();
  const next = () => setCurrent(current + 1);
  const prev = () => {
    current == 1 && setAgreed(false);
    setCurrent(current - 1);
  };
  const userObject = auth
    ? JSON.parse(helper.cookie_get('user'))
    : { role: 'Guest' };
  // const userObject = { role: 'Affiliates' };
  const role = userObject?.role ?? 'Guest';
  console.log(role);
  const onFinish = (values) => {
    sSpin.set(true);
    const model = {
      bankName: values.bankName,
      bankAccountNumber: values.bankAccountNumber,
      bankBranch: values.bankBranch
    };
    console.log(model);
    registerAffiliate(model)
      .then((data) => {
        console.log(data);
        helper.cookie_set(
          'user',
          JSON.stringify({ ...userObject, role: 'Affiliates' })
        );
        next();
        message.success('Bạn đã đăng ký trở thành affiliate thành công');
      })
      .catch((err) => {
        message.error('Something went wrong');
      })
      .finally(() => {
        sSpin.set(false);
      });
  };

  return (
    <>
      <Modal
        width={800}
        open={isShow}
        onCancel={() => setIsShow(false)}
        footer={null}
        title="Đăng ký trở thành Affiliate"
      >
        <Steps current={current} className="mt-10">
          <Step title="Bước 1" description="Giới thiệu Affiliate" />
          <Step title="Bước 2" description="Điền thông tin" />
          <Step title="Hoàn tất đăng ký" />
        </Steps>

        <div className="flex justify-center" style={{ marginTop: 24 }}>
          {current === 0 && (
            <label>
              <div>
                <h2 className="text-center text-2xl font-bold text-[#FDCD3C]">
                  🌟 Cosmotopia Affiliate – Kiếm Tiền Từ Đam Mê Làm Đẹp
                </h2>
                <p className="mt-2  text-gray-600">
                  <b>Cosmotopia Affiliate</b> là chương trình dành cho những ai
                  yêu thích mỹ phẩm và muốn kiếm tiền dễ dàng từ việc chia sẻ
                  sản phẩm.
                </p>
                <div className="bg-yellow-50 mt-4   w-full  rounded-lg p-5 px-2 text-left shadow-lg">
                  <p className="flex items-center gap-2 text-gray-700">
                    💎 <b>Hoa hồng hấp dẫn</b> – Nhận ngay khi có đơn hàng thành
                    công.
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-gray-700">
                    🚀 <b>Dễ dàng tham gia</b> – Chỉ cần có tài khoản ngân hàng.
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-gray-700">
                    ✨ <b>Tự do chia sẻ</b> – Không cần nhập hàng, chỉ cần tạo
                    link.
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-gray-700">
                    💰 <b>Thanh toán nhanh chóng</b> – Rút hoa hồng về stk ngân
                    hàng trong ngày.
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-4"
              />
              Tôi đồng ý với điều khoản
            </label>
          )}
        </div>

        <Form
          style={{ display: current == 1 ? '' : 'none' }}
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Row gutter={24}>
            <Col span={24}>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="bankName"
                    label="Tên ngân hàng"
                    rules={[
                      {
                        required: true,
                        message: 'Please Enter Bank Name of User!'
                      }
                    ]}
                  >
                    <Select
                      placeholder="Chọn ngân hàng"
                      options={banks}
                      className="w-full"
                      showSearch
                      optionFilterProp="label"
                      // Chỉ chọn chi nhánh khi đã chọn ngân hàng
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="bankAccountNumber"
                    label="Số tài khoản"
                    rules={[
                      {
                        required: true,
                        message: 'Please Enter AccountNumber of User!'
                      }
                    ]}
                  >
                    <Input placeholder="Enter AccountNumber" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    name="bankBranch"
                    label="Chi nhánh"
                    rules={[
                      {
                        required: true,
                        message: 'Please Enter bank Branch of User!'
                      }
                    ]}
                  >
                    <Select
                      placeholder="Chọn chi nhánh"
                      options={provinces}
                      className="w-full"
                      showSearch
                      optionFilterProp="label"
                      // Chỉ chọn chi nhánh khi đã chọn ngân hàng
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          {/*  */}
        </Form>

        {current === 2 && (
          <div className="flex  items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-lg">
              <RocketIcon className="text-blue-500 mx-auto mb-4 h-12 w-12" />
              <h2 className="text-lg font-bold">
                🚀 Chúc mừng bạn đã đăng ký thành công! 🎉
              </h2>
              <p className="mt-2 text-sm leading-relaxed">
                Chào mừng bạn đến với <strong>Cosmotopia Affiliate</strong>! Giờ
                đây, bạn đã chính thức trở thành một Cosmotopia Affiliate. Đây
                là cơ hội tuyệt vời để kiếm thêm thu nhập từ **niềm đam mê làm
                đẹp** mà không cần bỏ vốn hay lo lắng về kho hàng, vận chuyển!
              </p>
              <p className="mt-2 text-sm leading-relaxed">
                Ngay sau khi đăng ký, bạn có thể **tạo link chia sẻ** sản phẩm
                từ Cosmotopia. Mỗi khi có người mua hàng qua link của bạn, bạn
                sẽ **nhận hoa hồng tự động**, không cần làm gì thêm! Thanh toán
                sẽ được thực hiện **trong 7 ngày** sau khi đơn hàng hoàn tất.
              </p>
              <p className="mt-2 text-sm leading-relaxed">
                Hãy bắt đầu hành trình kiếm tiền ngay hôm nay**!
              </p>
              {/* <Button className="bg-blue-500 hover:bg-blue-600 mt-4 w-full rounded-lg px-4 py-2 text-white">
                🚀 Bắt đầu ngay
              </Button> */}
            </Card>
          </div>
        )}
        <div style={{ marginTop: 24 }}>
          {current > 0 && (
            <Button style={{ marginRight: 8 }} onClick={prev}>
              Quay lại
            </Button>
          )}

          {(current == 0 || current == 2) && (
            <Button
              type="primary"
              onClick={
                current == 0
                  ? next
                  : () => {
                      setIsShow(false);
                    }
              }
              disabled={current === 0 && !agreed}
            >
              {current === 0 ? 'Đồng ý & Tiếp tục' : 'Xác nhận'}
            </Button>
          )}

          {current == 1 && (
            <Button
              type="primary"
              onClick={async () => {
                form.submit();
                // next();
              }}
            >
              Xác nhân đăng ký
            </Button>
          )}
        </div>
      </Modal>
      <button
        onClick={() => {
          auth
            ? role == 'Customers'
              ? setIsShow(true)
              : message.error('Bạn đã là affiliate')
            : message.error('Bạn phải đăng nhập để sử dụng tính năng này');
        }}
        className="mt-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 font-montserrat text-lg font-semibold text-white shadow-lg transition hover:scale-105"
      >
        Đăng kí miễn phí
      </button>
    </>
  );
};
