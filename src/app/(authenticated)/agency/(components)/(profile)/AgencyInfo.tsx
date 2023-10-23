'use client'

import React, { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { useDoiTac } from '@/hooks/useDoiTac';


function AgencyInfo({session}) {

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
      const fetchThongTinDoiTac = async () => {
          const user = await fetchDoiTacTheoId(session?.user?.id);
          setUserInfo(user[0]);
          return user;
      };

      fetchThongTinDoiTac();
  }, []);

  const {fetchDoiTacTheoId} = useDoiTac();

  return (
    <div>
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
    </div>

  )
}

export default AgencyInfo