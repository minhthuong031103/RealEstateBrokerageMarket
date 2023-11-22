"use client";

import { Card } from "@/components/ui/card";
import React from "react";
import { parseJSON } from "@/lib/utils";
import { RealEstateStatus } from "./(realestateItem)/RealEstateStatus";
import { RealEstateInfo } from "./(realestateItem)/RealEstateInfo";
import { RealEstateModalList } from "./RealEstateModalList";
import { MdApartment, MdOutlineSell } from "react-icons/md";
import { BiHome } from "react-icons/bi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { GiIsland } from "react-icons/gi";

export function RealEstateCard({ item }) {
  return (
    <Card className="mt-4 cursor-pointer" key={`batdongsan_${item.id}`}>
      <RealEstateStatus trangthai={item.trangThai} />
      <div className="flex flex-row">
        <div className="md:w-1/6 h-[180px] sm:h-[270px] md:h-[180px] m-3 rounded-md overflow-hidden">
          <img
            src={parseJSON(item?.hinhAnhSanPham)[0].url}
            className={"w-full h-full object-cover"}
          />
        </div>
        <div className="md:w-5/6 m-3">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex flex-row  h-fit my-1 gap-4">
              <div className="text-red-500 text-sm flex flex-row gap-1">
                {item?.loaiHinh?.loaiBDS?.name === "Căn hộ" ? (
                  <MdApartment className="mt-1" />
                ) : item?.loaiHinh?.loaiBDS?.name === "Nhà ở" ? (
                  <BiHome className="mt-1" />
                ) : item?.loaiHinh?.loaiBDS?.name === "Văn phòng" ? (
                  <HiOutlineOfficeBuilding className="mt-1" />
                ) : (
                  <GiIsland className="mt-1" />
                )}
                {" - "}
                {item?.loaiHinh?.name}
              </div>
              <div className="text-emerald-500 text-sm flex flex-row gap-1">
                <MdOutlineSell className="mt-1" />
                {" - "}
                {item.isChothue === true ? "Cho thuê" : "Đăng bán"}
              </div>
            </div>
            <div className="ml-auto">
              <RealEstateModalList id={item.id} />
            </div>
          </div>
          <RealEstateInfo item={item} />
        </div>
      </div>
    </Card>
  );
}
export default RealEstateCard;
