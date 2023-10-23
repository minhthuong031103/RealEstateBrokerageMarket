"use client";
import { Button } from "@/components/ui/button";
import { useDoiTac } from "@/hooks/useDoiTac";
import { useEffect, useState } from "react";
import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
export const DoiTacInfo = ({ id }) => {
  const [doiTacInformation, setDoiTacInformation] = useState();
  const { fetchDoiTacTheoId } = useDoiTac();
  useEffect(() => {
    const getDoiTacInformation = async () => {
      await fetchDoiTacTheoId(id).then((data) => {
        setDoiTacInformation(data[0]);
        console.log(data);
      });
    };
    getDoiTacInformation();
  }, []);
  return (
    <div className="p-8 mr-6 rounded-xl bg-white border-[1px] shadow-sm space-y-4">
      <div className="flex flex-row gap-4 mt-4 flex-wrap">
        <img
          src={doiTacInformation?.avatar}
          className="rounded-md h-[180px] w-[180px] lg:w-[90px] lg:h-[90px]"
        />
        <div>
          <div className="font-semibold text-[16px] mt-2">
            {doiTacInformation?.name}
          </div>
          <div className="text-[14px] mt-2">
            <div className="flex flex-row gap-2 w-full">
              <AiOutlinePhone className="py-auto" />
              {doiTacInformation?.phoneNumber}
            </div>
            <div className="flex flex-row gap-2 w-full">
              <HiOutlineMail />
              {doiTacInformation?.email}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2 text-[14px] mt-1 text-gray-400">
        <IoLocationOutline className="text-[24px]" />
        {doiTacInformation?.diaChi}
      </div>
      <Button className="mt-4 w-[94%] lg:w-[50%]">Liên hệ</Button>
    </div>
  );
};
