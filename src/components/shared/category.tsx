import CategoryImage from '@/assets/category/Category.png';
const categories = [
  {
    id: 1,
    name: "Son",
    image:
      CategoryImage
  },
  {
    id: 2,
    name: "Phấn phủ",
    image:
      CategoryImage
  },
  {
    id: 3,
    name: "Phấn mắt",
    image:
      CategoryImage
  },
  {
    id: 4,
    name: "Kem nền",
    image:
      CategoryImage
  },
  {
    id: 5,
    name: "Má hồng",
    image:
      CategoryImage
  },
  {
    id: 6,
    name: "Khác",
    image:
      CategoryImage
  },
]

export default function ProductCategories() {
  return (
    <div className="container mx-auto px-4 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex justify-between items-start p-4 gap-6 w-[383px] h-[162px] mx-auto bg-white shadow-md rounded-3xl"
          >
            <h3 className="text-lg font-bold font-montserrat text-gray-800">{category.name}</h3>
            <img
              src={category.image}
              alt={category.name}
              className="h-16 w-auto h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
