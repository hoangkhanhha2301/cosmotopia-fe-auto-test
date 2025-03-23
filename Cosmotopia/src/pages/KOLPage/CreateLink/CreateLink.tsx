import { generalLink } from '@/queries/affilate.api';
import { ShareAltOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Form, Input, message, Space } from 'antd';
import React, { FC } from 'react';

interface CreateLinkProps {}

export const CreateLink: FC<CreateLinkProps> = ({}) => {
  const [form] = Form.useForm();
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(form.getFieldValue('link'));
      message.success('Đã sao chép vào clipboard!');
    } catch (err) {
      message.error('Lỗi khi sao chép!');
    }
  };
  const onFinish = (values) => {
    console.log(values);
    const segments = values.url.split('/');
    const productId = segments[segments.length - 1];
    console.log(productId);
    const model = {
      productId: productId
    };
    generalLink(model)
      .then((data) => {
        console.log(data);
        // form.setFieldValue('link', data)
      })
      .catch((err) => {
        message.error('something went wrong');
      })
      .finally(() => {});
  };
  return (
    <div>
      {' '}
      <h2 className="mb-4 text-lg font-semibold">Tạo liên kết affiliate</h2>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        {/* Nhập link sản phẩm */}
        <Form.Item
          name="url"
          className="mb-0"
          rules={[
            {
              required: true,
              message: 'Please Enter link of Products!'
            }
          ]}
        >
          <Input placeholder="Dán link sản phẩm" className="h-10" />
        </Form.Item>
        <div className="mb-2 mt-0 cursor-pointer text-right text-sm text-gray-500 hover:underline">
          Chọn sản phẩm từ trang web
        </div>
        {/* Nút tạo link */}

        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: 'linear-gradient(to right, #A933FF, #7000FF)', // Giữ màu gradient
                colorPrimaryHover: 'linear-gradient(to right, #A933FF, #7000FF)' // Chặn màu đỏ khi hover
              }
            }
          }}
        >
          <Button
            htmlType="submit"
            type="primary"
            className="mb-4 h-10 w-full rounded-full bg-gradient-to-r from-[#A933FF] to-[#7000FF] text-base font-semibold text-white"
          >
            Tạo link
          </Button>
        </ConfigProvider>

        {/* Link affiliate + nút chia sẻ */}
        <Form.Item name="link">
          <Space.Compact className="w-full">
            <Input
              placeholder="Link sẽ hiển thị sau khi tạo"
              readOnly
              disabled
            />
            <Button
              icon={<ShareAltOutlined />}
              className="h-10"
              onClick={handleShare}
            >
              Chia sẻ
            </Button>
          </Space.Compact>
        </Form.Item>
      </Form>
    </div>
  );
};
