import { Image } from 'antd';
import { Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useGetAllOrdersBySelf } from '@/queries/cart.query'; // Import hook gọi API
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useNavigate } from 'react-router-dom';

const orderStatuses = [
  { id: 'all', label: 'Tất cả' },
  { id: 'pending', label: 'Chờ thanh toán' },
  { id: 'confirmed', label: 'Đã xác nhận' },
  { id: 'delivering', label: 'Đang giao' },
  { id: 'shipping', label: 'Đã giao' },
  { id: 'cancelled', label: 'Đã hủy' }
];

export default function OrderTracking() {
  const [activeStatus, setActiveStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useGetAllOrdersBySelf(currentPage, 3);
  const navigate = useNavigate();
  console.log(data);
  if (isLoading) return <p>Đang tải đơn hàng...</p>;
  if (error) return <p>Lỗi khi tải đơn hàng!</p>;

  dayjs.extend(utc);
  dayjs.extend(timezone);

  const allOrders =
    data?.orders.sort(
      (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
    ) || [];

  // Lọc đơn hàng theo trạng thái
  const filteredOrders =
    activeStatus === 'all'
      ? allOrders
      : allOrders.filter((order) => mapStatus(order.status) === activeStatus);

  const totalPages = data?.totalPages || 1;

  return (
    <div className="mx-auto max-w-4xl space-y-4 p-4">
      {/* Status Navigation */}
      <div className="flex items-center justify-between rounded-md bg-white shadow-lg">
        {orderStatuses.map((status) => (
          <button
            key={status.id}
            onClick={() => {
              setActiveStatus(status.id);
              setCurrentPage(1);
            }}
            className={`rounded-xl px-4 py-3 font-montserrat text-sm transition-colors ${
              activeStatus === status.id
                ? 'bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] bg-clip-text font-medium text-transparent'
                : 'text-[#4E4663]'
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>

      {/* Order List */}
      {filteredOrders?.length > 0 ? (
        filteredOrders?.map((order) => (
          <div
            key={order.orderId}
            className="rounded-3xl bg-white p-6 shadow-lg"
          >
            {/* Delivery Status */}
            <div className="flex justify-between">
              <div className="mb-6 flex items-center gap-2 border-b border-gray-200/50 pb-6">
                <Truck className="h-6 w-6 text-[#9C3CFD]" />
                <span className="bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] bg-clip-text font-montserrat text-sm font-normal text-transparent">
                  Đơn hàng{' '}
                  {(order.status === 3 && 'đã được giao thành công') ||
                    (order.status === 2 && 'đang giao') ||
                    (order.status === 1 && 'đã xác nhận') ||
                    (order.status === 0 && 'chờ thanh toán')}
                </span>
              </div>
              <span className="bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] bg-clip-text font-montserrat text-sm font-normal text-transparent">
                {dayjs
                  .utc(order.orderDate)
                  .tz('Asia/Ho_Chi_Minh')
                  .format('HH:mm DD/MM/YYYY')}
              </span>
            </div>

            {/* Product Details */}
            {order.orderDetails.map((item) => (
              <div
                key={item.orderDetailId}
                className="mb-6 flex items-start justify-between border-b border-gray-200/50 pb-6"
              >
                <div className="flex gap-3">
                  <div className="h-20 w-20 overflow-hidden rounded-xl">
                    <Image
                      src={item.imageUrl[0]}
                      alt="Sản phẩm"
                      width={80}
                      height={80}
                      className="h-full w-full rounded-xl object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg text-[#4E4663]">
                      <b className="font-montserrat">{item.name}</b>
                    </h3>
                    <div className="mt-2 bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] bg-clip-text font-montserrat text-xl font-bold text-transparent">
                      {item.unitPrice.toLocaleString()} VNĐ
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-montserrat text-base text-[#4E4663]">
                    <b className="font-montserrat">Số lượng: {item.quantity}</b>{' '}
                  </span>
                </div>
              </div>
            ))}

            {/* Total and Actions */}
            <div className="flex justify-between">
              <div className="flex items-center gap-4">
                <span className="font-montserrat text-lg font-medium text-[#4E4663]">
                  Tổng:
                </span>
                <span className="font-montserrat text-xl font-bold text-[#347B28]">
                  {order.totalAmount.toLocaleString()} VNĐ
                </span>
              </div>
              <div className="flex gap-6">
                {/* <button className="rounded-full bg-gradient-to-r from-[#ED1DBF] via-[#A831F1] to-[#3561FE] bg-clip-text px-12 py-3 font-montserrat text-lg font-bold text-transparent shadow-sm">
                  Đánh giá
                </button>
                <button
                  className="rounded-full bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] px-12 py-3 font-montserrat text-lg font-bold text-white shadow-lg"
                  onClick={() => {
                    navigate('/payment', { state: order.orderDetails });
                  }}
                >
                  Mua lại
                </button> */}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="mt-2 px-2">Không có đơn hàng nào</p>
      )}

      {/* Pagination Controls */}
      {/* <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="rounded-lg bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] px-4 py-2 font-montserrat font-bold text-white shadow-lg disabled:opacity-50"
        >
          Trước
        </button>
        <span className="flex items-center text-lg font-medium">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="rounded-lg bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] px-4 py-2 font-montserrat font-bold text-white shadow-lg disabled:opacity-50"
        >
          Tiếp
        </button>
      </div> */}
    </div>
  );
}

// Chuyển đổi mã trạng thái từ số sang chuỗi
const mapStatus = (status) => {
  switch (status) {
    case 0:
      return 'pending';
    case 1:
      return 'confirmed';
    case 2:
      return 'delivering';
    case 3:
      return 'shipping';
    case 4:
      return 'cancelled';
    default:
      return 'all';
  }
};
