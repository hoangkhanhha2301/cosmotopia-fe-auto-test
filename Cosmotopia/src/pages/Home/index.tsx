import BasePages from '@/components/shared/base-pages.js';
import Footer from '@/components/shared/footer';
export default function ShopPage() {
  return (
    <div className="bg-white">

      <BasePages
        className="relative mx-auto w-full flex-1 overflow-y-auto bg-white"
        pageHead="Trang chủ | G-Local"
      >
        Homepage
      </BasePages>
      <Footer />
    </div>
  );
}
