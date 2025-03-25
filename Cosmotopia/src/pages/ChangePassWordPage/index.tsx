import __helpers from '@/helpers';
import { changePassword, resetPassword } from '@/queries/user.api';
import { sSpin } from '@/store/spin';
import { Form, message } from 'antd';
import React, { FC } from 'react';

export const ChangePassWordPage: FC = ({}) => {
  const token = __helpers.cookie_get('AT');

  const userObject = token
    ? JSON.parse(__helpers.cookie_get('user'))
    : { role: 'Guest' };

  const onFinish = (values) => {
    sSpin.set(true);
    const model = {
      email: userObject.email,
      oldPassword: values.oldPassword,
      newPassword: values.password
    };
    console.log(model);

    changePassword(model)
      .then((data: any) => {
        if (data?.success) {
          message.success('Change Password successfully');
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
  };
  return (
    <>
      <h2 className="mb-4">Đổi mật khẩu</h2>
      <Form
        name="basic"
        className="w-full"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Mật khẩu cũ"
          name="oldPassword"
          rules={[
            {
              required: true,
              message: 'Please input old password!'
            }
          ]}
        >
          <input
            type="password"
            placeholder="Mật khẩu cũ"
            className="w-full rounded-full bg-gray-50 py-3 pl-10 pr-4 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </Form.Item>
        <Form.Item
          label="Mật khẩu mới"
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
            placeholder="Mật khẩu mới"
            className="w-full rounded-full bg-gray-50 py-3 pl-10 pr-4 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </Form.Item>
        <Form.Item
          label="Xác nhận mật khẩu"
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
                  new Error('The new password that you entered do not match!')
                );
              }
            })
          ]}
        >
          <input
            type="password"
            placeholder="Nhập lại mật khẩu mới"
            className="w-full rounded-full bg-gray-50 py-3 pl-10 pr-4 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </Form.Item>

        <button
          type="submit"
          className=" from-blue-500 mb-2 w-40 rounded-full bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-[#9B22DB]"
        >
          Xác nhận
        </button>
      </Form>
    </>
  );
};
