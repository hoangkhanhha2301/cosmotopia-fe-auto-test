import { ProductGrid } from "./ProductGrid"
import FiltersPage from "./FilterPage"
export default function Page() {
    return (
        <main className="min-h-screen bg-gray-50 p-4">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[312px_1fr]">
                    {/* Sidebar */}
                    <div className="flex flex-col gap-3">
                        <nav className="w-[312px] space-y-2 p-2">
                            <FiltersPage />
                        </nav>
                    </div>
                    {/* Product Grid */}
                    <div className="space-y-6">
                        <ProductGrid />
                    </div>
                </div>
            </div>
        </main>
    )
}
