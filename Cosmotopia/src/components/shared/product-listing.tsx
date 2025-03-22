import * as React from "react"
import { ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Tooltip, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/shared/product-card"
import { useRouter } from '@/routes/hooks';
import ProductImage from '@/assets/category/Category.png'
import { useGetListProductsByPaging } from "@/queries/product.query"

const categories = [
  { name: "Tất cả", href: "#" },
  { name: "Mắt", href: "#" },
  { name: "Môi", href: "#" },
  { name: "Lông mày", href: "#" },
  { name: "Má", href: "#" },
  { name: "Cọ", href: "#" },
  { name: "Tẩy trang", href: "#" },
]


export function ProductListing() {
  const [activeCategory, setActiveCategory] = React.useState("Tất cả")
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState(1);

  const pageSize = 9;

  // Gọi API với trang hiện tại và kích thước trang
  const { data, isPending, isError } = useGetListProductsByPaging({
    page: currentPage,
    pageSize: pageSize
  });

  console.log(data);

  const products = data?.products || [];
  console.log(products);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[312px_1fr]">
        {/* Sidebar */}
        <div className="flex flex-col gap-3">
          <nav className="w-[312px] space-y-2 p-2">
            {categories.map((category) => (
              <TooltipProvider key={category.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setActiveCategory(category.name)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl shadow-lg bg-white p-3 text-left transition-all hover:bg-purple-50",
                        activeCategory === category.name ? "text-purple-600" : "text-gray-700 hover:text-purple-600",
                      )}
                    >
                      <span className="text-base font-normal font-montserrat">{category.name}</span>
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 transition-colors",
                          activeCategory === category.name ? "text-purple-600" : "text-gray-400",
                        )}
                      />
                    </button>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            ))}
          </nav>

          {/* Trend Card */}
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#C274FD] to-[#C973FD] p-6 text-white shadow-lg">
            <div className="relative z-10 space-y-4">
              <h3 className="font-montserrat text-4xl font-bold tracking-tight">Trend</h3>
              <p className="font-montserrat text-[18px] text-lg font-light text-white/90">Mỹ phẩm xu hướng hiện nay</p>
              <Button
                variant="secondary"
                size="lg"
                className="h-[62px] w-[151px] rounded-full bg-white font-montserrat text-lg font-medium text-purple-600 shadow-md hover:bg-white/90 hover:text-purple-700"
              >
                Xem ngay
              </Button>
            </div>
            {/* Background decoration */}
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-purple-400/20 blur-2xl" />
            <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-purple-400/20 blur-2xl" />
          </div>
        </div>

        {/* Product Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#2D2D2D]">Sản phẩm nổi bật</h2>
            <Button
              onClick={() => router.push('/productGrid')}
              variant="link"
              className="text-purple-600">
              Xem tất cả
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <TooltipProvider key={i}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div onClick={() => router.push(`/product/${product.productId}`)}
                      className="cursor-pointer"
                    >
                      <ProductCard
                        title={product.name}
                        description={product.description}
                        price={product.price}
                        rating={product.rating}
                        image={product.image}
                        isNew={product.isNew}
                      />
                    </div>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
