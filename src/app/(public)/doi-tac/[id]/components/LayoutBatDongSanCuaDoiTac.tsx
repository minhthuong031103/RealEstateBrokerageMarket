"use client";
import { useState } from "react";
import { BatDongSanNoiBat } from "../../../bat-dong-san/(components)/BatDongSanNoiBat";
import { ListComponent } from "./ListComponent";
import { SearchComponent } from "../../../bat-dong-san/(components)/SearchComponent";
import { DoiTacInfo } from "./DoiTacInfo";
import { CacLoaiHinhBatDongSan } from "@/app/(public)/bat-dong-san/(components)/CacLoaiHinhBatDongSan";
import { Separator } from "@/components/ui/separator";

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
export function LayoutBatDongSanCuaDoiTac({ id }) {
  const [searchProps, setSearchProps] = useState<searchType>({
    searchWord: "",
    location: "",
    type: "",
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
          <DoiTacInfo id={id} />
          <SearchComponent setSearchProps={setSearchProps} />
          <BatDongSanNoiBat />
          <CacLoaiHinhBatDongSan />
        </div>
        <div className="basis-[65%]">
          <Separator className="lg:hidden h-[6px] mt-4 mb-8 w-[96%] text-gray-500 rounded-md" />
          <ListComponent searchProps={searchProps} id={id} />
        </div>
      </div>
    </>
  );
}
