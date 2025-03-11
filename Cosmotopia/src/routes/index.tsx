import ScrollToTop from '@/hooks/scroll-to-top';
import { Product } from '@/pages/AdminPage/Product/Product';

import ForgotPassword from '@/pages/AuthPage/ForgotPassword';
import NewPassword from '@/pages/AuthPage/NewPassword';
import OtgPage from '@/pages/AuthPage/Otp';
import Cart from '@/pages/Cart';
import DashBoard from '@/pages/Dashboard';
import NotFound from '@/pages/not-found';
import ProductDetail from '@/pages/ProductDetail/ProductDetail';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

const SystemLayout = lazy(() => import('@/components/layout/layout'));
const HomePage = lazy(() => import('@/pages/Home/index'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage/index'));
const LoginPage = lazy(() => import('@/pages/AuthPage/Login/index'));
const RegisterPage = lazy(() => import('@/pages/AuthPage/Register/index'));

// ----------------------------------------------------------------------

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
        {
          path: '/profile',
          element: <ProfilePage />
        },
        {
          path: '/login',
          element: <LoginPage />
        },
        {
          path: '/register',
          element: <RegisterPage />
        },
        {
          path: '/otp',
          element: <OtgPage />
        },
        {
          path: '/newPass',
          element: <NewPassword />
        },
        {
          path: '/forgotPassword',
          element: <ForgotPassword />
        },
        {
          path: '/product',
          element: <ProductDetail />
        },
        {
          path: '/cart',
          element: <Cart />
        }
      ]
    }
  ];
  const AdminRoutes = [
    {
      path: '/dashboard',
      element: <DashBoard />,
      children: [
        {
          path: '/dashboard/Product',
          element: <Product />
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

  const publicRoutes = [
    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];

  const routes = useRoutes([...systemRoute, ...publicRoutes, ...AdminRoutes]);

  return routes;
}
