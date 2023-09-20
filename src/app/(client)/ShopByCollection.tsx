import { AspectRatio } from '@/components/new-york/aspect-ratio';
import Image from 'next/image';
import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Balancer } from 'react-wrap-balancer';

const productCollections = [
  {
    title: 'FootBall',
    image:
      'https://static.nike.com/a/images/f_auto/dpr_3.0,cs_srgb/h_400,c_limit/2c048b8b-97b5-4919-9fd0-ad85c469b545/nike-football.jpg',
  },
  {
    title: 'BasketBall',
    image:
      'https://static.nike.com/a/images/f_auto/dpr_3.0,cs_srgb/w_342,c_limit/3aa7f8f6-d54e-40bd-8822-f6d87c0cbb60/jordan-brand-launches-tatum-1-signature-shoe.jpg',
  },
  {
    title: 'Running',
    image:
      'https://static.nike.com/a/images/f_auto/dpr_3.0,cs_srgb/h_500,c_limit/x0vxyo4swzcoitrfxlj7/nike-basketball.jpg',
  },
  {
    title: 'Training and Gym',
    image:
      'https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_945,c_limit/d7a055b4-6dff-4e9e-90fe-de00e6eab13c/should-you-do-cardio-before-or-after-weight-training.jpg',
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
          Shop by collection
        </h2>
        <Balancer className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Explore our collection and find the best products for you
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
              <AspectRatio ratio={5 / 6}>
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
                <h3 className="text-3xl font-medium capitalize text-slate-100 md:text-2xl">
                  {collection.title}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default ShopByCollection;
