import BasePages from '@/components/shared/base-pages.js';
import Footer from '@/components/shared/footer';

export default function LoginPage() {
  
  return (
    <>
      <BasePages
        className="relative mx-auto max-h-screen w-[80%] flex-1 p-4"
        pageHead="Giỏ hàng | G-Local"
      >
        <div className="">
          <div className="mx-auto w-[35%] rounded-xl bg-background p-4 shadow-lg">
            <h1 className="">Login</h1>
          </div>
        </div>
        <Footer />
      </BasePages>
    </>
  );
}
