import React from "react";
import { currencyFormat } from "@/lib/utils";
import { IoLocationOutline } from "react-icons/io5";
import { CgArrowsExpandRight } from "react-icons/cg";
import { BsCoin } from "react-icons/bs";

export const RealEstateInfo = ({ item }) => {
  return (
    <div className="text-base flex flex-col gap-2 font-medium">
      <div className="text-[24px] text-neutral-700 font-semibold mb-2">
        {item?.tieuDe}
      </div>
      <div className="flex flex-row gap-2">
        <div className="text-neutral-500 font-medium text-sm flex gap-4 flex-wrap">
          <div className="text-sm flex flex-row gap-1">
            <CgArrowsExpandRight className="mt-1" /> {"Diện tích: "}
            {item?.dienTich}
            {"m2"}
          </div>
          <div className="text-sm flex flex-row gap-1">
            <BsCoin className="mt-1" /> {"Giá: "}
            {currencyFormat(item?.gia)}{" "}
            {item?.isChothue === true ? "/ tháng" : ""}
          </div>
        </div>
      </div>
      <div className="text-neutral-500 text-base font-normal mt-1 w-full">
        <IoLocationOutline className="text-base float-left mr-1 mt-1" />
        {item?.diaChi}
      </div>
    </div>
  );
};
