'use client'

import React, { useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { useDoiTac } from '@/hooks/useDoiTac';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@nextui-org/react';

function AgencyInfo({ session }) {

  const [isLoaded, setIsLoaded] = React.useState(false);

  const { data: userInfo } = useQuery({
    queryKey: ['userInfo', session?.user?.id],
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
      <Skeleton isLoaded={isLoaded} className='rounded-lg mt-4'>
        <Card className="bg-white p-4 rounded-lg shadow-md relative mt-4">
          <h1 className="text-xl font-semibold">Thông tin cá nhân</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h2 className="font-semibold">Họ và tên</h2>
              <p>{userInfo?.name}</p>
            </div>
            <div>
              <h2 className="font-semibold">Số điện thoại</h2>
              <p>{userInfo?.phoneNumber}</p>
            </div>
            <div>
              <h2 className="font-semibold">Email</h2>
              <p>{userInfo?.email}</p>
            </div>
            <div>
              <h2 className="font-semibold">Địa chỉ</h2>
              <p>{userInfo?.diaChi}</p>
            </div>
          </div>
        </Card>
      </Skeleton>
      <Skeleton isLoaded={isLoaded} className='rounded-lg mt-4'>
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

  )
}

export default AgencyInfo