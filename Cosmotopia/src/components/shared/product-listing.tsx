
import { Bookmark, ChevronRight, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import ProductImage from '@/assets/category/Category.png'
import { useRouter } from '@/routes/hooks';
import React from "react"


const categories = [
  { name: "Tất cả", href: "#" },
  { name: "Mắt", href: "#" },
  { name: "Môi", href: "#" },
  { name: "Lông mày", href: "#" },
  { name: "Má", href: "#" },
  { name: "Cọ", href: "#" },
  { name: "Tẩy trang", href: "#" },
]

const products = Array(6).fill({
  name: "Kem nền SOUL MAN",
  description: "Anti-Aging Face Serum, With Purifying",
  price: "379.000 VND",
  rating: 4.5,
  isNew: true,
  image: ProductImage,
})


export function ProductListing() {
  const [activeCategory, setActiveCategory] = React.useState("Tất cả")
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[305px_1fr]">
        {/* Sidebar */}
        <div className="flex flex-col gap-3">
          <nav className="w-[305px] space-y-2 p-2">
            {categories.map((category) => (
              <TooltipProvider key={category.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => setActiveCategory(category.name)}
                      className={cn(
                        " flex w-full items-center justify-between rounded-xl shadow-lg bg-white p-3 text-left transition-all hover:bg-purple-50",
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
                  <TooltipContent side="right" className="bg-white" sideOffset={5}>
                    <div className="grid gap-2">
                      <h3 className="font-medium">{category.name}</h3>
                      <p className="font-montserrat text-sm text-muted-foreground">Xem các sản phẩm {category.name.toLowerCase()}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </nav>

          {/* Trend Card */}
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#C274FD] to-[#C973FD] p-6 text-white shadow-lg">
            <div className="relative z-10 space-y-4">
              <h3 className="font-montserrat text-4xl font-bold tracking-tight">Trend</h3>
              <p className="font-montserrat text-lg font-light text-white/90">Mỹ phẩm xu hướng hiện nay</p>
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
            <Button variant="link" className="text-purple-600">
              Xem tất cả
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <TooltipProvider key={i}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card className="group relative overflow-hidden rounded-3xl transition-shadow hover:shadow-lg" onClick={() => router.push('/product')}>
                      <CardHeader className="p-0">
                        <div className="relative aspect-square">
                          <Badge variant="secondary" className="absolute left-4 top-4 z-10">
                            New
                          </Badge>
                          <Button size="icon" variant="ghost" className="absolute right-4 top-4 z-10">
                            <Bookmark className="h-5 w-5" />
                          </Button>
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2 p-4">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-1">
                          {Array(5)
                            .fill(null)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  "h-4 w-4",
                                  i < Math.floor(product.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "fill-gray-200 text-gray-200",
                                )}
                              />
                            ))}
                          <span className="ml-1 text-sm text-muted-foreground">{product.rating}/5</span>
                        </div>
                        <span className="font-medium text-purple-600">{product.price}</span>
                      </CardFooter>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[300px] bg-white">
                    <div className="grid gap-2">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Rating: {product.rating}/5</span>
                        <span className="font-medium text-purple-600">{product.price}</span>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

