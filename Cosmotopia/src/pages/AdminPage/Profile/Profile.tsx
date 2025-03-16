import {
  getAccountSelf,
  getAllAccount,
  updateAccountSelf
} from '@/queries/dashboard/dashboardAdmin.query';
import { Button, Col, Form, Input, message, Row } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import helper from '@/helpers/index';
interface ProfileProps {}

export const Profile: FC<ProfileProps> = ({}) => {
  //   const [dataProfile, setDataProfile] = useState();
  const [form] = Form.useForm();
  const getData = () => {
    getAccountSelf()
      .then((data) => {
        console.log(data);
        const profile = data?.data;
        helper.cookie_set('user', JSON.stringify(profile));
        form.setFieldsValue({
          email: profile.email,
          phone: profile.phone,
          lastName: profile.lastName,
          firstName: profile.firstName
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };
  //     getAllCategory()
  //       .then((data) => {
  //         console.log(data);
  //         setCategory(data?.data);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         setDataTable([]);
  //       })
  //       .finally(() => {});
  //   };

  useEffect(() => {
    getData();
  }, []);
  const onFinish = async (values) => {
    console.log(values);
    const model = {
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone
    };

    updateAccountSelf(model)
      .then((data) => {
        console.log(data);
        message.success('Update Profile success!!!');
        getData();
      })
      .catch((error) => {
        console.log(error);
        message.error(error.response?.data?.msg);
      });
  };
  return (
    <div>
      <h1 style={{ fontSize: '32px', color: 'rgb(38, 164, 255)' }}>
        Profile Account
      </h1>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={24}>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Email of User!'
                    }
                  ]}
                >
                  <Input placeholder="Enter Email User" readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Phone of User!'
                    },
                    {
                      pattern: /^[0-9]{10}$/,
                      message: 'Phone number must be exactly 10 digits!'
                    }
                  ]}
                >
                  <Input placeholder="Enter Phone Name" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter Last Name of User!'
                    }
                  ]}
                >
                  <Input placeholder="Enter Last Name User" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[
                    {
                      required: true,
                      message: 'Please Enter First Name of User!'
                    }
                  ]}
                >
                  <Input placeholder="Enter First Name" />
                </Form.Item>
              </Col>
            </Row>
            {/* <Row gutter={24}>
                      <Col span={24}>
                        <Form.Item
                          name="dateRange"
                          label="Date Range"
                          rules={[
                            {
                              required: true,
                              message:
                                'Please select the date range for the campaign!'
                            }
                          ]}
                        >
                          <DatePicker.RangePicker
                            style={{ width: '100%' }}
                            placeholder={[
                              'Select Start Date',
                              'Select End Date'
                            ]}
                          />
                        </Form.Item>
                      </Col>
                    </Row> */}
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Update Profile
        </Button>
        {/*  */}
      </Form>
    </div>
  );
};
