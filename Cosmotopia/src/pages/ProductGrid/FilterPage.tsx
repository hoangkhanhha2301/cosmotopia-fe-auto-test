import { FilterAccordion } from "@/components/shared/filter-accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"

export default function FiltersPage() {
  const filterItems = [
    {
      id: "category",
      title: "Danh mục",
      icon: "category" as const,
      content: (
        <div className="flex flex-col gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="makeup" />
            <Label htmlFor="makeup">Trang điểm</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="skincare" />
            <Label htmlFor="skincare">Chăm sóc da</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="haircare" />
            <Label htmlFor="haircare">Chăm sóc tóc</Label>
          </div>
        </div>
      ),
    },
    {
      id: "brand",
      title: "Brand",
      icon: "brand" as const,
      content: (
        <div className="flex flex-col gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="brand1" />
            <Label htmlFor="brand1">Maybelline</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="brand2" />
            <Label htmlFor="brand2">L'Oreal</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="brand3" />
            <Label htmlFor="brand3">Innisfree</Label>
          </div>
        </div>
      ),
    },
    {
      id: "skinType",
      title: "Loại da",
      icon: "skinType" as const,
      content: (
        <RadioGroup defaultValue="normal">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dry" id="dry" />
            <Label htmlFor="dry">Da khô</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="normal" id="normal" />
            <Label htmlFor="normal">Da thường</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="oily" id="oily" />
            <Label htmlFor="oily">Da dầu</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="combination" id="combination" />
            <Label htmlFor="combination">Da hỗn hợp</Label>
          </div>
        </RadioGroup>
      ),
    },
    {
      id: "coverage",
      title: "Độ che phủ",
      icon: "coverage" as const,
      content: (
        <RadioGroup defaultValue="medium">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="light" id="light" />
            <Label htmlFor="light">Nhẹ</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium">Trung bình</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="full" id="full" />
            <Label htmlFor="full">Đầy đủ</Label>
          </div>
        </RadioGroup>
      ),
    },
    {
      id: "colorTone",
      title: "Tông màu",
      icon: "colorTone" as const,
      content: (
        <div className="grid grid-cols-4 gap-2">
          {["#FFDBAC", "#F1C27D", "#E0AC69", "#C68642", "#8D5524", "#5C3836"].map((color) => (
            <div
              key={color}
              className="h-8 w-8 cursor-pointer rounded-full border border-gray-300"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      ),
    },
    {
      id: "effect",
      title: "Hiệu ứng",
      icon: "effect" as const,
      content: (
        <div className="flex flex-col gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="effect1" />
            <Label htmlFor="effect1">Matte</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="effect2" />
            <Label htmlFor="effect2">Dewy</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="effect3" />
            <Label htmlFor="effect3">Satin</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="effect4" />
            <Label htmlFor="effect4">Glossy</Label>
          </div>
        </div>
      ),
    },
    {
      id: "price",
      title: "Giá",
      icon: "price" as const,
      content: (
        <div className="space-y-4">
          <Slider defaultValue={[500000]} max={2000000} step={50000} />
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">0đ</span>
            <span className="text-sm text-gray-500">2.000.000đ</span>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="mx-auto max-w-md space-y-6 p-4">
      <FilterAccordion items={filterItems} />
    </div>
  )
}

