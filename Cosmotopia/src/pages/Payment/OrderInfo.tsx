"use client"

import { Image } from "antd"


export default function OrderInfo() {
  return (
    <div className="relative w-[413px] h-[405px] bg-white shadow-md rounded-xl">
      {/* Header */}
      <div className="flex justify-center items-start gap-4 w-full mb-6 pt-2">
        <h1 className="font-bold text-2xl text-[#3D3D3D] text-center capitalize font-montserrat">Thông Tin Đơn Hàng</h1>
      </div>

      {/* Order details */}
      <div className="flex flex-col gap-3 mx-6">
        {/* Total */}
        <div className="flex justify-between items-start w-full">
          <span className="font-normal text-lg text-[#4E4663] font-montserrat">Tổng cộng</span>
          <span className="font-normal text-xl text-[#434343] font-montserrat">180,000VNĐ</span>
        </div>

        {/* Discount */}
        <div className="flex justify-between items-start w-full">
          <span className="font-normal text-lg text-[#4E4663] font-montserrat">Giảm giá</span>
          <span className="font-normal text-xl text-[#434343] font-montserrat">0VNĐ</span>
        </div>

        {/* Shipping fee */}
        <div className="flex justify-between items-start w-full">
          <span className="font-normal text-lg text-[#4E4663] font-montserrat">Phí vận chuyển</span>
          <span className="font-normal text-xl text-[#434343] font-montserrat">0VNĐ</span>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-6 my-5 border-t border-[#A10550]"></div>

      {/* Total payment */}
      <div className="flex justify-between items-end mx-6">
        <span className="font-bold text-lg text-[#4E4663] font-montserrat">Tổng thanh toán</span>
        <span className="font-bold text-2xl text-[#347B28] font-montserrat">180,000VNĐ</span>
      </div>

      {/* Product */}
      <div className="absolute left-6 top-[296px] flex gap-3">
        <div className="w-20 h-20 rounded-xl overflow-hidden border border-gray-200">
          <Image
            src="/placeholder.svg?height=80&width=80"
            alt="Bảng phấn mắt"
            width={80}
            height={80}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-0.5">
            <span className="font-normal text-base text-[#4E4663] font-montserrat">Bảng phấn mắt</span>
            <span className="font-normal text-xs text-[#B8B5C0] font-montserrat">L01</span>
          </div>
          <div className="mt-2">
            <span className="font-bold text-xl bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] bg-clip-text text-transparent font-montserrat">
              379,000 VNĐ
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

