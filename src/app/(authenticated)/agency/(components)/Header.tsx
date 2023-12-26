"use client";

import { Button } from "@nextui-org/react";
import Logo from "@/components/logo";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import AuthSvg from "@/assets/AuthSvg";
import { FiMessageSquare } from "react-icons/fi";
import Link from "next/link";

const avatarNav = [
  {
    name: "Hồ sơ",
    href: "/user",
  },
];

function Header({ session }) {
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [user] = useState(session?.user);
  const router = useRouter();
  return (
    <div className="flex justify-between align-middle pt-3 pl-3 pr-3 h-fit w-full shadow-md bg-white">
      <div>
        <Logo />
      </div>
      <div className="flex flex-row gap-3 max-w-full">
        <Link href={"/conversations"}>
          {/* <Button variant="outline" size="icon" className="relative">
    {
      <AiOutlineHeart className="text-slate-600 stroke-zinc-950 w-4 h-4 " />
    }
  </Button> */}
          <Button
            isIconOnly
            radius="sm"
            variant="bordered"
            className="border-1 font-medium border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition ease-in-out hover:scale-105 border-solid"
            aria-label="Like"
          >
            <FiMessageSquare className="w-4 h-4" />
          </Button>
        </Link>
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
                onClick={() => signOut({ callbackUrl: "/auth/login" })}
              >
                <div className="flex flex-row gap-2 items-center h-8  ">
                  <div className="">{AuthSvg.signIn()}</div>
                  <div>Logout</div>
                </div>
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
}

export default Header;
