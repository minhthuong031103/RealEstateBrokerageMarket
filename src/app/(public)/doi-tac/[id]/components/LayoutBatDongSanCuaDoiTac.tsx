"use client";
import { useState } from "react";
import { BatDongSanNoiBat } from "../../../bat-dong-san/components/BatDongSanNoiBat";
import { ListComponent } from "./ListComponent";
import { SearchComponent } from "../../../bat-dong-san/components/SearchComponent";
import { DoiTacInfo } from "./DoiTacInfo";

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
  const [searchProps, setSearchProps] = useState<searchType>();
  return (
    <>
      <div className="flex flex-col gap-6 lg:gap-0 lg:flex-row pt-8 pb-8">
        <div className="basis-[35%] flex flex-col gap-4">
          <DoiTacInfo id={id} />
          <SearchComponent setSearchProps={setSearchProps} />
          <BatDongSanNoiBat />
        </div>
        <div className="basis-[65%]">
          <ListComponent searchProps={searchProps} id={id} />
        </div>
      </div>
    </>
  );
}
