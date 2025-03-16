import { Tooltip, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import ProductImage from '@/assets/category/Category.png'
import { ProductCard } from "@/components/shared/product-card"
import { useRouter } from "@/routes/hooks"

const products = Array(13).fill({
    title: "Kem nền SOUL MAN",
    description: "Anti-Aging Face Serum, With Purifying",
    price: "379.000 VND",
    rating: 4.5,
    isNew: true,
    image: ProductImage,
})

export function ProductGrid() {
    const router = useRouter();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[312px_1fr]">
                {/* Product Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product, i) => (
                        <TooltipProvider key={i}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div onClick={() => router.push('/product')}
                                        className="cursor-pointer"
                                    >
                                        <ProductCard
                                            title={product.title}
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
    )
}

