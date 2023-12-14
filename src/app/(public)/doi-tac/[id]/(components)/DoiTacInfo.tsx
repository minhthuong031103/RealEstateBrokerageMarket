"use client";
import { Button } from "@/components/ui/button";
import useConversation from "@/hooks/useConversation";
import { useDoiTac } from "@/hooks/useDoiTac";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline, IoStorefrontOutline } from "react-icons/io5";
export const DoiTacInfo = ({ id }) => {
  console.log("🚀 ~ file: DoiTacInfo.tsx:11 ~ DoiTacInfo ~ id:", id);
  const [doiTacInformation, setDoiTacInformation] = useState();
  const session = useSession();
  console.log("🚀 ~ file: DoiTacInfo.tsx:13 ~ DoiTacInfo ~ session:", session);
  const { goToConversation } = useConversation();
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
      <div className="flex flex-col gap-4 mt-4 flex-wrap text-slate-800">
        <img
          src={doiTacInformation?.avatar}
          className="rounded-md w-full h-[220px] lg:h-[270px] object-cover"
        />
        <div>
          <div className="font-semibold text-[16px] mt-2">
            {doiTacInformation?.name}
          </div>
          <div className="text-[14px] mt-2">
            <div className="flex flex-row items-center gap-2 text-red-400">
              <IoStorefrontOutline className="py-auto" />
              {doiTacInformation?.anhGiayPhepKinhDoanh
                ? "Doanh nghiệp"
                : "Cá nhân"}
            </div>
            <div className="flex flex-row items-center gap-2 w-full">
              <AiOutlinePhone className="py-auto" />
              {doiTacInformation?.phoneNumber}
            </div>
            <div className="flex flex-row items-center gap-2 w-full">
              <HiOutlineMail />
              {doiTacInformation?.email}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 text-[14px] mt-1 text-gray-400">
        <IoLocationOutline className="text-[24px]" />
        {doiTacInformation?.diaChi}
      </div>
      {session?.data?.user?.duyetKhachHang == "da_duyet" ? (
        <Button
          onClick={() => {
            goToConversation(id, session?.data?.user?.id);
          }}
          className="mt-4 w-[94%] lg:w-[50%] bg-red-400"
        >
          Liên hệ
        </Button>
      ) : (
        <p className="text-sm mt-4 w-full font-semibold text-red-400">
          Tài khoản của bạn chưa được duyệt để liên hệ
        </p>
      )}
      {/* <Button
        onClick={() => {
          goToConversation(id, session?.data?.user?.id);
        }}
        className="mt-4 w-[94%] lg:w-[50%]"
      >
        Liên hệ
      </Button> */}
    </div>
  );
};
