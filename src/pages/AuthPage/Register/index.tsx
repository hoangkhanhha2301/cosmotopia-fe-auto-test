import BasePages from '@/components/shared/base-pages.js';
import Footer from '@/components/shared/footer';
import { useRegister } from '@/queries/auth.query';

import { useRouter } from '@/routes/hooks';
import { sSpin } from '@/store/spin';
import { Col, Form, message, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const router = useRouter();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutateAsync: registerAccount, isPending } = useRegister();
  const onFinish = async (values) => {
    console.log(values);
    sSpin.set(true);

    const model = {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
      confirmPassword: values.confirmPassword,
      phone: values.phone
      // <otpExpiration:></otpExpiration:>
    };
    await registerAccount(model)
      .then((data: any) => {
        console.log(data.message);
        if (data?.success) {
          navigate('/OTP', { state: { email: values.email } });
          message.success('Vui lòng kiểm tra mail để xác thực OTP');
        } else {
          message.error(data.message);
        }
      })
      .catch((err) => {
        message.error('Something went wrong');
      })
      .finally(() => {
        sSpin.set(false);
      });

    // helper.cookie_set('RT', data.refreshToken);
  };

  return (
    <>
      <BasePages
        className="relative mx-auto max-h-screen w-[80%] flex-1 p-4"
        pageHead="Register"
      >
        <div className="flex items-center">
          <div className="flex-1">
            <img src="./loginIm.svg" alt="" className="w-full" />
          </div>
          <div className="px-24 py-12" style={{ minWidth: '650px' }}>
            <p className=" mb-8 text-center text-4xl font-bold text-purple-500 drop-shadow-md">
              Đăng ký miễn phí
            </p>
            <Form
              name="basic"
              className="w-full"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Row>
                <Col span={10}>
                  <Form.Item
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your lastName!'
                      }
                    ]}
                  >
                    <input
                      placeholder="Họ"
                      className=" w-full rounded-full bg-gray-50 py-3 pl-10 pr-4 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                  </Form.Item>
                </Col>
                <Col span={2}></Col>
                <Col span={10}>
                  <Form.Item
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your firstName!'
                      }
                    ]}
                  >
                    <input
                      placeholder="Tên"
                      className=" w-full rounded-full bg-gray-50 py-3 pl-10 pr-4 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: 'Please input your phone!'
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: 'Phone number must be exactly 10 digits!'
                  }
                ]}
              >
                <input
                  placeholder="Số điện thoại"
                  className=" w-full rounded-full bg-gray-50 py-3 pl-10 pr-4 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Email!'
                  }
                ]}
              >
                <input
                  placeholder="Email"
                  type="email"
                  className=" w-full rounded-full bg-gray-50 py-3 pl-10 pr-4 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!'
                  }
                ]}
              >
                <input
                  type="password"
                  placeholder="Mật khẩu"
                  className=" w-full rounded-full bg-gray-50 py-3 pl-10 pr-4 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!'
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          'The new password that you entered do not match!'
                        )
                      );
                    }
                  })
                ]}
              >
                <input
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  className=" w-full rounded-full bg-gray-50 py-3 pl-10 pr-4 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </Form.Item>

              <button
                type="submit"
                className="from-blue-500 w-full rounded-full bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-[#9B22DB]"
              >
                Đăng ký
              </button>
            </Form>
            {/* <input
            placeholder="Tên đăng nhập"
            className="mb-4 w-full rounded-full bg-gray-50 py-3 pl-10 pr-4 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-gray-200"
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            className=" w-full rounded-full bg-gray-50 py-3 pl-10 pr-4 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <button className="from-blue-500 mt-4 w-full rounded-full bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[#9B22DB]">
            Đăng nhập
          </button> */}
            <div className="my-4 flex items-center">
              <div className="h-px flex-1 bg-gradient-to-r from-pink-300 to-purple-300"></div>
              <span className="mx-4 text-lg font-medium text-gray-500">
                HOẶC
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-pink-300 to-purple-300"></div>
            </div>
            <div className="flex justify-center gap-4">
              <img
                src="./facebook.svg"
                alt=""
                className="hover: cursor-pointer  "
              />
              <img
                src="./google.svg"
                alt=""
                className="hover: cursor-pointer  "
              />
            </div>
            <p className="font-norma m-0 p-0 text-center text-lg text-[#847A7A]">
              Bạn đã có tài khoản? {'   '}
              <span
                className="hover: cursor-pointer text-purple-500"
                onClick={() => router.push('/login')}
              >
                Đăng nhập
              </span>
            </p>
            {/* <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md transition hover:shadow-lg"></button> */}
          </div>
        </div>
      </BasePages>
    </>
  );
}
