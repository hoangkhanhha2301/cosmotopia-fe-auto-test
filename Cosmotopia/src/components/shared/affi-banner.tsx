export default function AffiliateBanner() {
    return (
      <div className="flex flex-col items-center text-center px-6 py-12 bg-white">
        {/* Tiêu đề với hiệu ứng gradient */}
        <h1 className="font-montserrat font-bold text-6xl leading-[145%] text-center
        bg-gradient-to-r from-[#511BEA] via-[#AC3258] via-[#FF850B] via-[#C628A3] to-[#9425D9]
        bg-clip-text text-transparent">
          Trở thành KOL/KOC của chúng tôi
        </h1>
  
        {/* Mô tả */}
        <p className="mt-4 text-lg text-gray-600 max-w-2xl font-montserrat">
          Bạn có website, blog, hoặc kênh mạng xã hội? Hãy biến lượt truy cập thành thu nhập với chương trình affiliate của chúng tôi!
        </p>
  
        {/* Nút đăng ký */}
        <button className="mt-6 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-full shadow-lg hover:scale-105 transition font-montserrat">
          Đăng kí miễn phí
        </button>
  
        {/* Chú thích */}
        <p className="mt-2 text-sm text-gray-500 italic font-montserrat">*Không yêu cầu kinh nghiệm.</p>
      </div>
    );
  }
  