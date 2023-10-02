'use client';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Balancer } from 'react-wrap-balancer';
import { Button } from '@/components/ui/button';

const productCollections = [
  {
    title: 'Đất',
    image:
      'https://images.unsplash.com/photo-1670992826591-96951fe6c7e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
  },
  {
    title: 'Nhà ở',
    image:
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
  },
  {
    title: 'Chung Cư',
    image:
      'https://images.unsplash.com/photo-1633035327410-a6ecbc8e6db8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1854&q=80',
  },
  {
    title: 'Tất cả',
    image:
      'https://images.unsplash.com/photo-1615634364452-8daf3851f2f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80',
  },
];

function ShopByCollection() {
  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="space-y-10  py-6 md:pt-10 mt-24 px-10"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
          Lựa chọn loại bất động sản
        </h2>
        <Balancer className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Tìm kiếm bất động sản phù hợp với bạn
        </Balancer>
      </div>
      <Swiper
        style={
          {
            '--swiper-pagination-bullet-inactive-color': '#999999',
            '--swiper-pagination-bullet-inactive-opacity': '1',
            '--swiper-pagination-color': '#000000',
            '--swiper-pagination-bullet-size': '12px',
            '--swiper-pagination-bullet-width': '10px',
            '--swiper-pagination-bullet-height': '10px',
          } as React.CSSProperties
        }
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          700: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          900: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          1100: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1300: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        modules={[Pagination]}
        className="w-full h-auto overflow-visible relative"
      >
        {productCollections?.map((collection) => (
          <SwiperSlide className="h-full relative mb-16 overflow-visible">
            <div className="group relative overflow-hidden rounded-md">
              <AspectRatio ratio={5 / 5}>
                <Image
                  src={collection.image}
                  alt={'Jordan'}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  priority
                />
              </AspectRatio>
              <div className="px-5 absolute inset-0 z-20 flex items-center justify-center">
                <Button className="w-28">
                  <h3 className="text-lg font-medium capitalize text-slate-100 md:text-xl">
                    {collection.title}
                  </h3>
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default ShopByCollection;
