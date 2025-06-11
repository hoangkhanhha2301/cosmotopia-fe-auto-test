import { FilterAccordion } from "@/components/shared/filter-accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useGetAllBrands } from "@/queries/brand.query";
import { useGetAllCategories } from "@/queries/category.query";

type FiltersPageProps = {
  filters: {
    categories: string[];
    brands: string[];
    prices: string[];
    search: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      categories: string[];
      brands: string[];
      prices: string[];
      search: string;
    }>
  >;
};

export default function FiltersPage({ filters, setFilters }: FiltersPageProps) {
  // Fetch brands
  const { data: brandData, isLoading: isLoadingBrands, error: brandError } = useGetAllBrands();
  const brandItems = brandData?.brands || [];

  // Fetch categories
  const { data: categoryData, isLoading: isLoadingCategories, error: categoryError } = useGetAllCategories();
  const categoryItems = categoryData?.categories || [];

  if (isLoadingBrands || isLoadingCategories) return <p>Đang tải bộ lọc...</p>;
  if (brandError || categoryError) return <p>Không thể tải bộ lọc</p>;

  const handleCategoryChange = (id: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(id)
        ? prev.categories.filter((item) => item !== id)
        : [...prev.categories, id],
    }));
  };

  const handleBrandChange = (id: string) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(id)
        ? prev.brands.filter((item) => item !== id)
        : [...prev.brands, id],
    }));
  };

  const handlePriceChange = (id: string) => {
    setFilters((prev) => ({
      ...prev,
      prices: prev.prices.includes(id) ? [] : [id],
    }));
  };

  console.log(filters);

  const filterItems = [
    {
      id: "category",
      title: "Danh mục",
      icon: "category" as const,
      content: (
        <div className="flex flex-col gap-3">
          {categoryItems.map((category) => (
            <div key={category.categoryId} className="flex items-center space-x-2">
              <Checkbox
                id={category.categoryId}
                checked={filters.categories.includes(category.categoryId)}
                onCheckedChange={() => handleCategoryChange(category.categoryId)}
              />
              <Label htmlFor={category.categoryId}>{category.name}</Label>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "brand",
      title: "Thương hiệu",
      icon: "brand" as const,
      content: (
        <div className="flex flex-col gap-3">
          {brandItems.map((brand) => (
            <div key={brand.brandId} className="flex items-center space-x-2">
              <Checkbox
                id={brand.brandId}
                checked={filters.brands.includes(brand.brandId)}
                onCheckedChange={() => handleBrandChange(brand.brandId)}
              />
              <Label htmlFor={brand.brandId}>{brand.name}</Label>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "price",
      title: "Giá",
      icon: "price" as const,
      content: (
        <div className="flex flex-col gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="a"
              checked={filters.prices.includes("a")}
              onCheckedChange={() => handlePriceChange("a")}
            />
            <Label htmlFor="a">Tăng dần</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="d"
              checked={filters.prices.includes("d")}
              onCheckedChange={() => handlePriceChange("d")}
            />
            <Label htmlFor="d">Giảm dần</Label>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-md space-y-6 p-4">
      <FilterAccordion items={filterItems} />
    </div>
  );
}