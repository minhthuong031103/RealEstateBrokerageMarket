"use client";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { BatDongSanNoiBat } from "./BatDongSanNoiBat";
import { CacLoaiHinhBatDongSan } from "./CacLoaiHinhBatDongSan";
import { ListComponent } from "./ListComponent";
import { SearchComponent } from "./SearchComponent";

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
export function LayoutBatDongSan() {
  const [searchProps, setSearchProps] = useState<searchType>();
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  const tukhoa = searchParams?.get("tukhoa");
  const diachi = searchParams?.get("diachi");
  const loaibds = searchParams?.get("loaibds");
  const hinhthuc = searchParams?.get("hinhthuc");
  useEffect(() => {
    setProps();
  }, []);

  const setProps = () => {
    setSearchProps({
      searchWord: tukhoa || "",
      location: diachi || "",
      type: loaibds || "",
      branch: "",
      isRent: hinhthuc || "",
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
  };
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
