import HeaderNav from '@/components/shared/header-nav';
import { navItems} from '@/constants/data';
import { cn } from '@/lib/utils';
import cosmeLogo from '@/assets/logo/cosme_logo.png';
import { LogOutIcon, Search } from 'lucide-react';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRouter } from '@/routes/hooks';
import helper from '@/helpers/index';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useLogout } from '@/queries/auth.query';
import { logout } from '@/redux/auth.slice';

export default function Sidebar() {
  const router = useRouter();
  const accessToken = helper.cookie_get('AT');
  const auth = useSelector((state: RootState) => state.auth.isLogin);
  const { mutateAsync: logoutAccount } = useLogout();
  const dispatch = useDispatch();

  console.log(auth);

  const handleLogout = async () => {
    await logoutAccount({
      accessToken: accessToken,
    });
    helper.cookie_delete('RT');
    helper.cookie_delete('AT');
    router.push('/login');
    dispatch(logout());
  };
  return (
    <nav
      className={cn(
        `relative z-10 mx-auto hidden w-[80%] flex-none md:block`,
        status && 'duration-500',
        'w-full'
      )}
    >
      <div className={cn('mx-auto w-[80%] px-0', 'justify-center ')}>
        <div className="flex items-center justify-between border-b border-gray-200 py-4 drop-shadow-md">
          <>
            <span
              onClick={() => router.push('/')}
              className="flex items-center text-[36px] hover: cursor-pointer ">
              <img src={cosmeLogo} alt="cosme-logo" className="mr-2 h-8 w-8" />
              Cosmotopia
            </span>
            <div className="flex-1 px-12">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                  <Search className="h-5 w-5" />
                </div>
                <input
                  type="search"
                  placeholder="Tìm kiếm..."
                  className="w-full rounded-full bg-gray-100 py-3 pl-10 pr-4 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
            </div>
            <div className="flex items-center gap-6">
              {/* {subNavItems.map((item, index) => {
                const Icon = Icons[item.icon || 'arrowRight'];
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:text-muted-foreground"
                  >
                    <Icon className={`ml-2.5 size-5`} />
                    <span className="mr-2 truncate text-[13px]">
                      {item.title}
                    </span>
                  </div>
                );
              })} */}
              <div className="cart">
                <ShoppingCartIcon className="text-blue-500 mr-1 h-6 w-6" />
                <span
                  onClick={() => router.push('/cart')}
                  className="hover:cursor-pointer font-montserrat">
                  Giỏ hàng
                </span>
              </div>
              <div className="user flex items-center">
                <PersonIcon className="text-blue-500 mr-1 h-6 w-6" />
                {auth ? (
                  <div className="flex flex-col">
                    <span onClick={() => router.push("/profile")} className="hover:cursor-pointer font-montserrat">
                      Tài khoản
                    </span>
                    <button onClick={handleLogout} className="flex items-center space-x-2 hover:text-white mt-2">
                      <LogOutIcon className="h-5 w-5" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                ) : (
                  <p className="font-montserrat">
                    <span onClick={() => router.push("/login")} className="hover:cursor-pointer font-montserrat">
                      Đăng nhập
                    </span>
                    /{" "}
                    <span onClick={() => router.push("/register")} className="hover:cursor-pointer font-montserrat">
                      Đăng ký
                    </span>
                  </p>
                )}
              </div>
            </div>
          </>
        </div>
        <div className="space-y-4 pb-4">
          <HeaderNav items={navItems} />
        </div>
      </div>
    </nav>
  );
}
