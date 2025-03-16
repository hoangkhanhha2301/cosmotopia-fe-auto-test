import { useState, useRef, useEffect } from "react"
import { useRouter } from '@/routes/hooks';
import PersonIcon from '@mui/icons-material/Person';
import { Dropdown, MenuProps } from "antd";
import { Link } from "react-router-dom";




interface UserAccountMenuProps {
  auth: boolean
  handleLogout?: () => void
}

export function UserAccountMenu({ auth, handleLogout }: UserAccountMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to="/profile/orders" className="block px-4 py-2 text-[#32294B] font-montserrat font-normal text-base hover:bg-gray-100">
          Đơn hàng
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to="/profile" className="block px-4 py-2 text-[#32294B] font-montserrat font-normal text-base hover:bg-gray-100">
          Tài khoản
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <span onClick={handleLogout} className="block px-4 py-2 text-[#32294B] font-montserrat font-normal text-base hover:bg-gray-100">
          Đăng xuất
        </span>
      ),
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="user flex items-center">
        <PersonIcon className="text-blue-500 mr-1 h-6 w-6" />
        {auth ? (
          // <div className="flex cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          //   <span className="hover:cursor-pointer font-montserrat">Tài khoản</span>
          // </div>
          <Dropdown menu={{ items }} placement="bottomCenter">
            <span className="hover:cursor-pointer font-montserrat">Tài khoản</span>
          </Dropdown>
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



      {/* {auth && isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-3xl bg-white shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="py-2 px-1">

            <div className="mt-1">
              <a href="#" className="block px-4 py-2 text-[#32294B] font-montserrat font-normal hover:bg-gray-100">
                Đơn hàng
              </a>
              <a
                onClick={() => router.push("/profile")}
                className="block px-4 py-2 text-[#32294B] font-montserrat font-normal hover:bg-gray-100 cursor-pointer"
              >
                Tài khoản
              </a>
              <a
                onClick={handleLogout}
                className="block px-4 py-2 text-[#32294B] font-montserrat font-normal hover:bg-gray-100 cursor-pointer"
              >
                Đăng xuất
              </a>
            </div>
          </div>
        </div>
      )} */}
    </div>
  )
}

