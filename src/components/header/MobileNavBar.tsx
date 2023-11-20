"use client";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { CommonSvg } from "@/assets/CommonSvg";
import Link from "next/link";

const mainNavItems = [
  {
    title: "Trang chủ",
    items: [
      {
        title: "Tìm kiếm bất động sản",
        href: "/bat-dong-san",
        description: "Find real estate",
        items: [],
      },
      {
        title: "Tìm kiếm đối tác",
        href: "/doi-tac",
        description: "Find agency",
        items: [],
      },
      {
        title: "Chính sách văn phòng",
        href: "/chinh-sach",
        description: "Policy",
        items: [],
      },
    ],
  },
  {
    title: "Hồ sơ",
    items: [
      {
        title: "Thông tin cá nhân",
        href: "/bat-dong-san",
        description: "profile",
        items: [],
      },
      {
        title: "Tin nhắn",
        href: "/doi-tac",
        description: "Message",
        items: [],
      },
      {
        title: "Kênh đối tác",
        href: "/chinh-sach",
        description: "agency channel",
        items: [],
      },
    ],
  },
];
export function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent
           focus-visible:bg-transparent focus-visible:ring-0 
           focus-visible:ring-offset-0 lg:hidden"
        >
          {CommonSvg.menuBurger()}
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pl-1 pr-0">
        <div className="px-7">
          <Link
            aria-label="Home"
            href="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <span className="font-bold">{"UITEstate"}</span>
          </Link>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="pl-1 pr-7">
            <Accordion type="single" collapsible className="w-full">
              {mainNavItems?.map((item, index) => (
                <AccordionItem value={item.title} key={index}>
                  <AccordionTrigger className="text-sm capitalize">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-2">
                      {item.items?.map((subItem, index) =>
                        subItem.href ? (
                          <MobileLink
                            key={index}
                            href={String(subItem.href)}
                            pathname={pathname}
                            setIsOpen={setIsOpen}
                            disabled={subItem.disabled}
                          >
                            {subItem.title}
                          </MobileLink>
                        ) : (
                          <div
                            key={index}
                            className="text-foreground/70 transition-colors"
                          >
                            {item.title}
                          </div>
                        )
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps {
  children?: React.ReactNode;
  href: string;
  disabled?: boolean;
  pathname: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileLink({
  children,
  href,
  disabled,
  pathname,
  setIsOpen,
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground",
        pathname === href && "text-foreground",
        disabled && "pointer-events-none opacity-60"
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  );
}
