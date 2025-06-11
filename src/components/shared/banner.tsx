import MAC from '@/assets/brand/MAC.png';
import Loreal from '@/assets/brand/Loreal.png';
import Dior from '@/assets/brand/Dior.png';
import Prada from '@/assets/brand/Prada.png';
export default function Banner() {
  const brands = [
    {
      name: "MAC",
      logo: MAC,
    },
    {
      name: "Dior",
      logo: Dior,
    },
    {
      name: "L'ORÉAL",
      logo: Loreal,
    },
    {
      name: "PRADA",
      logo: Prada,
    },
  ]
  return (
    <div className="flex justify-center mt-[-58px] mb-4 p-4">
      <div className="bg-white rounded-2xl w-[80%] shadow-xl mx-auto">
        <div className="grid grid-cols-4 divide-x divide-gray-300">
          {brands.map((brand, index) => (
            <div key={brand.name} className="flex items-center justify-center p-4">
              <img
                src={brand.logo || "/placeholder.svg"}
                alt={`${brand.name} logo`}
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
