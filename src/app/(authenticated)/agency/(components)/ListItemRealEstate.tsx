'use client';

import React from 'react'
import { useEffect, useState } from 'react';
import { RealEstateCard } from './RealEstateCard';
import { useBaiVietDoiTac } from '@/hooks/useBaiVietDoiTac';

function ListItemRealEstate({session}) {
  const [listProperties, setListProperties] = useState([]);
  // useEffect(() => {
  //   const getBaiViet = async() => {
  //     const result = await fetchAllBaiViet();
  //     console.log(result);
  //     setListProperties(result as any);
  //     return result
  //   };
  //   getBaiViet();
  // }, []);
  // const {fetchAllBaiViet} = useBaiViet();

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
    <div className="mr-6 mt-4">
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
      <div
        className="text-center py-6 font-medium text-red-400 cursor-pointer"
        onClick={() => {}}
      >
        Xem thêm
      </div>
    </div>
  );
}

export default ListItemRealEstate