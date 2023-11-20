"use client";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { BatDongSanNoiBat } from "../../../(components)/BatDongSanNoiBat";
import { CacLoaiHinhBatDongSan } from "../../../(components)/CacLoaiHinhBatDongSan";
import { ListComponent } from "../../../(components)/ListComponent";
import { SearchComponent } from "../../../(components)/SearchComponent";

export interface searchType {
  searchWord: string;
  location: string;
  type: string;
  branch: string;
  isRent: string;
  loaiCanHo: string;
  loaiNhaO: string;
  loaiVanPhong: string;
  loaiDatDai: string;
  huongBanCong: string;
  huongCuaChinh: string;
  huongDat: string;
  soPhongNgu: string;
  soPhongTam: string;
  minPrice: string;
  maxPrice: string;
  minSquare: string;
  maxSquare: string;
}
export function LayoutBatDongSanTheoType({ id }) {
  const [searchProps, setSearchProps] = useState<searchType>({
    searchWord: "",
    location: "",
    type:
      id === "1"
        ? "Căn hộ"
        : id === "2"
        ? "Đất"
        : id === "3"
        ? "Nhà ở"
        : "Văn phòng",
    branch: "",
    isRent: "",
    loaiCanHo: "",
    loaiNhaO: "",
    loaiVanPhong: "",
    loaiDatDai: "",
    huongBanCong: "",
    huongCuaChinh: "",
    huongDat: "",
    soPhongNgu: "",
    soPhongTam: "",
    minPrice: "",
    maxPrice: "",
    minSquare: "",
    maxSquare: "",
  });

  return (
    <>
      <div className="flex flex-col gap-6 lg:gap-0 lg:flex-row pt-8 pb-8">
        <div className="basis-[35%] flex flex-col gap-4">
          <SearchComponent setSearchProps={setSearchProps} />
          <BatDongSanNoiBat />
          <CacLoaiHinhBatDongSan />
        </div>
        <div className="basis-[65%]">
          <Separator className="lg:hidden h-[6px] mt-4 mb-8 w-[96%] text-gray-500 rounded-md" />
          <ListComponent searchProps={searchProps} />
        </div>
      </div>
    </>
  );
}
