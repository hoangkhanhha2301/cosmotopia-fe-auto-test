import BasePages from '@/components/shared/base-pages.js';

import { useRouter } from '@/routes/hooks';
import { Form, Image, InputNumber, Rate } from 'antd';
import { PhanLoai } from './PhanLoai';
import { useState } from 'react';
import { MoreOutlined, CheckCircleFilled } from '@ant-design/icons';
const listImg = ['./detail.png', './detail.png', './logo.png'];
const listContent = [
  {
    title: 'Chi tiết sản phẩm',
    detail: [
      'Xuất xứ: Việt Nam',
      'Kích thước: 20x30cm',
      'Trọng lượng: 500g',
      'Chất liệu: Nhựa cao cấp'
    ]
  },
  {
    title: 'Cách dùng',
    detail: [
      'Rửa sạch trước khi sử dụng',
      'Dùng theo hướng dẫn của nhà sản xuất',
      'Không để gần nguồn nhiệt cao'
    ]
  },
  {
    title: 'Thành phần',
    detail: [
      'Thành phần chính: Nhựa PP',
      'Không chứa BPA, an toàn cho sức khỏe'
    ]
  },
  {
    title: 'Đánh giá',
    detail: [
      {
        reviewer: 'Nguyễn Thuý An',
        rating: 5,
        content:
          'Sản phẩm rất tuyệt! Màu sắc tự nhiên, giữ màu lâu và không gây kích ứng.',
        time: '2024-03-05 14:30'
      },
      {
        reviewer: 'Trần Minh Hoàng',
        rating: 4,
        content:
          'Mình thấy chất lượng ổn, nhưng màu có hơi nhạt hơn so với hình.',
        time: '2024-03-04 10:15'
      },
      {
        reviewer: 'Lê Hồng Nhung',
        rating: 5,
        content:
          'Cực kỳ ưng ý, giao hàng nhanh, đóng gói đẹp. Mua lần thứ 2 rồi!',
        time: '2024-03-03 18:45'
      },
      {
        reviewer: 'Phạm Quốc Bảo',
        rating: 3,
        content: 'Màu đẹp nhưng hơi bột, không hợp với da khô lắm.',
        time: '2024-03-02 12:20'
      },
      {
        reviewer: 'Vũ Hải Yến',
        rating: 4,
        content: 'Son lên màu đẹp nhưng độ bám không được lâu như mong đợi.',
        time: '2024-03-01 09:50'
      }
    ]
  },
  {
    title: 'Review từ KOL',
    detail: [
      'Sản phẩm rất tốt, bền và đẹp',
      'Giá cả hợp lý, đáng mua',
      'Giao hàng nhanh chóng, đóng gói cẩn thận'
    ]
  }
];
const length = listImg.length;
export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [indexImg, setIndexImg] = useState(0);

  const [currentTab, setCurrentTab] = useState(listContent[0]);
  const router = useRouter();
  return (
    <>
      <BasePages
        className="relative mx-auto w-[80%] flex-1 p-4"
        pageHead="ProductDetail"
      >
        <div className="flex items-center gap-4 " style={{ height: '670px' }}>
          <div className="flex w-1/12 flex-col items-center justify-between gap-4 ">
            <div>
              <img
                src="./arrowUp.svg"
                alt=""
                className="w-full hover:cursor-pointer"
                onClick={() => setIndexImg(Math.max(0, indexImg - 1))}
              />
            </div>
            {listImg.map((url, index) => (
              <>
                <img
                  src={url}
                  alt=""
                  className={` h-20 w-full  rounded-lg transition-all duration-300 hover:cursor-pointer ${
                    index === indexImg
                      ? 'scale-105 shadow-lg ring-2 ring-purple-500' // Active
                      : 'opacity-60'
                  }`}
                  onClick={() => setIndexImg(index)}
                  key={index}
                />
              </>
            ))}
            <img
              src="./arrowDown.svg"
              alt=""
              className="w-full hover:cursor-pointer"
              onClick={() => setIndexImg(Math.min(length - 1, indexImg + 1))}
            />
          </div>
          <div className="flex w-7/12 justify-center">
            <Image
              src={listImg[indexImg]}
              style={{ height: '582px', width: '100%' }}
            />
          </div>

          <div className="w-4/12">
            <h2 className="text-3xl font-bold  text-[#3D3D3D]">
              Bảng Phấn Mắt 7 màu Flower Knows  
            </h2>
            <div className="mt-3 flex items-center justify-between">
              <Rate disabled defaultValue={4} />
              <span>4/5</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-2xl font-semibold text-purple-500">
                379.000 VNĐ
              </span>
              <span className="text-gray-400  line-through">450.000 VNĐ</span>
              <span className="0 rounded bg-[rgba(255,0,0,0.1)] px-2 py-0.5 text-xs font-medium text-[rgba(255,0,0,0.8)]">
                -40%
              </span>
            </div>
            <p className="mt-2 text-gray-600">
              This graphic t-shirt which is perfect for any occasion. Crafted
              from a soft and breathable fabric, it offers superior comfort and
              style.
            </p>
            <div className="mt-4">
              <p className="font-bold">Anti-Aging Face Serum</p>
              <p className="text-sm text-gray-500">
                Cho Mọi Loại Da | Lorem | Lorem
              </p>
            </div>
            <PhanLoai listOptions={['L01', 'L02', 'L03', 'L04']} />
            <div className="mt-4 flex items-center gap-6">
              <div className="flex items-center rounded-xl bg-gray-100">
                <button
                  className="border-none px-3 py-2 text-xl font-bold text-gray-600"
                  onClick={() => {
                    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
                  }}
                >
                  -
                </button>
                <input
                  min={0}
                  value={quantity}
                  // type="number"

                  onChange={(e) => {
                    const value = Number(e.target.value);
                    // setQuantity(value);
                    value > 123 ? setQuantity(123) : setQuantity(value);
                  }}
                  className="w-12 border-none bg-gray-100  py-2 text-center text-[#9C3CFD]"
                />

                <button
                  className="border-none px-3 py-2 text-xl font-bold text-gray-600"
                  onClick={() => setQuantity(Number(quantity) + 1)}
                >
                  +
                </button>
              </div>
              <span> 123 sản phẩm có sẵn </span>
            </div>
            <div className="mt-4 flex items-center gap-6">
              <button
                type="submit"
                className="from-blue-500 mb-2 w-96 rounded-full bg-[#F5F5F5] px-6 py-3 text-base font-medium text-black transition-colors duration-200 "
              >
                Thêm vào giỏ hàng
              </button>
              <button
                type="submit"
                className=" from-blue-500 mb-2 w-80 rounded-full bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-[#9B22DB]"
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between px-2 py-4">
            {listContent.map((tab, index) => (
              <button
                key={index}
                onClick={() => setCurrentTab(tab)}
                className={`relative py-2 font-medium text-gray-600 transition-all ${
                  currentTab.title === tab.title ? ' text-purple-500' : ''
                }`}
              >
                {tab.title}
                {currentTab.title === tab.title && (
                  <div className="absolute -bottom-1 left-0 h-[2px] w-full bg-purple-500"></div>
                )}
              </button>
            ))}
            {/* <div className="flex items-center gap-1">
              <span>Xem thêm</span>
              <img
                className="h-4 w-4 object-cover"
                src="./arrowDown.svg"
                alt=""
              />
            </div> */}
          </div>
          <div className="min-h-32 py-4">
            {currentTab.title !== 'Đánh giá' ? (
              currentTab.detail.map((a) => <p>{a}</p>)
            ) : (
              <div>
                Tất cả đánh giá (451)
                <div className="flex flex-wrap justify-between gap-2 ">
                  {currentTab.detail.map((a) => (
                    <div className="relative w-[calc(50%-8px)] rounded-xl border bg-white p-4 shadow-md">
                      {/* Nút More */}
                      <MoreOutlined className="absolute right-4 top-4 cursor-pointer text-gray-500" />

                      {/* Rating Stars */}
                      <Rate
                        allowHalf
                        disabled
                        defaultValue={a.rating}
                        className="text-yellow-500 mb-2"
                      />

                      {/* Tên người đánh giá */}
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold">
                          {a.reviewer}
                        </span>
                        <CheckCircleFilled className="text-green-500" />
                      </div>

                      {/* Nội dung review */}
                      <p className="mt-2 text-gray-600">{a.content}</p>

                      {/* Ngày đăng */}
                      <p className="mt-2 text-sm text-gray-400">
                        Posted on August 14, 2023
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="mt-4 flex items-center justify-between">
            <h3 className="text-xl font-bold">Có thể bạn cũng thích</h3>
            <div className="flex items-center gap-1">
              <span>Xem tất cả</span>
              <img
                className="h-4 w-4 object-cover"
                src="./arrowRight.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </BasePages>
    </>
  );
}
