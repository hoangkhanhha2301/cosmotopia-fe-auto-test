import { Tooltip, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ProductCard } from "@/components/shared/product-card";
import { useRouter } from "@/routes/hooks";
import { useGetListProductsByPaging } from "@/queries/product.query";
import { useEffect } from "react";

export function ProductGrid() {
  const router = useRouter();
  const getProducts = useGetListProductsByPaging();
  console.log(getProducts);

  useEffect(() => {
    getProducts.mutate({ page: 1, pageSize: 10 }); // Gọi API khi component mount
  }, []);

  if (getProducts.isPending) {
    return <p>Loading...</p>; // Hiển thị trạng thái loading
  }

  if (getProducts.isError) {
    return <p>Error loading products</p>; // Hiển thị lỗi nếu API call thất bại
  }

  const products = getProducts.data || []; // Lấy dữ liệu sản phẩm từ API

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product: any, i: number) => (
        <TooltipProvider key={product.productId || i}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div onClick={() => router.push(`/product/${product.productId}`)} className="cursor-pointer">
                <ProductCard
                  title={product.name}
                  description={product.description}
                  price={`${product.price} VND`}
                  rating={product.commissionRate} // Dùng commissionRate làm rating nếu không có
                  image={product.imageUrls?.[0] || ""}
                  isNew={product.isActive} // Dùng isActive để xác định sản phẩm mới
                />
              </div>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
