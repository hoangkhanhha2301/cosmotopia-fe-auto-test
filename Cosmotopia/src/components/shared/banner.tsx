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
      <div className="bg-pink-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 p-8">
              {brands.map((brand) => (
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
      </div>
    )
  }