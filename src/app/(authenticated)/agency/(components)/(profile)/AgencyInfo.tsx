"use client";

import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useDoiTac } from "@/hooks/useDoiTac";
import { useQuery } from "@tanstack/react-query";
import { Chip, Skeleton } from "@nextui-org/react";
import { MdOutlineEmail, MdPermIdentity } from "react-icons/md";
import { IoIosPhonePortrait } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { Zoom } from "@/components/ui/zoom-image";
import { convertPrismaTimeToDateTime } from "@/lib/utils";
import { CheckIcon, X } from "lucide-react";

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
      <h1 className="text-xl font-medium mt-3">Thông tin kinh doanh</h1>
      <Skeleton isLoaded={isLoaded} className="rounded-lg mt-4">
        <Card className="bg-white p-4 rounded-lg shadow-md relative">
          <h1 className="text-base font-medium">
            Giấy tờ cá nhân / đại diện tổ chức
          </h1>
          <div className="flex flex-row flex-wrap gap-10 justify-center md:justify-start">
            {userInfo?.anhGiayPhepKinhDoanh !== null ? (
              <div className="flex flex-col gap-y-3">
                <div className="font-bold text-sm">Giấy phép kinh doanh</div>
                <div className="w-full flex justify-start">
                  <Zoom>
                    <img
                      className={
                        "w-28 h-36 rounded-md border-1 border-gray-400"
                      }
                      src={userInfo?.anhGiayPhepKinhDoanh}
                    />
                  </Zoom>
                </div>
              </div>
            ) : null}
            <div className="flex flex-col gap-y-3">
              <div className="font-bold text-sm">Ảnh chân dung</div>
              <div className="w-full flex justify-start">
                <Zoom>
                  <img
                    className={"w-28 h-36 rounded-md border-1 border-gray-400"}
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
                    className={"w-56 h-36 rounded-md border-1 border-gray-400"}
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
                    className={"w-56 h-36 rounded-md border-1 border-gray-400"}
                    src={userInfo?.anhCCCDSau}
                  />
                </Zoom>
              </div>
            </div>
          </div>
          <h1 className="text-base font-medium mt-6">
            Thông tin dịch vụ hiện tại
          </h1>
          <div className="flex flex-row flex-wrap gap-4 mt-1">
            <div className="flex flex-row gap-2">
              <h2 className="font-bold text-sm">Tổng số lượt</h2>
              <p>{userInfo?.luot}</p>
            </div>
            <div className="flex flex-row gap-2">
              <h2 className="font-bold text-sm">Lượt chuyên nghiệp</h2>
              <p>{userInfo?.luotChuyenNghiep}</p>
            </div>
            <div className="flex flex-row gap-2">
              <h2 className="font-bold text-sm">Lượt VIP</h2>
              <p>{userInfo?.luotVip}</p>
            </div>
          </div>
          {userInfo?.stripeCurrentPeriodEnd ? (
            <div className="flex flex-row gap-2 mt-2">
              <h2 className="font-bold text-sm">
                Thời gian kết thúc gói đăng ký:
              </h2>
              <p>
                {convertPrismaTimeToDateTime(userInfo?.stripeCurrentPeriodEnd)}
              </p>
              {new Date(userInfo?.stripeCurrentPeriodEnd).getTime() >=
              new Date().getTime() ? (
                <Chip
                  color="success"
                  variant="bordered"
                  startContent={<CheckIcon size={18} />}
                >
                  Đang kích hoạt
                </Chip>
              ) : (
                <Chip
                  color="default"
                  variant="bordered"
                  startContent={<X size={18} />}
                >
                  Hết hạn
                </Chip>
              )}
            </div>
          ) : null}
        </Card>
      </Skeleton>
    </div>
  );
}

export default AgencyInfo;
