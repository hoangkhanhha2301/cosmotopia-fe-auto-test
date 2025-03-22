import { Icons } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import { useSidebar } from '@/hooks/use-sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { usePathname } from '@/routes/hooks';
import { Link } from 'react-router-dom';
import { Input } from '../ui/input';
import { useRouter } from '@/routes/hooks';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { useSearchShoes } from '@/queries/shoes.query';
import { PagingModel } from '@/constants/data';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}
type ProductType = {
  id: string;
  name: string;
  price: string;
  sales: number;
};

export default function HeaderNav({
  items,
  setOpen,
  isMobileNav = false
}: DashboardNavProps) {
  const path = usePathname();
  const route = useRouter();
  const { isMinimized } = useSidebar();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [pagingModel, setPagingModel] = useState(PagingModel);
  const { mutateAsync: searchShoes, data, isPending } = useSearchShoes();
  const auth = useSelector((state: RootState) => state.auth);
  const cart = useSelector((state: RootState) => state.cart.cartDetail);
  useEffect(() => {
    if (debouncedSearchTerm) {
      handleSearch();
    } else {
      setProducts([]);
    }
  }, [debouncedSearchTerm]);

  const handleSearch = async () => {
    const pagingSearch = { ...pagingModel, keyword: debouncedSearchTerm };
    const res = await searchShoes(pagingSearch);
    if (res) {
      setProducts(res.listObjects);
      console.log(res);
    }
  };

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="relative border-b border-gray-200 drop-shadow-md z-[50]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap justify-center sm:justify-start space-x-8 py-4">
          <li>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Sản phẩm
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Top Brand
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Top Reviews
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Personal color test
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Lorem
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
