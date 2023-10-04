"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Separator } from "@/components/ui/separator";

import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import {} from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import Link from "next/link";
export function ListItemComponent() {
  return (
    <Link href={`/chi-tiet-bat-dong-san/${1}`}>
      <Card className="hover:shadow-2xl transition ease-in-out duration-200 hover:scale-[1.01]">
        <CardContent>
          <div className="mt-6 rounded-sm relative">
            {/* <img
            className="rounded-md"
            src="https://wallpapers.com/images/hd/house-corner-architecture-7vl0mtz3dfxod0fd.webp"
          /> */}
            <Carousel
              autoPlay={true}
              infiniteLoop={true}
              showIndicators={false}
              showThumbs={false}
              showStatus={false}
            >
              <div className="lg:h-[180px] xl:h-[200px] md:h-[480px] h-[280px]">
                <Image
                  src="https://wallpapers.com/images/hd/house-corner-architecture-7vl0mtz3dfxod0fd.webp"
                  alt="Auth background"
                  layout="fill"
                  className="rounded-xl"
                  objectFit="cover"
                  priority
                  quality={100}
                />
                <div className="absolute inset-0 bg-black opacity-10" />
              </div>
              <div>
                <Image
                  src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1423,c_limit/481ae448-c295-48cb-b593-fbb80821d102/jordan.png"
                  alt="Auth background"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                  priority
                  quality={100}
                />
                <div className="absolute inset-0 bg-black opacity-10" />
              </div>
              <div>
                <Image
                  src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1423,c_limit/f9e3a04d-c620-45c5-802e-1094a20c6cd9/jordan.png"
                  alt="Auth background"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                  priority
                  quality={100}
                />
                <div className="absolute inset-0 bg-black opacity-10" />
              </div>
            </Carousel>
            <BranchPost type={"Nổi bật"}></BranchPost>
            <p className="font-semibold text-[24px] text-white absolute bottom-4 left-6   ">
              10.000.000đ
            </p>
          </div>
          <div className="mt-6 space-y-2 mb-6">
            <div className="text-red-500 text-sm">Chung cư</div>
            <div className="text-neutral-600 text-base">
              Biệt thự làng Việt Kiều châu Âu
            </div>
            <div className="text-neutral-500 text-sm">
              <IoLocationOutline className="text-base float-left" />
              Làng Chung cư Việt Kiều châu Âu, Mỗ Lao, Hà Đông, Hà Nội
            </div>
            <div className="text-neutral-500 text-sm flex justify-between flex-wrap">
              <p>Phòng ngủ: 6</p>
              <p>Phòng tắm: 4</p>
              <p>DT: 500m2</p>
            </div>
          </div>
          <Separator />
        </CardContent>
        <CardFooter className="flex justify-between flex-wrap gap-x-2">
          <div className="flex flex-row">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <p className="ml-2 text-gray-500 text-[14px] mt-auto mb-auto">
              Nguyễn Văn A
            </p>
          </div>
          <p className="ml-2 text-gray-500 text-[14px] float-right">
            5 tháng trước
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}

function BranchPost(type) {
  return type === "Nổi bật" ? (
    <p className="bg-emerald-500 w-[82px] h-[24px] rounded-md text-white text-[14px] text-center py-2 absolute top-4 left-6">
      Nổi bật
    </p>
  ) : (
    <p className="bg-red-500 w-[82px] h-[24px] rounded-md text-white text-[14px] text-center py-2 absolute top-4 left-6">
      Yêu thích
    </p>
  );
}
