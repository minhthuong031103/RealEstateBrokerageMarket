"use client";
import { Separator } from "@/components/ui/separator";
import { Zoom } from "@/components/ui/zoom-image";
import { useOffice } from "@/hooks/useOffice";
import { CircularProgress, Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";

export const ThongTinLayout = () => {
  const [info, setInfo] = useState();
  const { fetchOffice } = useOffice();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getOfficeInformation = async () => {
      setIsLoading(true);
      await fetchOffice().then((data) => {
        setInfo(data);
        setIsLoading(false);
      });
    };
    getOfficeInformation();
  }, []);
  return (
    <div className="relative min-h-[1032px]">
      <div className="flex flex-row mt-6">
        <div className="w-1/3 p-6  rounded-lg bg-white shadow-md">
          <div className="text-xl font-meduim">{info?.nameOffice}</div>
          <p className="text-neutral-700 text-sm">{info?.aboutUs}</p>
          <Separator className="mt-2 mb-2" />
          <p className="text-xl font-medium">Thông tin liên hệ</p>
          <div className="flex flex-row gap-2 text-neutral-700 text-sm mb-1 mt-1">
            <IoLocationOutline className="text-[24px] mt-1" />
            {info?.address}
          </div>
          <div className="flex flex-row gap-2 text-neutral-700 text-sm mb-1 mt-1">
            <AiOutlinePhone className="mt-1" />
            {info?.phoneNumber}
          </div>
          <div className="flex flex-row gap-2 text-neutral-700 text-sm mb-1 mt-1">
            <HiOutlineMail className="mt-1" />
            {info?.email}
          </div>
          <Separator className="mt-2 mb-2" />
          <div className="text-center text-base font-medium mb-2">
            Chúng tôi là đội ngũ môi giới có giấy chứng nhận bất động sản vô
            cùng uy tín
          </div>
          <Zoom>
            <img
              src={info?.anhGiayPhep}
              className="w-full rounded"
              alt="Giấy chứng nhận hành nghề"
            />
          </Zoom>
          <div className="mt-2 text-neutral-700 text-center">
            Cảm ơn bạn đã tin tưởng đội ngũ chúng tôi
          </div>
        </div>
        <Divider orientation="vertical" />
        <div className="w-2/3 pt-3 pb-3 pl-6">
          <div className="text-xl font-meduim">Chính sách văn phòng</div>
          <div
            id="policy-container"
            dangerouslySetInnerHTML={{ __html: `${info?.policy}` }}
          ></div>
        </div>
      </div>
      {isLoading ? (
        <div className="w-full h-full flex justify-center bg-gray-200 z-10 absolute top-0">
          <CircularProgress
            color="primary"
            aria-label="Loading..."
            classNames={{
              svg: "w-28 h-28 drop-shadow-md",
            }}
          />
        </div>
      ) : null}
    </div>
  );
};
