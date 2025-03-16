import BasePages from '@/components/shared/base-pages.js';
import { Checkbox, Form, message } from 'antd';
import { useRouter } from '@/routes/hooks';
import { useDispatch } from 'react-redux';
import { useLogin } from '@/queries/auth.query';
import helper from '@/helpers/index';
import { login } from '@/redux/auth.slice';
import { turnOffSpin, turnOnSpin } from '@/redux/spin.slice';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { mutateAsync: loginAccount, isPending } = useLogin();

  const onFinish = async (values) => {
    dispatch(turnOnSpin());

    try {
      const model = {
        email: values.Email,
        password: values.password
        // isRemember: values.remember || false
      };
      var data = await loginAccount(model);
      console.log(data);
      helper.cookie_set('AT', data.token);
      helper.cookie_set('role', data.role);
      helper.cookie_set('user', JSON.stringify({ ...data, token: '' }));
      // helper.cookie_set('RT', data.refreshToken);
      dispatch(login());
      if (data.role == 'Customers') {
        router.push('/');
      } else router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err); // Log the exact error
      message.error('Tên đăng nhập hoặc mật khẩu không đúng.');
    } finally {
      dispatch(turnOffSpin());
    }
  };
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
              Đăng nhập
            </p>
            <Form
              name="basic"
              className="w-full"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                name="Email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Email!'
                  }
                ]}
              >
                <input
                  type="email"
                  placeholder="Tên đăng nhập"
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

              <div className="mb-2 flex items-center justify-between">
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  label={null}
                  className="m-0 p-0"
                >
                  <Checkbox className="text-sm font-normal text-[#847A7A]">
                    Ghi nhớ mật khẩu
                  </Checkbox>
                </Form.Item>
                <span
                  onClick={() => router.push('/forgotPassword')}
                  className="hover: m-0 cursor-pointer p-0 text-sm font-normal text-[#847A7A]"
                >
                  Quên mật khẩu ?
                </span>
              </div>

              <button
                type="submit"
                className=" from-blue-500 mb-2 w-full rounded-full bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-[#9B22DB]"
              >
                Đăng nhập
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
              Bạn chưa có tài khoản? {'   '}
              <span
                className="hover: cursor-pointer text-purple-500"
                onClick={() => router.push('/register')}
              >
                Đăng ký
              </span>
            </p>
            {/* <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md transition hover:shadow-lg"></button> */}
          </div>
        </div>
      </BasePages>
    </>
  );
}
