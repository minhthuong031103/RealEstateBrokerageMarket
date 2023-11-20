"use client";

import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useDoiTac } from "@/hooks/useDoiTac";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@nextui-org/react";
import { MdOutlineEmail, MdPermIdentity } from "react-icons/md";
import { IoIosPhonePortrait } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";

function AgencyInfo({ session }) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo", session?.user?.id],
    queryFn: async () => {
      const res = await fetchDoiTacTheoId(session?.user?.id);
      return res?.[0];
    },
  });

  const { fetchDoiTacTheoId } = useDoiTac();

  useEffect(() => {
    if (userInfo) {
      setIsLoaded(true);
    }
  }, [userInfo]);

  return (
    <div>
      <h1 className="text-xl font-medium">Thông tin đối tác</h1>
      <Skeleton isLoaded={isLoaded} className="rounded-lg">
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
                <div className="flex flex-row gap-2">
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
      <Skeleton isLoaded={isLoaded} className="rounded-lg mt-4">
        <Card className="bg-white p-4 rounded-lg shadow-md relative mt-4">
          <h1 className="text-xl font-semibold">Số lượt đăng bài đang có</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h2 className="font-semibold">Tổng số lượt</h2>
              <p>{userInfo?.luot}</p>
            </div>
            <div>
              <h2 className="font-semibold">Lượt chuyên nghiệp</h2>
              <p>{userInfo?.luotChuyenNghiep}</p>
            </div>
            <div>
              <h2 className="font-semibold">Lượt VIP</h2>
              <p>{userInfo?.luotVip}</p>
            </div>
          </div>
        </Card>
      </Skeleton>
    </div>
  );
}

export default AgencyInfo;
