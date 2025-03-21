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
  return (
    <div>
      {' '}
      <h2 className="mb-4 text-lg font-semibold">Tạo liên kết affiliate</h2>
      <Form layout="vertical" form={form}>
        {/* Nhập link sản phẩm */}
        <Form.Item>
          <Input placeholder="Dán link sản phẩm" className="h-10" />
          <div className="mt-1 cursor-pointer text-right text-sm text-gray-500 hover:underline">
            Chọn sản phẩm từ trang web
          </div>
        </Form.Item>

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
