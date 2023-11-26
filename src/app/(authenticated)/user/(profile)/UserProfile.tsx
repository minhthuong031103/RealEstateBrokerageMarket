'use client';
import { Card } from '@/components/ui/card';
import React from 'react';
import { MdOutlineEmail, MdPermIdentity } from 'react-icons/md';
import { CiLocationOn } from 'react-icons/ci';
import { IoIosPhonePortrait } from 'react-icons/io';
import { useQuery } from '@tanstack/react-query';
import { getRequest } from '@/lib/fetch';
import { Skeleton } from '@nextui-org/react';

export const UserProfile = ({ session }) => {
  const { data: userInfo, isLoading } = useQuery({
    queryKey: ['userInfo', session?.user?.id],
    queryFn: async () => {
      const res = await getRequest({
        endPoint: `/api/user?userId=${session?.user?.id}`,
      });
      console.log('🚀 ~ file: UserProfile.tsx:17 ~ queryFn: ~ res:', res);
      return res;
    },
  });

  return (
    <div>
      <h1 className="text-xl font-medium">Thông tin đối tác</h1>
      <Card className="bg-white p-6 rounded-lg shadow-md relative mt-4">
        <div className="flex flex-col gap-6 mt-4">
          <div className="w-full flex justify-center">
            <div className="border-2 border-red-400 rounded-full w-[180px] md:w-[270px] h-[180px] md:h-[270px] overflow-hidden">
              {isLoading ? (
                <Skeleton className="flex rounded-full ws-full h-full" />
              ) : (
                <img
                  src={userInfo?.avatar}
                  className="w-full h-full object-cover"
                  alt={''}
                />
              )}
            </div>
          </div>
          <div className="w-full space-y-4">
            <div>
              <p className="text-sm text-gray-600">Họ tên</p>
              <div className="flex flex-row gap-2">
                <MdPermIdentity className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                {isLoading ? (
                  <Skeleton className="h-3 w-32 rounded-lg" />
                ) : (
                  <p className="text-sm text-slate-800">{userInfo?.name}</p>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Điện thoại</p>
              <div className="flex flex-row gap-2 items-center ">
                <IoIosPhonePortrait className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                {isLoading ? (
                  <Skeleton className="h-3 w-32 rounded-lg" />
                ) : (
                  <p className="text-sm text-slate-800">
                    {userInfo?.phoneNumber}
                  </p>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <div className="flex flex-row gap-2">
                <MdOutlineEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                {isLoading ? (
                  <Skeleton className="h-3 w-32 rounded-lg" />
                ) : (
                  <p className="text-sm text-slate-800">{userInfo?.email}</p>
                )}
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
    </div>
  );
};
