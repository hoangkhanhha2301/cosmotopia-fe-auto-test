import BasePages from '@/components/shared/base-pages.js';
import Footer from '@/components/shared/footer';
import { useRouter } from '@/routes/hooks';
import { Checkbox, Form } from 'antd';

export default function RegisterPage() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const router = useRouter();
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
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your name!'
                  }
                ]}
              >
                <input
                  placeholder="Họ và tên"
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
                name="confirm-password"
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
