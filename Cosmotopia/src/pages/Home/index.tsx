import BasePages from '@/components/shared/base-pages.js';
// import Footer from '@/components/shared/footer';
import Banner from '@/components/shared/banner';
import BannerImage from '@/assets/banner/banner.jpg';
import ProductCategories from '@/components/shared/category';
import { ProductListing } from '@/components/shared/product-listing';
import MakeupTones from '@/components/shared/style';
import AffiliateBanner from '@/components/shared/affi-banner';
import ColorTest from '@/components/shared/color-test';
export default function ShopPage() {
  return (
    <div className="bg-white">
      <div className="relative">
        {/* Image Banner */}
        <img className="w-full" alt="banner" src={BannerImage} />
        
        {/* Banner Component */}
        <Banner />
      </div>
      <BasePages
        className="relative mx-auto w-full flex-1 overflow-y-auto bg-white"
        pageHead="Trang chủ | Cosmotopia"
      >
        <ProductCategories/>
        <ProductListing/>
        <MakeupTones/>
        <ColorTest/>
        <AffiliateBanner/>
      </BasePages>
      {/* <Footer /> */}
    </div>
  );
}

