"use client";
import { useState } from "react";
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
  return (
    <>
      <div className="flex flex-col gap-6 lg:gap-0 lg:flex-row pt-8">
        <div className="basis-[35%]">
          <SearchComponent setSearchProps={setSearchProps} />
        </div>
        <div className="basis-[65%]">
          <ListComponent searchProps={searchProps} />
        </div>
      </div>
    </>
  );
}
