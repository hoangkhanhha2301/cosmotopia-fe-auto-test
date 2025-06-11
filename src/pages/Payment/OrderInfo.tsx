'use client';

import { Image } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

export default function OrderInfo() {
  // const productId = queryParams.get("productId");
  // const quantity = queryParams.get("quantity");
  // console.log(productId, quantity);
  const navigate = useNavigate();

  const location = useLocation();
  const products = [...location.state] || [];
  if (products.length == 0) {
    navigate('/');
  }
  console.log(products);
  // Đảm bảo location.state là một mảng hoặc rỗng

  // Tính tổng giá trị đơn hàng
  const totalPrice = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  // Lấy sản phẩm đầu tiên
  // const firstProduct = products[0];

  return (
    <div className="min-w[400px] relative flex  h-auto flex-col overflow-hidden rounded-xl bg-white shadow-md ">
      {/* Header */}
      <div className="mb-6 flex w-full items-start justify-center gap-4 pt-2">
        <h1 className="text-center font-montserrat text-2xl font-bold capitalize text-[#3D3D3D]">
          Đơn Hàng
        </h1>
      </div>

      {/* Order details */}
      <div className="mx-6 flex flex-col gap-3">
        <div className="flex w-full items-start justify-between">
          <span className="font-montserrat text-lg font-normal text-[#4E4663]">
            Tổng cộng
          </span>
          <span className="font-montserrat text-xl font-normal text-[#434343]">
            {totalPrice.toLocaleString()} VNĐ
          </span>
        </div>

        <div className="flex w-full items-start justify-between">
          <span className="font-montserrat text-lg font-normal text-[#4E4663]">
            Giảm giá
          </span>
          <span className="font-montserrat text-xl font-normal text-[#434343]">
            0 VNĐ
          </span>
        </div>

        <div className="flex w-full items-start justify-between">
          <span className="font-montserrat text-lg font-normal text-[#4E4663]">
            Phí vận chuyển
          </span>
          <span className="font-montserrat text-xl font-normal text-[#434343]">
            0 VNĐ
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 my-5 border-t border-[#A10550]"></div>

      {/* Total payment */}
      <div className="mx-6 flex items-end justify-between">
        <span className="font-montserrat text-xl font-bold text-[#4E4663]">
          Tổng
        </span>
        <span className="font-montserrat text-xl font-bold text-[#347B28]">
          {totalPrice.toLocaleString()} VNĐ
        </span>
      </div>

      {/* Product List */}
      <div className="mx-6 mb-4 mt-4 flex  flex-col">
        {products?.map((a) => (
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="h-20 w-20 overflow-hidden rounded-xl border border-gray-200">
              <Image
                src={a.imageUrl}
                alt={a.name}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col">
              <span className="font-montserrat text-base font-normal text-[#4E4663]">
                {a.name}
              </span>
              <span className="bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] bg-clip-text font-montserrat text-xl font-bold text-transparent">
                {a.price.toLocaleString()} VNĐ
              </span>
            </div>
            <div>
              <span className="bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] bg-clip-text font-montserrat text-xl font-bold text-transparent">
                x{a.quantity}
              </span>
            </div>
          </div>
        ))}

        {/* Remaining products */}
        {/* {products.length > 1 && (
          <div className="mb-2 text-sm text-gray-500">
            + {products.length - 1} sản phẩm khác
          </div>
        )} */}
      </div>
    </div>
  );
}
