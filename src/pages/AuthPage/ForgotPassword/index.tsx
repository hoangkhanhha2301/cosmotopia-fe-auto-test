import BasePages from '@/components/shared/base-pages.js';
import { Checkbox, Form, message } from 'antd';
import { useRouter } from '@/routes/hooks';
import { ro } from 'date-fns/locale';
import { forgotPassword } from '@/queries/user.api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sSpin } from '@/store/spin';

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = (values) => {
    sSpin.set(true);

    forgotPassword(values.email)
      .then((data: any) => {
        if (data.success) {
          message.success(data.message);
          navigate('/');
        } else {
          message.error(data.message);
        }
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        sSpin.set(false);
      });
  };
  const router = useRouter();
  return (
    <>
      <BasePages
        className="relative mx-auto max-h-screen w-[80%] flex-1 p-4"
        pageHead="Login"
      >
        <div className="flex items-center">
          <div className="flex-1">
            <img src="./loginIm.svg" alt="" className="w-full" />
          </div>
          <div className="px-24 py-12" style={{ minWidth: '650px' }}>
            <p className=" mb-8 text-center text-4xl font-bold text-purple-500 drop-shadow-md">
              Lấy lại mật khẩu
            </p>
            <Form
              name="basic"
              className="w-full"
              onFinish={onFinish}
              autoComplete="off"
            >
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
                  type="email"
                  placeholder="Email"
                  className=" w-full rounded-full bg-gray-50 py-3 pl-10 pr-4 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </Form.Item>

              <button
                type="submit"
                className=" from-blue-500 mb-2 w-full rounded-full bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-[#9B22DB]"
              >
                Gửi mã OTP
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
