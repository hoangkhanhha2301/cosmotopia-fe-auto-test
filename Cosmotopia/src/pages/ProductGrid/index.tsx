import { useState } from "react";
import FiltersPage from "./FilterPage";
import { ProductGrid } from "./ProductGrid";

export default function Page() {
  // Giả sử các filter là các mảng chứa id của lựa chọn
  const [filters, setFilters] = useState({
    categories: [] as string[],
    brands: [] as string[],
    prices: [] as string[],
  });

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[312px_1fr]">
          {/* Sidebar */}
          <div className="flex flex-col gap-3">
            <nav className="w-[342px] space-y-2 p-2">
              <FiltersPage filters={filters} setFilters={setFilters} />
            </nav>
          </div>
          {/* Product Grid */}
          <div className="space-y-6">
            <ProductGrid filters={filters} />
          </div>
        </div>
      </div>
    </main>
  );
}
