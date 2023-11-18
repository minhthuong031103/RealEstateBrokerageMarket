"use client";

import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";

export function ContactInfo({ doiTacInfo }) {
  return (
    <div className="lg:basis-1/4 h-[380px] sm:h-[380px] lg:h-full rounded-md bg-white border-[1px] shadow p-6">
      <div className="font-semibold text-[24px]">Đăng bởi</div>
      <div className="flex flex-row lg:flex-col gap-4 mt-4">
        <img
          src={doiTacInfo?.avatar}
          className="rounded-md h-[180px] w-[180px] lg:w-[90px] lg:h-[90px]"
        />
        <div>
          <div className="font-semibold text-[16px] mt-4">
            {doiTacInfo?.name}
          </div>
          <div className="text-[14px] mt-2 overflow-hidden">
            <div className="flex flex-row gap-2">
              <AiOutlinePhone className="py-auto" />
              {doiTacInfo?.phoneNumber}
            </div>
            <div className="flex flex-row gap-2">
              <HiOutlineMail />
              {doiTacInfo?.email}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2 text-[14px] mt-1 text-gray-400">
        <IoLocationOutline className="text-[24px]" />
        {doiTacInfo?.diaChi}
      </div>
    </div>
  );
}
