import BasePages from '@/components/shared/base-pages.js';
import Footer from '@/components/shared/footer';
export default function ProfilePage() {

  return (
    <>
      <BasePages
        className="relative mx-auto max-h-screen w-[80%] flex-1  p-4"
        pageHead="Giỏ hàng | Cosmotopia"
      >
        <div className="mt-2 grid h-full grid-cols-[30%,65%] gap-10">
          Profile Page
        </div>
        <Footer />
      </BasePages>
    </>
  );
}
