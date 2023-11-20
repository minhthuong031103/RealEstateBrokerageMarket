"use client";

import { SearchBar } from "./SearchBar";

function SearchHome() {
  return (
    <div className="relative h-[640px] md:h-[730px] lg:h-[910px]">
      <img
        src="https://cutewallpaper.org/34/estate-house-wallpaper/676823207.jpg"
        className="absolute w-full h-full top-0 left-0 "
        alt={""}
        style={{ objectFit: "cover" }}
      />
      <div className="absolute w-full h-full top-0 left-0  bg-neutral-950 opacity-50 "></div>
      <div className="absolute w-full h-full top-0 left-0  bg-transparent lg:mt-[200px] md:mt-[100px] mt-[50px]">
        <h1 className="text-white text-center text-[24px] md:text-[36px] lg:text-[45px]">
          Tìm kiếm ngôi nhà trong mơ của bạn
        </h1>
        <h1 className="text-white text-center text-[16px] md:text-[18px] lg:text-[20px] mt-2">
          Chỉ với một cú nhấp chuột, khám phá ngay nào !
        </h1>
        <SearchBar />
      </div>
    </div>
  );
}

export default SearchHome;
