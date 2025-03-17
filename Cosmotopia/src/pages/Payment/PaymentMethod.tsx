"use client"

import { Image } from "antd"
import { useState } from "react"

export default function PaymentMethods() {
  const [selectedMethod, setSelectedMethod] = useState("credit")

  return (
    <div className="w-[935px] flex flex-col">
      {/* Header */}
      <div className="flex justify-center items-center py-8 px-4 border-b border-gray-300/50">
        <h2 className="font-bold text-[22px] text-[#4E4663] font-montserrat">Phương thức thanh toán</h2>
      </div>

      {/* Payment options */}
      <div className="flex flex-col gap-6 p-8">
        {/* Credit/Debit Card Option */}
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-12">
            <div className="relative w-[18px] h-[18px]">
              <div
                className={`w-[18px] h-[18px] rounded-full border ${
                  selectedMethod === "credit"
                    ? "bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] border-[#6B72D6]"
                    : "bg-white border-[#6C6C6C]"
                }`}
                onClick={() => setSelectedMethod("credit")}
              >
                {selectedMethod === "credit" && (
                  <div className="absolute w-2 h-2 bg-white rounded-full top-[5px] left-[5px]"></div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[18px] text-[#837D92] font-montserrat">Thẻ tín dụng / thẻ ghi nợ</span>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="w-[26px] h-[26px] rounded-full bg-white shadow-sm flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=20&width=20"
                alt="Visa"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            <div className="w-[26px] h-[26px] rounded-full bg-white shadow-sm flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=20&width=20"
                alt="Mastercard"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            <div className="w-[26px] h-[26px] rounded-full bg-white shadow-sm flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=20&width=20"
                alt="Amex"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Direct Payment Option */}
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-12">
            <div className="relative w-[18px] h-[18px]">
              <div
                className={`w-[18px] h-[18px] rounded-full border ${
                  selectedMethod === "direct"
                    ? "bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] border-[#6B72D6]"
                    : "bg-white border-[#6C6C6C]"
                }`}
                onClick={() => setSelectedMethod("direct")}
              >
                {selectedMethod === "direct" && (
                  <div className="absolute w-2 h-2 bg-white rounded-full top-[5px] left-[5px]"></div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[18px] text-[#837D92] font-montserrat">Thanh toán trực tiếp</span>
              <span className="text-[16px] text-[#C6C3CD] font-montserrat">
                Thanh toán trực tiếp qua tài khoản ngân hàng.
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="w-[26px] h-[26px] rounded-full bg-white shadow-sm flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=20&width=20"
                alt="Bank 1"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            <div className="w-[26px] h-[26px] rounded-full bg-white shadow-sm flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=20&width=20"
                alt="Bank 2"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            <div className="w-[26px] h-[26px] rounded-full bg-white shadow-sm flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=20&width=20"
                alt="Bank 3"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Other Payment Methods Option */}
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-12">
            <div className="relative w-[18px] h-[18px]">
              <div
                className={`w-[18px] h-[18px] rounded-full border ${
                  selectedMethod === "other"
                    ? "bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] border-[#6B72D6]"
                    : "bg-white border-[#6C6C6C]"
                }`}
                onClick={() => setSelectedMethod("other")}
              >
                {selectedMethod === "other" && (
                  <div className="absolute w-2 h-2 bg-white rounded-full top-[5px] left-[5px]"></div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[18px] text-[#837D92] font-montserrat">Phương thức thanh toán khác</span>
              <span className="text-[16px] text-[#C6C3CD] font-montserrat">
                Thanh toán qua Gpay, Paypal, Paytm, v.v.
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="w-[26px] h-[26px] rounded-full bg-[#F9F9F9] flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=20&width=20"
                alt="PayPal"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            <div className="w-[26px] h-[26px] rounded-full bg-[#888888] flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=20&width=20"
                alt="GPay"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            <div className="w-[26px] h-[26px] rounded-full bg-[#333333] flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=20&width=20"
                alt="Apple Pay"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            <div className="w-[26px] h-[26px] rounded-full bg-[#5485EC] flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=20&width=20"
                alt="Paytm"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer with terms and payment button */}
      <div className="flex justify-between items-center px-8 py-4 mt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500 font-montserrat">
          Bằng cách nhấp vào "Đặt hàng", bạn đồng ý bị ràng buộc bởi{" "}
          <span className="text-[#936EFF]">Điều khoản chính</span>
        </p>
        <button className="bg-[#936EFF] text-white font-montserrat font-medium py-3 px-8 rounded-full">
          Thanh toán
        </button>
      </div>
    </div>
  )
}

