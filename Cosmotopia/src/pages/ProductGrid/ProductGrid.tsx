import { Tooltip, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ProductCard } from "@/components/shared/product-card";
import { useRouter } from "@/routes/hooks";
import { useGetListProductsByPaging } from "@/queries/product.query";

export function ProductGrid() {
  const router = useRouter();
  const { data: products = [], isPending, isError } = useGetListProductsByPaging({ page: 1, pageSize: 9 });
  console.log(products);
  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;

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
                  rating={product.commissionRate}
                  image={product.imageUrls?.[0] || ""}
                  isNew={product.isActive}
                />
              </div>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
