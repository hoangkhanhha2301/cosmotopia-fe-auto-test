import ScrollToTop from '@/hooks/scroll-to-top';
import { Account } from '@/pages/AdminPage/Account/AccountManager';
import { Brand } from '@/pages/AdminPage/Brand/Brand';
import { Category } from '@/pages/AdminPage/Category/Category';
import { Order } from '@/pages/AdminPage/Order/Order';
import { Product } from '@/pages/AdminPage/Product/Product';
import { Profile } from '@/pages/AdminPage/Profile/Profile';

import ForgotPassword from '@/pages/AuthPage/ForgotPassword';
import NewPassword from '@/pages/AuthPage/NewPassword';
import OtgPage from '@/pages/AuthPage/Otp';
import Cart from '@/pages/Cart';
import DashBoard from '@/pages/Dashboard';
import NotFound from '@/pages/not-found';
import ProductDetail from '@/pages/ProductDetail/ProductDetail';
import Unauthorized from '@/pages/unauthorizedPage';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

const SystemLayout = lazy(() => import('@/components/layout/layout'));
const ProfileLayout = lazy(() => import('@/components/layout/layoutProfile'));
const HomePage = lazy(() => import('@/pages/Home/index'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage/ProfilePage'));
const LoginPage = lazy(() => import('@/pages/AuthPage/Login/index'));
const RegisterPage = lazy(() => import('@/pages/AuthPage/Register/index'));
const OrderTracking = lazy(() => import('@/pages/ProfilePage/OrderTracking'));
const ProductGridPage = lazy(() => import('@/pages/ProductGrid/index'));
const PaymentPage = lazy(() => import('@/pages/Payment/index'));
const SuccessPage = lazy(() => import('@/pages/Payment/Success'));
import helper from '@/helpers/index';
import KOLPage from '@/pages/KOLPage/KOLpage';
import { Tongquan } from '@/pages/KOLPage/TongQuan/Tongquan';
import { ThongKe } from '@/pages/KOLPage/Thongke/ThongKe';
import { DanhSach } from '@/pages/KOLPage/Danhsach/DanhSach';
import { CreateLink } from '@/pages/KOLPage/CreateLink/CreateLink';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { ChangePassWordPage } from '@/pages/ChangePassWordPage';

// ----------------------------------------------------------------------

// case 0: return "Administrator";
// case 1: return "Manager";
// case 2: return "Affiliates";
// case 3: return "Customers";
// case 4: return "Sales Staff";
// case 5: return "Shipper Staff";
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = helper.cookie_get('AT');
  const userObject = token
    ? JSON.parse(helper.cookie_get('user'))
    : { role: 'Guest' };
  const userRole = userObject?.role;

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/401" replace />;
  }
  return children;
};
export default function AppRouter() {
  const systemRoute = [
    {
      path: '/',
      element: (
        <SystemLayout>
          <Suspense>
            <ScrollToTop />
            <Outlet />
          </Suspense>
        </SystemLayout>
      ),
      children: [
        {
          path: '/',
          element: <HomePage />,
          index: true
        },
        // {
        //   path: '/profile',
        //   element: <ProfilePage />
        // },
        {
          path: '/login',
          element: (
            <ProtectedRoute allowedRoles={['Guest']}>
              <LoginPage />
            </ProtectedRoute>
          )
        },
        {
          path: '/register',
          element: (
            <ProtectedRoute allowedRoles={['Guest']}>
              <RegisterPage />
            </ProtectedRoute>
          )
        },
        {
          path: '/otp',
          element: (
            <ProtectedRoute allowedRoles={['Guest']}>
              <OtgPage />
            </ProtectedRoute>
          )
        },
        {
          path: '/newPass',
          element: (
            <ProtectedRoute allowedRoles={['Guest']}>
              <NewPassword />
            </ProtectedRoute>
          )
        },
        {
          path: '/forgotPassword',
          element: (
            <ProtectedRoute allowedRoles={['Guest']}>
              <ForgotPassword />
            </ProtectedRoute>
          )
        },
        {
          path: '/product/:id',
          element: (
            <ProtectedRoute allowedRoles={['Guest', 'Customers', 'Affiliates']}>
              <ProductDetail />
            </ProtectedRoute>
          )
        },
        {
          path: '/cart',
          element: (
            <ProtectedRoute allowedRoles={['Customers', 'Affiliates', 'Guest']}>
              <Cart />
            </ProtectedRoute>
          )
        },
        {
          path: '/productGrid',
          element: (
            <ProtectedRoute allowedRoles={['Customers', 'Affiliates', 'Guest']}>
              <ProductGridPage />
            </ProtectedRoute>
          )
        },
        {
          path: '/payment',
          element: (
            <ProtectedRoute allowedRoles={['Customers', 'Affiliates']}>
              <PaymentPage />
            </ProtectedRoute>
          )
        },
        {
          path: '/success',
          element: (
            <ProtectedRoute allowedRoles={['Customers', 'Affiliates', 'Guest']}>
              <SuccessPage />
            </ProtectedRoute>
          )
        }
      ]
    },
    {
      path: '/profile',
      element: (
        <ProtectedRoute allowedRoles={['Customers', 'Affiliates']}>
          <ProfileLayout>
            <Suspense>
              <ScrollToTop />
              <Outlet />
            </Suspense>
          </ProfileLayout>
        </ProtectedRoute>
      ),
      children: [
        {
          path: '',
          element: <ProfilePage />,
          index: true
        },
        { path: 'orders', element: <OrderTracking /> },
        { path: 'password', element: <ChangePassWordPage /> }
      ]
    }
  ];

  const routes = useRoutes([
    ...systemRoute,
    ...publicRoutes,
    ...AdminRoutes,
    ...KOLRoutes
  ]);

  return routes;
}
const AdminRoutes = [
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute allowedRoles={['Administrator', 'Manager']}>
        <DashBoard />
      </ProtectedRoute>
    ),
    // // { value: 0, label: 'Administrator' },
    // { value: 1, label: 'Manager' },
    // { value: 2, label: 'Affiliates' },
    // { value: 3, label: 'Customers' },
    // { value: 4, label: 'Sales Staff' },
    // { value: 5, label: 'Shipper Staff' }
    children: [
      {
        path: '/dashboard/Product',
        element: <Product />
        // index: true
      },
      {
        path: '/dashboard/category',
        element: <Category />
        // index: true
      },
      {
        path: '/dashboard/brand',
        element: <Brand />
        // index: true
      },
      {
        path: '/dashboard/order',
        element: <Order />
        // index: true
      },
      {
        path: '/dashboard/account',
        element: (
          <ProtectedRoute allowedRoles={['Administrator']}>
            <Account />
          </ProtectedRoute>
        )
        // index: true
      },
      {
        path: '/dashboard/profile',
        element: <Profile />
        // index: true
      }
    ]
    //   <Route
    //     path="/dashboard/account"
    //     element={
    //       <ProtectedRoute roles={["0", "1"]}>
    //         <ManageUser />
    //       </ProtectedRoute>
    //     }
    //   />,

    //   <Route path="/dashboard/campaign" element={<Campaign />} />,
    //   <Route path="/dashboard/post" element={<Post />} />,
    //   <Route
    //     path="/dashboard/jobapplication"
    //     element={<JobApplication />}
    //   />,
  }
];
const KOLRoutes = [
  {
    path: '/kol',
    element: <KOLPage />,

    children: [
      {
        path: '/kol/tongquan',
        element: <Tongquan />
        // index: true
      },
      {
        path: '/kol/thongke',
        element: <ThongKe />
        // index: true
      },
      {
        path: '/kol/danhsach',
        element: <DanhSach />
        // index: true
      },
      {
        path: '/kol/profile',
        element: <Profile />
        // index: true
      },
      {
        path: '/kol/createLink',
        element: <CreateLink />
        // index: true
      }
    ]
  }
];

const publicRoutes = [
  {
    path: '/404',
    element: <NotFound />
  },
  {
    path: '/401',
    element: <Unauthorized />
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />
  }
];
