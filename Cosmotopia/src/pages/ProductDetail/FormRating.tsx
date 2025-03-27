import { registerAffiliate } from '@/queries/affilate.api';
import { sSpin } from '@/store/spin';
import { Col, Form, Input, message, Modal, Row, Select } from 'antd';
import React, { FC, useState } from 'react';

interface FormRatingProps {
  ProductID: string;
}

export const FormRating: FC<FormRatingProps> = ({ ProductID }) => {
  const [isShow, setIsShow] = useState(false);
  const [form] = Form.useForm();
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
        title="Đánh giá sản phẩm"
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
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
                    {/* <Select
                      placeholder="Chọn ngân hàng"
                      options={banks}
                      className="w-full"
                      showSearch
                      optionFilterProp="label"
                      // Chỉ chọn chi nhánh khi đã chọn ngân hàng
                    /> */}
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
                  ></Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          {/*  */}
        </Form>
      </Modal>
      <button
        onClick={() => {
          setIsShow(true);
        }}
        className="w-30 font-base rounded-full bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] px-6 py-2 text-sm text-white"
      >
        Viết đánh giá
      </button>
    </>
  );
};
