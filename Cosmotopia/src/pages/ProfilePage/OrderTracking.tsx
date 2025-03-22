import { Image } from "antd";
import { Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetAllOrders } from "@/queries/cart.query"; // Import hook gọi API


const orderStatuses = [
  { id: "all", label: "Tất cả" },
  { id: "confirmed", label: "Đã xác nhận" },
  { id: "delivering", label: "Đang giao" },
  { id: "shipping", label: "Đã giao" },
  { id: "cancelled", label: "Đã hủy" },
];

export default function OrderTracking() {
  const [activeStatus, setActiveStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useGetAllOrders(currentPage, 3);
  console.log(data);
  if (isLoading) return <p>Đang tải đơn hàng...</p>;
  if (error) return <p>Lỗi khi tải đơn hàng!</p>;
 
  const allOrders = data?.orders || [];

  // Lọc đơn hàng theo trạng thái
  const filteredOrders =
    activeStatus === "all"
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
            className={`rounded-xl px-4 py-3 text-sm transition-colors font-montserrat ${
              activeStatus === status.id
                ? "bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] bg-clip-text font-medium text-transparent"
                : "text-[#4E4663]"
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>

      {/* Order List */}
      {filteredOrders.map((order) => (
        <div key={order.orderId} className="rounded-3xl bg-white p-6 shadow-lg">
          {/* Delivery Status */}
          <div className="mb-6 flex items-center gap-2 border-b border-gray-200/50 pb-6">
            <Truck className="h-6 w-6 text-[#9C3CFD]" />
            <span className="bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] bg-clip-text text-sm font-normal text-transparent font-montserrat">
              Đơn hàng {order.status === 3 ? "đã được giao thành công" : "đang xử lý"}
            </span>
          </div>

          {/* Product Details */}
          {order.orderDetails.map((item) => (
            <div key={item.orderDetailId} className="mb-6 flex items-start justify-between border-b border-gray-200/50 pb-6">
              <div className="flex gap-3">
                <div className="h-20 w-20 overflow-hidden rounded-xl">
                <Image src={item.imageUrl[0]} alt="Sản phẩm" width={80} height={80} className="h-full w-full object-cover rounded-xl" />
                </div>
                <div>
                  <h3 className="text-lg text-[#4E4663]"><b className="font-montserrat">{item.name}</b></h3>
                  <div className="mt-2 bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] bg-clip-text text-xl font-bold text-transparent font-montserrat">
                    {item.unitPrice.toLocaleString()} VNĐ
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-base text-[#4E4663] font-montserrat"><b className="font-montserrat">Số lượng: {item.quantity}</b> </span>
              </div>
            </div>
          ))}

          {/* Total and Actions */}
          <div className="flex justify-between">
            <div className="flex items-center gap-4">
              <span className="text-lg font-medium text-[#4E4663] font-montserrat">Tổng:</span>
              <span className="text-xl font-bold text-[#347B28] font-montserrat">
                {order.totalAmount.toLocaleString()} VNĐ
              </span>
            </div>
            <div className="flex gap-6">
              <button className="rounded-full bg-gradient-to-r from-[#ED1DBF] via-[#A831F1] to-[#3561FE] bg-clip-text text-transparent px-12 py-3 text-lg font-bold shadow-sm font-montserrat">
                Đánh giá
              </button>
              <button className="rounded-full bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] px-12 py-3 text-lg font-bold text-white shadow-lg font-montserrat">
                Mua lại
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] font-bold text-white shadow-lg disabled:opacity-50 font-montserrat"
        >
          Trước
        </button>
        <span className="text-lg font-medium flex items-center">{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#9C3CFD] to-[#BF38FF] font-bold text-white shadow-lg disabled:opacity-50 font-montserrat"
        >
          Tiếp
        </button>
      </div>
    </div>
  );
}

// Chuyển đổi mã trạng thái từ số sang chuỗi
const mapStatus = (status) => {
  switch (status) {
    case 2:
      return "confirmed";
    case 3:
      return "shipping";
    case 4:
      return "delivering";
    case 5:
      return "cancelled";
    default:
      return "all";
  }
};
