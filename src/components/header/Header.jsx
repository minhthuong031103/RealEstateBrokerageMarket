/* eslint-disable no-undef */
'use client';

import React, { useEffect, useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import './styles.css';
import { FiMessageSquare } from 'react-icons/fi';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { signOut } from 'next-auth/react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from '@nextui-org/react';
import AuthSvg from '@/assets/AuthSvg';
import { MobileNav } from './MobileNavBar';
import { AiOutlineHeart } from 'react-icons/ai';
import Logo from '../logo';
import BackDropCus from '../backdropCus/backdropCus';
import { useRouter } from 'next/navigation';

const avatarNav = [
  {
    name: 'Hồ sơ',
    href: '/user',
  },
  {
    name: 'Tin nhắn',
    href: '/conversations',
  },
];

const NavigationMenuDemo = ({ session }) => {
  const [user] = useState(session?.user);
  const [show, setShow] = useState('translate-y-0');
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();
  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  });
  const controlNavbar = () => {
    if (window.scrollY > 100) {
      if (window.scrollY > lastScrollY) {
        setShow('-translate-y-[82px]');
      } else {
        setShow('shadow-sm');
      }
    } else {
      setShow('translate-y-0');
    }
    setLastScrollY(window.scrollY);
  };
  return (
    <div
      className={`w-full h-[50px] md:h-[80px] 
    bg-white  items-center justify-between z-20
    sticky top-0 transition-transform duration-300 px-14  
    ${show}
    `}
    >
      <MobileNav />

      <div className="hidden lg:flex py-2 items-center justify-end">
        {isUserOpen ? <BackDropCus isOpen={isUserOpen} /> : null}
        <Logo />
        <NavigationMenu.Root className="relative flex justify-end w-[100vw] me-6">
          <NavigationMenu.List className="flex justify-end">
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="NavigationMenuLink h-full"
                href="/bat-dong-san"
              >
                Bất động sản
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="NavigationMenuLink"
                href="/doi-tac"
              >
                Đối tác
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link
                className="NavigationMenuLink"
                href="/chinh-sach"
              >
                Chính sách
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Indicator className="NavigationMenuIndicator">
              <div className="Arrow" />
            </NavigationMenu.Indicator>
          </NavigationMenu.List>

          <div className="ViewportPosition">
            <NavigationMenu.Viewport className="NavigationMenuViewport" />
          </div>
        </NavigationMenu.Root>
        <Link href={'/agency'}>
          <Button
            className="w-48 bg-red-400 text-white font-medium shadow-lg transition ease-in-out hover:scale-105 hover:shadow-red-200"
            variant="shadow"
            radius="sm"
          >
            Dành cho đối tác
          </Button>
        </Link>
        {user ? (
          <div className="flex flex-row gap-2 items-center justify-center">
            <Link href={'/yeu-thich'}>
              {/* <Button variant="outline" size="icon" className="relative">
                {
                  <AiOutlineHeart className="text-slate-600 stroke-zinc-950 w-4 h-4 " />
                }
              </Button> */}
              <Button
                isIconOnly
                radius="sm"
                variant="bordered"
                className="ml-2 border-1 font-medium border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition ease-in-out hover:scale-105 border-solid"
                aria-label="Like"
              >
                <AiOutlineHeart className="w-4 h-4" />
              </Button>
            </Link>

            <Link href={'/conversations'}>
              {/* <Button variant="outline" size="icon" className="relative">
                {
                  <AiOutlineHeart className="text-slate-600 stroke-zinc-950 w-4 h-4 " />
                }
              </Button> */}
              <Button
                isIconOnly
                radius="sm"
                variant="bordered"
                className="mr-2 border-1 font-medium border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition ease-in-out hover:scale-105 border-solid"
                aria-label="Like"
              >
                <FiMessageSquare className="w-4 h-4" />
              </Button>
            </Link>

            <div className="w-full h-full">
              <Dropdown
                shouldBlockScroll={true}
                onOpenChange={(open) => {
                  setIsUserOpen(open);
                }}
                closeOnSelect={true}
                onClose={() => {
                  setIsUserOpen(false);
                }}
                isOpen={isUserOpen}
              >
                <DropdownTrigger>
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>Guest</AvatarFallback>
                  </Avatar>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownSection title={`${user?.name}`}>
                    {avatarNav.map((item, index) => (
                      <DropdownItem
                        onClick={() => {
                          router.push(item.href);
                        }}
                        className="w-full"
                        key={index}
                      >
                        {item.name}
                      </DropdownItem>
                    ))}

                    <DropdownItem
                      onClick={() => signOut({ callbackUrl: '/auth/login' })}
                    >
                      <div className="flex flex-row gap-2 items-center h-8  ">
                        <div className="">{AuthSvg.signIn()}</div>
                        <div>Đăng xuất</div>
                      </div>
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            </div>

            {/* <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={'/admin/add-product'}>Add Product</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => signOut({ callbackUrl: '/auth/login' })}
                  className="border-solid border-t-2 mt-2  gap-2"
                >
                  <div className="">{AuthSvg.signIn()}</div>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
        ) : (
          <Link href={'/auth/login'}>
            <Button
              className=" ml-2 border-1 font-medium border-red-400 text-red-400 hover:bg-red-400 hover:text-white transition ease-in-out hover:scale-105 border-solid"
              variant="bordered"
              radius="sm"
            >
              Đăng nhập
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

// const ListItem = React.forwardRef(
//   ({ children, title, ...props }, forwardedRef) => (
//     <li>
//       <NavigationMenu.Link asChild>
//         <a className={'ListItemLink'} {...props} ref={forwardedRef}>
//           <div className="ListItemHeading">{title}</div>
//           <p className="ListItemText">{children}</p>
//         </a>
//       </NavigationMenu.Link>
//     </li>
//   )
// );

export default NavigationMenuDemo;
