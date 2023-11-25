"use client";

import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Balancer } from "react-wrap-balancer";
import Link from "next/link";

function BatDongSanKhuVuc() {
  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="space-y-2  py-6 md:pt-10 px-10"
    >
      <div className="flex max-w-[58rem] mb-10 flex-col items-start space-y-2 text-center">
        <h2 className="text-xl font-bold leading-[1.1] sm:text-3xl md:text-2xl">
          Bất động sản theo khu vực
        </h2>
        <Balancer className="max-w-[46rem] leading-normal text-muted-foreground sm:text-base sm:leading-7">
          Danh sách bất động sản có thị trường sôi nổi
        </Balancer>
      </div>
      <div className="w-full h-auto overflow-visible grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <Link href={"/bat-dong-san?diachi=Hà Nội"}>
          <div className="group rounded-md overflow-hidden relative h-[350px] w-full">
            <img
              src={
                "https://file1.dangcongsan.vn/data/0/images/2022/12/28/upload_34/hn1.jpg"
              }
              alt={"Khu vực"}
              className="transition ease-in-out group-hover:scale-105 group-hover:rotate-2  object-cover w-full h-full"
              style={{ transitionDuration: "500ms" }}
            />
            <div
              className="px-5 absolute inset-0 z-20 flex items-end justify-center"
              style={{
                background:
                  "linear-gradient(to top, #25253bdc 0%, #20202b00 100%)",
              }}
            >
              <h3 className="text-[24px] font-semibold capitalize text-slate-100 md:text-xl mb-6">
                Hà Nội
              </h3>
            </div>
          </div>
        </Link>
        <Link href={"/bat-dong-san?diachi=Hồ Chí Minh"}>
          <div className="group rounded-md overflow-hidden relative h-[350px] w-full">
            <img
              src={
                "https://haycafe.vn/wp-content/uploads/2022/01/Hinh-anh-Sai-Gon-1.jpg"
              }
              alt={"Khu vực"}
              className="transition ease-in-out group-hover:scale-105 group-hover:rotate-2  object-cover w-full h-full"
              style={{ transitionDuration: "500ms" }}
            />
            <div
              className="px-5 absolute inset-0 z-20 flex items-end justify-center"
              style={{
                background:
                  "linear-gradient(to top, #25253bdc 0%, #20202b00 100%)",
              }}
            >
              <h3 className="text-[24px] font-semibold capitalize text-slate-100 md:text-xl mb-6">
                Tp Hồ Chí Minh
              </h3>
            </div>
          </div>
        </Link>
        <Link href={"/bat-dong-san?diachi=Đà Nẵng"}>
          <div className="group rounded-md overflow-hidden relative h-[350px] w-full">
            <img
              src={
                "https://images2.thanhnien.vn/528068263637045248/2023/9/11/a1-1694405345920390333678.jpg"
              }
              alt={"Khu vực"}
              className="transition ease-in-out group-hover:scale-105 group-hover:rotate-2  object-cover w-full h-full"
              style={{ transitionDuration: "500ms" }}
            />
            <div
              className="px-5 absolute inset-0 z-20 flex items-end justify-center"
              style={{
                background:
                  "linear-gradient(to top, #25253bdc 0%, #20202b00 100%)",
              }}
            >
              <h3 className="text-[24px] font-semibold capitalize text-slate-100 md:text-xl mb-6">
                Đà Nẵng
              </h3>
            </div>
          </div>
        </Link>
        <Link href={"/bat-dong-san?diachi=Bình Dương"}>
          <div className="group rounded-md overflow-hidden relative h-[350px] w-full">
            <img
              src={
                "https://danhkhoireal.vn/wp-content/uploads/2021/10/du-an-picity-sky-park-di-an-binh-duong.jpg"
              }
              alt={"Khu vực"}
              className="transition ease-in-out group-hover:scale-105 group-hover:rotate-2  object-cover w-full h-full"
              style={{ transitionDuration: "500ms" }}
            />
            <div
              className="px-5 absolute inset-0 z-20 flex items-end justify-center"
              style={{
                background:
                  "linear-gradient(to top, #25253bdc 0%, #20202b00 100%)",
              }}
            >
              <h3 className="text-[24px] font-semibold capitalize text-slate-100 md:text-xl mb-6">
                Bình Dương
              </h3>
            </div>
          </div>
        </Link>
        <Link href={"/bat-dong-san?diachi=Vũng Tàu"}>
          <div className="group rounded-md overflow-hidden relative h-[350px] w-full">
            <img
              src={
                "https://cdn3.ivivu.com/2022/09/T%E1%BB%95ng-quan-du-l%E1%BB%8Bch-V%C5%A9ng-T%C3%A0u-ivivu.jpg"
              }
              alt={"Khu vực"}
              className="transition ease-in-out group-hover:scale-105 group-hover:rotate-2  object-cover w-full h-full"
              style={{ transitionDuration: "500ms" }}
            />
            <div
              className="px-5 absolute inset-0 z-20 flex items-end justify-center"
              style={{
                background:
                  "linear-gradient(to top, #25253bdc 0%, #20202b00 100%)",
              }}
            >
              <h3 className="text-[24px] font-semibold capitalize text-slate-100 md:text-xl mb-6">
                Vũng tàu
              </h3>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default BatDongSanKhuVuc;
