"use client";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

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
export function ListItemNoiBat({ item }) {
  return (
    <Link href={`bat-dong-san/chi-tiet-bat-dong-san/${item?.id}`}>
      <div className="hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_-8px_15px_-3px_rgba(0,0,0,0.1)] rounded-md transition ease-in-out duration-200 h-full p-4">
        <div className="rounded-sm relative">
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
          <div className="text-neutral-500 text-sm leading-6 items-center">
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
      </div>
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
