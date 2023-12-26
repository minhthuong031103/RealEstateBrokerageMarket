'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function FindMore() {
  const router = useRouter();
  const forwardToBDS = () => {
    router.push('/bat-dong-san');
  };
  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="space-y-2  py-6 md:pt-10 mt-8 mb-8 px-10"
    >
      <div className="group rounded-md overflow-hidden relative h-[500px] w-full">
        <img
          src={
            'https://r4.wallpaperflare.com/wallpaper/846/173/87/5c1cbaf96bcec-wallpaper-98e65da890c0cc28802c611ed89204da.jpg'
          }
          alt={'Tìm kiếm thêm'}
          className="object-cover w-full h-full"
        />
        <div className="px-5 absolute inset-0 z-20 flex flex-col items-center justify-center">
          <h3 className="text-[28px] font-semibold text-center capitalize text-slate-100 mb-2">
            Tìm kiếm thông minh hơn, nhiều chức năng lọc hơn
          </h3>
          <h6 className="text-[16px] capitalize text-center text-slate-100 mb-6">
            Tìm kiếm với nhiều thuộc tính hơn, dễ dàng thao tác. <br />
            Tìm ngay căn nhà mơ ước cho bạn nào !
          </h6>
          <Button
            className="bg-white w-[150px] text-base text-slate-800 font-medium hover:text-white hover:bg-slate-800"
            onClick={forwardToBDS}
          >
            Tìm kiếm
          </Button>
        </div>
      </div>
    </section>
  );
}

export default FindMore;
