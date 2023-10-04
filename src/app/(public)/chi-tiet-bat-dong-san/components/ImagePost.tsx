"use client";

// import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function ImagePost() {
  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full">
          <div className="w-full flex lg:flex-row flex-col gap-6 lg:h-[450px]">
            <div className="lg:basis-2/3 bg-red-400 h-[270px] sm:h-[360px] md:h-[450px] lg:h-full overflow-hidden rounded-md">
              <img
                className="w-full h-full"
                style={{ objectFit: "cover" }}
                src={
                  "https://dwh.azureedge.net/media/CommunityImage/eb88ed80-a39d-4894-9a4e-9d92e39302b5.jpg?maxwidth=1500"
                }
              />
            </div>
            <div className="lg:basis-1/6 space-y-6">
              <div className="h-[270px] sm:h-[360px] md:h-[450px] lg:h-[30%] overflow-hidden rounded-md">
                <img
                  className="w-full h-full"
                  style={{ objectFit: "cover" }}
                  src={
                    "https://dwh.azureedge.net/media/CommunityImage/eb88ed80-a39d-4894-9a4e-9d92e39302b5.jpg?maxwidth=1500"
                  }
                />
              </div>
              <div className="h-[270px] sm:h-[360px] md:h-[450px] lg:h-[30%] overflow-hidden rounded-md">
                <img
                  className="w-full h-full"
                  style={{ objectFit: "cover" }}
                  src={
                    "https://dwh.azureedge.net/media/CommunityImage/eb88ed80-a39d-4894-9a4e-9d92e39302b5.jpg?maxwidth=1500"
                  }
                />
              </div>
              <div className="h-[270px] sm:h-[360px] md:h-[450px] lg:h-[30%] overflow-hidden rounded-md">
                <img
                  className="w-full h-full"
                  style={{ objectFit: "cover" }}
                  src={
                    "https://dwh.azureedge.net/media/CommunityImage/eb88ed80-a39d-4894-9a4e-9d92e39302b5.jpg?maxwidth=1500"
                  }
                />
              </div>
            </div>
            <div className="lg:basis-1/6 space-y-6">
              <div className="h-[270px] sm:h-[360px] md:h-[450px] lg:h-[30%] overflow-hidden rounded-md">
                <img
                  className="w-full h-full"
                  style={{ objectFit: "cover" }}
                  src={
                    "https://dwh.azureedge.net/media/CommunityImage/eb88ed80-a39d-4894-9a4e-9d92e39302b5.jpg?maxwidth=1500"
                  }
                />
              </div>
              <div className="h-[270px] sm:h-[360px] md:h-[450px] lg:h-[30%] overflow-hidden rounded-md">
                <img
                  className="w-full h-full"
                  style={{ objectFit: "cover" }}
                  src={
                    "https://dwh.azureedge.net/media/CommunityImage/eb88ed80-a39d-4894-9a4e-9d92e39302b5.jpg?maxwidth=1500"
                  }
                />
              </div>
              <div className="h-[270px] sm:h-[360px] md:h-[450px] lg:h-[30%] overflow-hidden rounded-md relative">
                <img
                  className="w-full h-full"
                  style={{ objectFit: "cover" }}
                  src={
                    "https://dwh.azureedge.net/media/CommunityImage/eb88ed80-a39d-4894-9a4e-9d92e39302b5.jpg?maxwidth=1500"
                  }
                />
                <div className="bg-neutral-800 opacity-50 absolute w-full h-full top-0"></div>
                <div className="text-white font-medium lg:text-[36px] text-[58px] absolute m-0 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] cursor-default">
                  +10
                </div>
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="w-fit p-0">
          <div>
            <Carousel
              autoPlay={true}
              infiniteLoop={true}
              showIndicators={false}
              showThumbs={false}
              showStatus={false}
            >
              <div className="h-[180px] w-[180px] md:h-[360px] md:w-[360px] lg:h-[450px] lg:w-[450px]">
                <Image
                  src="https://wallpapers.com/images/hd/house-corner-architecture-7vl0mtz3dfxod0fd.webp"
                  alt="Auth background"
                  layout="fill"
                  className="rounded-xl"
                  objectFit="cover"
                  priority
                  quality={100}
                />
                <div className="absolute inset-0 bg-black opacity-10" />
              </div>
              <div>
                <Image
                  src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1423,c_limit/481ae448-c295-48cb-b593-fbb80821d102/jordan.png"
                  alt="Auth background"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                  priority
                  quality={100}
                />
                <div className="absolute inset-0 bg-black opacity-10" />
              </div>
              <div>
                <Image
                  src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1423,c_limit/f9e3a04d-c620-45c5-802e-1094a20c6cd9/jordan.png"
                  alt="Auth background"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                  priority
                  quality={100}
                />
                <div className="absolute inset-0 bg-black opacity-10" />
              </div>
            </Carousel>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
