import { RegisterAffiliate } from '@/pages/KOLPage/RegisterAffiliate/RegisterAffiliate';

export default function AffiliateBanner() {
  return (
    <div className="flex flex-col items-center bg-white px-6 py-12 text-center">
      {/* Tiêu đề với hiệu ứng gradient */}
      <h1
        className="bg-gradient-to-r from-[#511BEA] via-[#AC3258] via-[#C628A3] via-[#FF850B]
        to-[#9425D9] bg-clip-text text-center font-montserrat text-6xl font-bold
        leading-[145%] text-transparent"
      >
        Trở thành KOL/KOC của chúng tôi
      </h1>

      {/* Mô tả */}
      <p className="mt-4 max-w-2xl font-montserrat text-lg text-gray-600">
        Bạn có website, blog, hoặc kênh mạng xã hội? Hãy biến lượt truy cập
        thành thu nhập với chương trình affiliate của chúng tôi!
      </p>

      <RegisterAffiliate />
      {/* Chú thích */}
      <p className="mt-2 font-montserrat text-sm italic text-gray-500">
        *Không yêu cầu kinh nghiệm.
      </p>
    </div>
  );
}
