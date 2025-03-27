import { useRouter } from '@/routes/hooks';
import { Button } from '@/components/ui/button';
import helper from '@/helpers/index';
import { optionsRole } from '../AdminPage/Account/AccountManager';
import { useEffect, useState } from 'react';
import { getAccountSelf } from '@/queries/user.api';
// // { value: 0, label: 'Administrator' },
//   { value: 1, label: 'Manager' },
//   { value: 2, label: 'Affiliates' },
//   { value: 3, label: 'Customers' },
//   { value: 4, label: 'Sales Staff' },
//   { value: 5, label: 'Shipper Staff' }
const dashboardRole = [0, 1];
export default function Unauthorized() {
  const [urlBack, setUrlBack] = useState('/');
  const router = useRouter();
  useEffect(() => {
    getAccountSelf().then((data) => {
      const roleType = data.data?.roleType;

      if (dashboardRole.includes(roleType)) {
        setUrlBack('/dashboard');
      }
    });
  });

  return (
    <div className="absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
      <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        401
      </span>
      <h2 className="font-heading my-2 text-2xl font-bold">Unauthorized</h2>
      <p>Sorry, you don't have permission to access this page.</p>
      <div className="mt-8 flex justify-center gap-2">
        <Button onClick={() => router.push(urlBack)} variant="ghost" size="lg">
          Back to Home
        </Button>
      </div>
    </div>
  );
}
