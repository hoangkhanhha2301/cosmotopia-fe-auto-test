import HeaderNav from '@/components/shared/header-nav';
import { navItems, subNavItems } from '@/constants/data';
import { cn } from '@/lib/utils';
import cosmeLogo from '@/assets/logo/cosme_logo.png';
import { Search } from 'lucide-react';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
export default function Sidebar() {
  return (
    <nav
      className={cn(
        `relative z-10 mx-auto hidden w-[80%] flex-none md:block`,
        status && 'duration-500',
        'w-full'
      )}
    >
      <div
        className={cn('mx-auto w-[80%] px-0', 'justify-center ')}
      >
        <div className="flex items-center justify-between border-b border-gray-200 drop-shadow-md py-4">
          <>
            <div className="flex items-center text-[36px]">
              <img
                src={cosmeLogo}
                alt="cosme-logo"
                className='w-8 h-8 mr-2'
              />
              Cosmotopia
            </div>
            <div className="max-w-2xl mx-auto w-full px-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                  <Search className="h-5 w-5" />
                </div>
                <input
                  type="search"
                  placeholder="Tìm kiếm..."
                  className="w-full py-3 pl-10 pr-4 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 transition-shadow"
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
              <div className='cart'>
                <ShoppingCartIcon className="text-blue-500 w-6 h-6 mr-1" />
                <span className="font-montserrat">Giỏ hàng</span>
              </div>
              <div className="user flex items-center">
                <PersonIcon className="text-blue-500 w-6 h-6 mr-1" />
                <span className="font-montserrat">Tài khoản</span>
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
