import React from "react";
import SearchHome from "./components/SearchHome";
import TypeCollection from "./components/TypeCollection";
import BatDongSanNoiBatHome from "./components/BatDongSanNoiBat";
import BatDongSanKhuVuc from "./components/BatDongSanKhuVuc";
import Banner from "./components/Banner";
import FindMore from "./components/FindMore";

const page = async () => {
  return (
    <div className="mt-0 flex h-full w-full flex-col">
      <SearchHome />
      <TypeCollection />
      <BatDongSanNoiBatHome />
      <BatDongSanKhuVuc />
      <Banner />
      <FindMore />
    </div>
  );
};
export default page;
