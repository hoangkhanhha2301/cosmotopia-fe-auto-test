import BasePages from '@/components/shared/base-pages.js';
import Footer from '@/components/shared/footer';

export default function RegisterPage() {
  
  return (
    <>
      <BasePages
        className="relative mx-auto max-h-screen w-[80%] flex-1 p-4"
        pageHead="Đăng ký | G-Local"
      >
        <div className="">
          <div className="mx-auto w-[35%] rounded-xl bg-background p-6 shadow-lg">
            <h1 className="">Register</h1>
          </div>
        </div>
        <Footer />
      </BasePages>
    </>
  );
}
