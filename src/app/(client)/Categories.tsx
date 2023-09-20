import { AspectRatio } from '@/components/new-york/aspect-ratio';
import Image from 'next/image';
import React from 'react';
import { Balancer } from 'react-wrap-balancer';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

const productCategories = [
  {
    title: 'Shoes',
    image:
      'https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1423,c_limit/57710a8d-e482-47df-a9c7-6a2d9f32604a/the-9-best-gifts-for-skateboarders.jpg',
  },
  {
    title: 'Clothes',
    image:
      'https://static.nike.com/a/images/f_auto/dpr_3.0,cs_srgb/w_300,c_limit/e3360f9f-f648-45cf-8935-486edb7f372c/jordan.png',
  },
  {
    title: 'Accessories',
    image:
      'https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_945,c_limit/3f089b69-4eba-469e-9d3b-b7c913d031f3/the-best-cargo-trousers-and-shorts-by-nike.jpg',
  },
  {
    title: 'Sales',
    image:
      'https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_500,c_limit/bb390638-9487-4fa9-a976-1b2a7eb37257/nike-just-do-it.png',
  },
];
function Categories() {
  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="space-y-6 py-6 md:pt-10 mt-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
          Categories
        </h2>
        <Balancer className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Explore our categories and find the best products for you
        </Balancer>
      </div>
      <div className="mx-auto pb-8 pt-12 relative px-4">
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
          pagination={{
            clickable: true,
          }}
          spaceBetween={10}
          breakpoints={{
            700: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            900: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1100: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1300: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          modules={[Pagination]}
          className=" h-auto overflow-visible relative"
        >
          {productCategories?.map((category) => (
            <SwiperSlide className="group relative overflow-hidden rounded-md">
              <AspectRatio ratio={5 / 4}>
                <div className="absolute inset-0 z-10 bg-black/60 transition-colors group-hover:bg-black/70" />
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  priority
                />
              </AspectRatio>
              <div className="px-5 absolute inset-0 z-20 flex items-center justify-center">
                <h3 className="text-3xl font-medium capitalize text-slate-100 md:text-2xl">
                  {category.title}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Categories;
