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
            'https://th.bing.com/th/id/R.a8a00a966f9f8ad01dacf533d725733d?rik=MFjrFVXN7m8XSg&riu=http%3a%2f%2fcdn.justluxe.com%2farticles%2fimages%2fnews%2fbeverlyhillshome1958338i.jpg&ehk=fXH%2f%2fZI2GpK%2f%2bwO%2b6NX%2fugc8jR%2bNIdOHIDGzssS6jOA%3d&risl=&pid=ImgRaw&r=0'
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
