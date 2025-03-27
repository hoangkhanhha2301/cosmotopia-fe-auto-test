import BasePages from '@/components/shared/base-pages.js';
import Profile from './ProfilePage';
import OrderTracking from './OrderTracking';
import { ProfileSidebar } from './Sidebar';
export default function ProfilePage() {
  return (
    <>
      <BasePages className="relative mx-auto w-[80%] flex-1 p-4">
        <div className="mb-8 flex  w-full justify-between gap-10">
          <div className="flex w-1/4 flex-col gap-10">
            <ProfileSidebar />
          </div>
          <div className="flex w-3/4 flex-col rounded-md bg-white p-10 shadow-lg ">
            <Profile />
            {/* <OrderTracking/> */}
          </div>
        </div>
        {/* <Footer /> */}
      </BasePages>
    </>
  );
}
