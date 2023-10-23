"use client";

import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Balancer } from "react-wrap-balancer";
import { useBatDongSan } from "@/hooks/useBatDongSan";
import { ListItemNoiBat } from "./ListItemNoiBat";

function BatDongSanNoiBatHome() {
  const [listNoiBat, setListNoiBat] = useState([]);
  const { fetchBatDongSanNoiBat } = useBatDongSan();
  useEffect(() => {
    const getBatDongSanNoiBat = async () => {
      await fetchBatDongSanNoiBat().then((data) => {
        setListNoiBat(data);
      });
    };
    getBatDongSanNoiBat();
  }, []);
  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="space-y-2  py-6 md:pt-10 px-10"
    >
      <div className="flex max-w-[58rem] flex-col items-start space-y-2 text-center">
        <h2 className="text-xl font-bold leading-[1.1] sm:text-3xl md:text-2xl">
          Bất động sản nổi bật
        </h2>
        <Balancer className="max-w-[46rem] leading-normal text-muted-foreground sm:text-base sm:leading-7">
          Danh sách bất động sản nổi bật dành cho bạn
        </Balancer>
      </div>
      <Swiper
        style={
          {
            "--swiper-pagination-bullet-inactive-color": "#999999",
            "--swiper-pagination-bullet-inactive-opacity": "1",
            "--swiper-pagination-color": "#000000",
            "--swiper-pagination-bullet-size": "12px",
            "--swiper-pagination-bullet-width": "10px",
            "--swiper-pagination-bullet-height": "10px",
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
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1100: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1300: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        modules={[Pagination]}
        className="w-full h-auto overflow-visible relative -mx-6"
      >
        {listNoiBat?.map((item) => (
          <SwiperSlide className="h-full relative py-6 px-3 overflow-visible">
            <ListItemNoiBat item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default BatDongSanNoiBatHome;
