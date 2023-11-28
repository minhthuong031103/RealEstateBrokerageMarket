"use client";
import { Card } from "@/components/ui/card";
import React from "react";
import { MdOutlineEmail, MdPermIdentity } from "react-icons/md";
import { CiEdit, CiLocationOn } from "react-icons/ci";
import { IoIosPhonePortrait } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@/lib/fetch";
import { Skeleton } from "@nextui-org/react";
import DialogCustom from "@/components/ui/dialogCustom";
import { ThongTinForm } from "../(components)/(edit)/ThongTinForm";
import { Zoom } from "@/components/ui/zoom-image";
import { Button } from "@/components/ui/button";

export const UserProfile = ({ session }) => {
  const [isOpen, setOpen] = React.useState(false);
  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["userInfo", session?.user?.id],
    queryFn: async () => {
      const res = await getRequest({
        endPoint: `/api/user?userId=${session?.user?.id}`,
      });
      console.log("🚀 ~ file: UserProfile.tsx:17 ~ queryFn: ~ res:", res);
      return res;
    },
  });

  return (
    <div>
      <div className="flex flex-col mx-10 mt-6 mb-6">
        <div className="flex flex-row justify-between">
          <h1 className="text-xl font-semibold">Hồ sơ khách hàng</h1>
          <Button
            className="mt-2 md:mt-0 flex flex-row  gap-3 py-0"
            onClick={() => {
              setOpen(true);
            }}
          >
            Chỉnh sửa <CiEdit className="w-6 h-6" />
          </Button>
        </div>{" "}
        <Skeleton isLoaded={!isLoading} className="rounded-lg mt-4">
          <Card className="bg-white p-6 rounded-lg shadow-md relative mt-4">
            <div className="flex flex-col gap-6 mt-4">
              <div className="w-full flex justify-center">
                <div className="border-2 border-red-400 rounded-full w-[180px] md:w-[270px] h-[180px] md:h-[270px] overflow-hidden">
                  <img
                    src={userInfo?.avatar}
                    className="w-full h-full object-cover"
                    alt={""}
                  />
                </div>
              </div>
              <div className="w-full space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Họ tên</p>
                  <div className="flex flex-row gap-2">
                    <MdPermIdentity className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    <p className="text-sm text-slate-800">{userInfo?.name}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Điện thoại</p>
                  <div className="flex flex-row gap-2 items-center ">
                    <IoIosPhonePortrait className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    <p className="text-sm text-slate-800">
                      {userInfo?.phoneNumber}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <div className="flex flex-row gap-2">
                    <MdOutlineEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />

                    <p className="text-sm text-slate-800">{userInfo?.email}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Địa chỉ</p>
                  <div className="flex flex-row gap-2">
                    <CiLocationOn className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    <p className="text-sm text-slate-800">{userInfo?.diaChi}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Skeleton>
        <h1 className="text-xl font-medium mt-3">Giấy tờ pháp lý</h1>
        <Skeleton isLoaded={!isLoading} className="rounded-lg mt-4">
          <Card className="bg-white p-4 rounded-lg shadow-md relative">
            <h1 className="text-base font-medium">
              Giấy tờ cá nhân / đại diện tổ chức
            </h1>
            <div className="flex flex-row flex-wrap gap-10 justify-center md:justify-start">
              <div className="flex flex-col gap-y-3">
                <div className="font-bold text-sm">Ảnh chân dung</div>
                <div className="w-full flex justify-start">
                  <Zoom>
                    <img
                      className={
                        "w-28 h-36 rounded-md border-1 border-gray-400"
                      }
                      src={userInfo?.anhChanDung}
                    />
                  </Zoom>
                </div>
              </div>
              <div className="flex flex-col gap-y-3">
                <div className="font-bold text-sm">Hình ảnh CCCD mặt trước</div>
                <div className="w-full flex justify-start">
                  <Zoom>
                    <img
                      className={
                        "w-56 h-36 rounded-md border-1 border-gray-400"
                      }
                      src={userInfo?.anhCCCDTruoc}
                    />
                  </Zoom>
                </div>
              </div>
              <div className="flex flex-col gap-y-3">
                <div className="font-bold text-sm">Hình ảnh CCCD mặt sau</div>
                <div className="w-full flex justify-start">
                  <Zoom>
                    <img
                      className={
                        "w-56 h-36 rounded-md border-1 border-gray-400"
                      }
                      src={userInfo?.anhCCCDSau}
                    />
                  </Zoom>
                </div>
              </div>
            </div>
          </Card>
        </Skeleton>
      </div>

      <DialogCustom
        className="w-full lg:w-[70%] h-[80%] lg:h-[95%] flex items-center justify-center"
        isModalOpen={isOpen}
        setIsModalOpen={setOpen}
        notShowClose={false}
      >
        <div>
          <div className="flex flex-col space-y-3">
            <ThongTinForm userInfo={userInfo} />
          </div>
        </div>
      </DialogCustom>
    </div>
  );
};
