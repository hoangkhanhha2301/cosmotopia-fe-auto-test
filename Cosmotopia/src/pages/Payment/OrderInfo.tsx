"use client";

import { Image } from "antd";
import { useLocation } from "react-router-dom";

export default function OrderInfo() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("productId");
  const quantity = queryParams.get("quantity");
  console.log(productId, quantity);

  // Đảm bảo location.state là một mảng hoặc rỗng
  const products = [...location.state, ...location.state, ...location.state] || [];
  
  // Tính tổng giá trị đơn hàng
  const totalPrice = products.reduce((sum, product) => sum + product.price * product.quantity, 0);

  // Lấy sản phẩm đầu tiên
  const firstProduct = products[0];

  return (
    <div className="relative flex flex-col w-[413px] h-auto bg-white shadow-md rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex justify-center items-start gap-4 w-full mb-6 pt-2">
        <h1 className="font-bold text-2xl text-[#3D3D3D] text-center capitalize font-montserrat">Thông Tin Đơn Hàng</h1>
      </div>

      {/* Order details */}
      <div className="flex flex-col gap-3 mx-6">
        <div className="flex justify-between items-start w-full">
          <span className="font-normal text-lg text-[#4E4663] font-montserrat">Tổng cộng</span>
          <span className="font-normal text-xl text-[#434343] font-montserrat">{totalPrice.toLocaleString()} VNĐ</span>
        </div>

        <div className="flex justify-between items-start w-full">
          <span className="font-normal text-lg text-[#4E4663] font-montserrat">Giảm giá</span>
          <span className="font-normal text-xl text-[#434343] font-montserrat">0 VNĐ</span>
        </div>

        <div className="flex justify-between items-start w-full">
          <span className="font-normal text-lg text-[#4E4663] font-montserrat">Phí vận chuyển</span>
          <span className="font-normal text-xl text-[#434343] font-montserrat">0 VNĐ</span>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 my-5 border-t border-[#A10550]"></div>

      {/* Total payment */}
      <div className="flex justify-between items-end mx-6">
        <span className="font-bold text-lg text-[#4E4663] font-montserrat">Tổng thanh toán</span>
        <span className="font-bold text-2xl text-[#347B28] font-montserrat">{totalPrice.toLocaleString()} VNĐ</span>
      </div>

      {/* Product List */}
      <div className="flex flex-col gap-3 mx-6 mt-4">
        {firstProduct && (
          <div className="flex gap-3 items-center">
            <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200">
              <Image
                src={firstProduct.imageUrl}
                alt={firstProduct.name}
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-normal text-base text-[#4E4663] font-montserrat">{firstProduct.name}</span>
              <span className="font-bold text-xl bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] bg-clip-text text-transparent font-montserrat">
                {firstProduct.price.toLocaleString()} VNĐ
              </span>
            </div>
          </div>
        )}

        {/* Remaining products */}
        {products.length > 1 && (
          <div className="text-sm text-gray-500 mb-2">
            + {products.length - 1} sản phẩm khác
          </div>
        )}
      </div>
    </div>
  );
}
