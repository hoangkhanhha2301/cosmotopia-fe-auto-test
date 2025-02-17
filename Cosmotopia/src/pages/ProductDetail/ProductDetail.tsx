import BasePages from '@/components/shared/base-pages.js';

import { useRouter } from '@/routes/hooks';
import { Form, Image, InputNumber, Rate } from 'antd';
import { PhanLoai } from './PhanLoai';
import { useState } from 'react';

const listImg = ['./detail.png', './detail.png', './logo.png'];
const listContent = [
  'Chi tiết sản phẩm',
  'Cách dùng',
  'Thành phần',
  'Đánh giá'
];
const length = listImg.length;
export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [indexImg, setIndexImg] = useState(0);
  const [content, setContent] = useState(listContent[0]);
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
                  onClick={() => quantity != 1 && setQuantity(quantity - 1)}
                >
                  -
                </button>
                <span className="w-12 border-none bg-gray-100 px-4 py-2 text-center">
                  {quantity}
                </span>
                <button
                  className="border-none px-3 py-2 text-xl font-bold text-gray-600"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
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
                onClick={() => setContent(tab)}
                className={`relative py-2 font-medium text-gray-600 transition-all ${
                  content === tab ? ' text-purple-500' : ''
                }`}
              >
                {tab}
                {content === tab && (
                  <div className="absolute -bottom-1 left-0 h-[2px] w-full bg-purple-500"></div>
                )}
              </button>
            ))}
            <div className="flex items-center gap-1">
              <span>Xem thêm</span>
              <img
                className="h-4 w-4 object-cover"
                src="./arrowDown.svg"
                alt=""
              />
            </div>
          </div>
          <p>
            Phấn Phủ Carslan Black Magnetic Soft Mist Powder Dạng Nén 8g là sản
            phẩm phấn phủ đến từ thương hiệu Carslan - Trung Quốc, với công thức
            tiên tiến giúp che phủ lỗ chân lông, làm mờ các khuyết điểm cho lớp
            nền mịn lì tự nhiên và kiểm soát dầu hiệu quả suốt cả ngày dài.
            Thành phần an toàn, không chứa Talc hoặc các chất gây kích ứng, phù
            hợp với mọi loại da. Phấn Phủ Dạng Nén Carslan Black Magnetic Soft
            Mist Powder 8g hiện đã có tại Hasaki với 5 phân loại chia làm 2
            phiên bản: Phiên bản thường: Phấn Phủ Carslan Black Magnetic Soft
            Mist Powder Dạng Nén Vỏ Đen - Màu Tím: Làm sáng da, chống xỉn màu.
            Phấn Phủ Carslan Black Magnetic Soft Mist Powder Dạng Nén Vỏ Đen -
            Màu Hồng Đào: Làm sáng da mặt và giúp da rạng rỡ. Phấn Phủ Carslan
            Black Magnetic Soft Mist Powder Dạng Nén Vỏ Đen - Màu Trong
            Suốt: Phấn mỏng nhẹ phù hợp mọi tông da. Phiên bản kiểm soát dầu:
            Phấn Phủ Dạng Nén Carslan Black Magnetic Soft Mist Powder Vỏ Xám -
            Màu Trong Suốt: Giúp kiểm soát dầu mạnh mẽ.  Phấn Phủ Dạng Nén
            Carslan Black Magnetic Soft Mist Powder Vỏ Xám - Màu Tím: Giúp kiểm
            soát dầu mạnh mẽ, nâng tông cho da xỉn màu. 
          </p>
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
