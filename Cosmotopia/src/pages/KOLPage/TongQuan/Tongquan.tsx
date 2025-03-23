import { Image } from 'antd';
import React, { FC } from 'react';

interface TongquanProps {}
const campaigns = Array(5).fill({
  name: 'Phấn mắt Flower Know',
  category: 'Mắt',
  revenue: '4.406.888 vnd',
  clicks: 124,
  cr: '7,2 %',
  image: '/logo.png' // Thay bằng URL hình thật
});

export const Tongquan: FC<TongquanProps> = ({}) => {
  return (
    <div>
      {/* Banner */}
      <div className="rounded-2xl bg-pink-200 px-20 py-10  shadow-md">
        <p className="text-sm text-gray-700">
          Chào buổi sáng, <span className="font-semibold">ChloeNguyen</span>
        </p>
        <div className=" bg-gradient-to-r from-[#ED1DBF] via-[#A831F1] to-[#3561FE]  bg-clip-text text-transparent ">
          <h2 className=" bg-clip-text text-2xl font-bold text-transparent ">
            Bạn đã làm rất tốt
          </h2>
          <h2 className=" bg-clip-text text-2xl font-bold text-transparent">
            Bạn đã kiếm <span className="text-black">10.087.000 VND</span> trong
            tuần này...
          </h2>
        </div>
        <p className="mt-2 text-sm text-gray-600">15/03/2025</p>
      </div>
      {/* Thống kê */}
      <div className="mt-6 grid grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="relative overflow-hidden rounded-xl bg-white p-4 shadow-md">
          {/* Nội dung chính */}
          <p className="mb-2 text-sm text-gray-600">Thu nhập tuần</p>
          <h3 className="text-2xl font-bold">
            10.087.000 <span className="text-sm">vnd</span>
          </h3>
          <div className="mt-2 flex gap-1 text-xs">
            <img src="/KOL/TongQuan/Up.svg" alt="" />{' '}
            <span className="text-green-500">8.5%</span> so với tuần trước
          </div>

          {/* Hình ảnh góc phải */}
          <img
            src="/KOL/TongQuan/Earn.svg"
            alt="Money"
            style={{ width: '55px' }}
            className="absolute right-1 top-1"
          />
        </div>

        {/* Card 2 */}
        <div className="relative overflow-hidden rounded-xl bg-white p-4 shadow-md">
          <p className="mb-2 text-sm text-gray-600">Lượt click</p>
          <h3 className="text-2xl font-bold">
            1.078 <span className="text-sm">click</span>
          </h3>
          <div className="mt-2 flex gap-1 text-xs">
            <img src="/KOL/TongQuan/Up.svg" alt="" />{' '}
            <span className="text-green-500">8.5%</span> so với tuần trước
          </div>
          <img
            src="/KOL/TongQuan/Click.svg"
            alt="Money"
            style={{ width: '55px' }}
            className="absolute right-1 top-1"
          />
        </div>

        {/* Card 3 */}
        <div className="relative overflow-hidden rounded-xl bg-white p-4 shadow-md">
          <p className="mb-2 text-sm text-gray-600">Conversions</p>
          <h3 className="text-2xl font-bold">321</h3>
          <div className="mt-2 flex gap-1 text-xs">
            <img src="/KOL/TongQuan/Up.svg" alt="" />{' '}
            <span className="text-green-500">8.5%</span> so với tuần trước
          </div>
          <img
            src="/KOL/TongQuan/Conversions.svg"
            alt="Money"
            style={{ width: '55px' }}
            className="absolute right-1 top-1"
          />
        </div>

        {/* Card 4 */}
        <div className="relative overflow-hidden rounded-xl bg-white p-4 shadow-md">
          <p className="mb-2 text-sm text-gray-600">CR</p>
          <h3 className="text-2xl font-bold">
            0,07 <span className="text-sm">%</span>
          </h3>
          <div className="mt-2 flex gap-1 text-xs">
            <img src="/KOL/TongQuan/down.svg" alt="" />
            <span className="text-red-500">4.5%</span> so với tuần trước
          </div>
          <img
            src="/KOL/TongQuan/CR.svg"
            alt="Money"
            style={{ width: '55px' }}
            className="absolute right-1 top-1"
          />
        </div>
      </div>
      <div className="mt-6 rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Top 5 Campaigns</h2>
        <div className="space-y-4">
          {campaigns?.map((campaign, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Image
                  preview={false}
                  src={campaign.image}
                  alt="product"
                  height={36}
                  width={36}
                  className="h-12 w-12 rounded-md"
                />
                <div>
                  <p className="font-medium">{campaign.name}</p>
                  <p className="text-base  text-gray-500">
                    {campaign.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-10">
                <div className="text-right">
                  <p className="text-base ">Doanh Thu</p>
                  <p className="font-semibold text-gray-500">
                    {campaign.revenue}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-base ">Click</p>
                  <p className="font-semibold text-gray-500">
                    {campaign.clicks}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-base ">CR</p>
                  <p className="font-semibold text-gray-500">{campaign.cr}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
