import BasePages from '@/components/shared/base-pages.js';
import { Input, message } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useOTP } from '@/queries/auth.query';
import { useDispatch } from 'react-redux';
import { sSpin } from '@/store/spin';
export default function OtgPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { mutateAsync: OTPAccount } = useOTP();
  const [otp, setOtp] = useState('');
  const email = location.state?.email;
  useEffect(() => {
    if (!email) {
      navigate('/'); // Điều hướng về home nếu không có email
    }
  }, [email, navigate]);
  const onFinish = async (values) => {
    sSpin.set(true);
    const model = {
      email: email,
      otp: values
    };
    console.log(model);
    OTPAccount(model)
      .then((data: any) => {
        if (data?.success) {
          message.success('OTP verified successfully');
          navigate('/login');
        } else {
          message.error(data?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        sSpin.set(false);
      });
    console.log('Success:', values);
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
              Xác nhận OTP
            </p>

            <div className="mb-6 flex items-center justify-center">
              <Input.OTP
                onChange={(text) => {
                  setOtp(text);

                  // onFinish(text);
                }}
                size="large"
              />
            </div>

            <button
              type="submit"
              onClick={() => {
                if (otp.length < 6) {
                  message.error('OTP must be at least 6 characters');
                } else onFinish(otp);
              }}
              className=" from-blue-500 mb-2 w-full rounded-full bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-[#9B22DB]"
            >
              Xác nhận
            </button>

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
            {/* <div className="my-4 flex items-center">
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
            </p> */}
            {/* <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md transition hover:shadow-lg"></button> */}
          </div>
        </div>
      </BasePages>
    </>
  );
}
