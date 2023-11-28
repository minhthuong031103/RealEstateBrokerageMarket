"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Separator } from "@/components/ui/separator";

import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { BiHome } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import Link from "next/link";
import { parseJSON } from "@/lib/utils";
import { GiIsland } from "react-icons/gi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { MdApartment } from "react-icons/md";

const CURRENCY_FORMAT = new Intl.NumberFormat(undefined, {
  currency: "VND",
  style: "currency",
});
export function formatCurrency(value: number) {
  return CURRENCY_FORMAT.format(value);
}
export function ListItemComponent({ item }) {
  return (
    <Link href={`/bat-dong-san/chi-tiet-bat-dong-san/${item?.id}`}>
      <Card className="hover:shadow-2xl transition ease-in-out duration-200 hover:scale-[1.01] h-full">
        <CardContent>
          <div className="mt-6 rounded-sm relative">
            <Carousel
              autoPlay={false}
              infiniteLoop={false}
              showIndicators={false}
              showThumbs={false}
              showStatus={false}
            >
              {parseJSON(item?.hinhAnhSanPham)?.map((item) => (
                <div className="lg:h-[180px] xl:h-[200px] md:h-[480px] h-[280px]">
                  <Image
                    src={item?.url}
                    alt="Auth background"
                    layout="fill"
                    className="rounded-xl"
                    objectFit="cover"
                    priority
                    quality={100}
                  />
                  <div className="absolute inset-0 bg-black opacity-10" />
                </div>
              ))}
            </Carousel>
            <div className="flex flex-row gap-2 absolute top-4 left-6">
              <HinhThuc type={item?.isChothue}></HinhThuc>
              <BranchPost type={item?.nhan}></BranchPost>
            </div>
            <p className="font-semibold text-[24px] text-white absolute bottom-4 left-6   ">
              {formatCurrency(item?.gia)}
              {item?.isChothue === true ? (
                <p className="text-[20px] font-normal"> /Tháng</p>
              ) : (
                <></>
              )}
            </p>
          </div>
          <div className="mt-6 space-y-2 mb-6">
            <div className="text-red-500 text-sm flex flex-row gap-1 items-center">
              {item?.loaiHinh?.loaiBDS?.name === "Căn hộ" ? (
                <MdApartment />
              ) : item?.loaiHinh?.loaiBDS?.name === "Nhà ở" ? (
                <BiHome />
              ) : item?.loaiHinh?.loaiBDS?.name === "Văn phòng" ? (
                <HiOutlineOfficeBuilding />
              ) : (
                <GiIsland />
              )}
              {" - "}
              {item?.loaiHinh?.name}
            </div>
            <div className="text-neutral-600 text-base">{item?.tieuDe}</div>
            <div className="text-neutral-500 text-sm leading-6">
              <IoLocationOutline className="text-base float-left mr-1 mt-1" />
              {item?.diaChi}
            </div>
            <div className="text-neutral-500 text-sm flex justify-between gap-4 flex-wrap">
              {item?.loaiHinh?.loaiBDS?.id === 1 ||
              item?.loaiHinh?.loaiBDS?.id === 3 ? (
                <p>Phòng ngủ: {item?.soPhongNgu}</p>
              ) : (
                <></>
              )}
              {item?.loaiHinh?.loaiBDS?.id === 1 ||
              item?.loaiHinh?.loaiBDS?.id === 3 ? (
                <p>Phòng tắm: {item?.soPhongTam}</p>
              ) : (
                <></>
              )}
              <p>DT: {item?.dienTich}m2</p>
            </div>
          </div>
          <Separator />
        </CardContent>
        <CardFooter className="flex justify-between flex-wrap gap-x-2">
          <div className="flex flex-row">
            <Avatar>
              <AvatarImage src={item?.user?.avatar} />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <p className="ml-2 text-gray-500 text-[14px] mt-auto mb-auto">
              {item?.user?.name}
            </p>
          </div>
          <p className="ml-2 text-gray-500 text-[14px] float-right">
            {TinhThoiGian(item?.ngayDang)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}

function BranchPost(type) {
  return type?.type === "Yêu thích" ? (
    <p className="bg-blue-500 w-[82px] h-[20px] rounded-md text-white text-[14px] text-center py-2">
      Yêu thích
    </p>
  ) : type?.type === "Nổi bật" ? (
    <p className="bg-red-500 w-[82px] h-[20px] rounded-md text-white text-[14px] text-center py-2">
      Nổi bật
    </p>
  ) : type?.type === "Hoàn thành" ? (
    <p className="bg-emerald-500 w-[100px] h-[20px] rounded-md text-white text-[14px] text-center py-2">
      Hoàn thành
    </p>
  ) : (
    <></>
  );
}

function HinhThuc(type) {
  return (
    <p className="bg-[#3E4C66] w-[82px] h-[20px] rounded-md text-white text-[14px] text-center py-2">
      {type?.type === false ? "Đăng bán" : "Cho thuê"}
    </p>
  );
}

function TinhThoiGian(type) {
  const time = new Date(type).toLocaleDateString("en-GB").split("/");
  const year = new Date().getFullYear() - parseInt(time[2]);
  const month = new Date().getMonth() + 1 - parseInt(time[1]);
  const day = new Date().getDate() - parseInt(time[0]);
  if (year !== 0) {
    return year + " năm trước";
  } else if (month !== 0) {
    return month + " tháng trước";
  } else if (day !== 0) {
    return day + " ngày trước";
  } else {
    return "Hôm nay";
  }
}
