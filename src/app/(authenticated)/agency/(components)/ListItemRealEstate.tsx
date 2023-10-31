'use client';

import React from 'react'
import { useEffect, useState } from 'react';
import { RealEstateCard } from './RealEstateCard';
import { useBaiVietDoiTac } from '@/hooks/useBaiVietDoiTac';

function ListItemRealEstate({session}) {
  const [listProperties, setListProperties] = useState([]);
  useEffect(() => {
    const fetchBaiViet = async() => {
      console.log(session?.user?.id);
      const result = await getBaiVietDoiTac(session?.user?.id);
      setListProperties(result as any);
      return result
    };
    fetchBaiViet();
  },[]);
  const {getBaiVietDoiTac} = useBaiVietDoiTac();
  return (
    <div className="mr-6 mt-4 bg-slate-50">
      <div className="flex justify-between p-4 rounded-xl bg-white border-[1px] shadow-sm">
        <div className=" text-[14px] text-gray-500 flex my-auto">
          {listProperties.length} bất động sản đã đăng
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {listProperties.map((item) => (
          <RealEstateCard item={item} />
        ))}
      </div>
    </div>
  );
}

export default ListItemRealEstate