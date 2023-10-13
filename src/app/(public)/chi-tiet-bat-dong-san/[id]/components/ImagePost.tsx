"use client";

// import { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function ImagePost({ imageList }) {
  const [indexCarousel, setIndexCarousel] = useState(0);
  return (
    <>
      <Dialog>
        <DialogTrigger className="w-full">
          <div className="w-full flex lg:flex-row flex-col gap-6 lg:h-[450px]">
            <div
              className="lg:basis-2/3 bg-red-400 h-[270px] sm:h-[360px] md:h-[450px] lg:h-full overflow-hidden rounded-md"
              onClick={() => {
                setIndexCarousel(0);
              }}
            >
              <img
                className="w-full h-full"
                style={{ objectFit: "cover" }}
                src={imageList[0]?.url}
              />
            </div>
            <div className="lg:basis-1/6 space-y-6">
              <div
                className="h-[270px] sm:h-[360px] md:h-[450px] lg:h-[30%] overflow-hidden rounded-md"
                onClick={() => {
                  setIndexCarousel(1);
                }}
              >
                <img
                  className="w-full h-full"
                  style={{ objectFit: "cover" }}
                  src={imageList[1]?.url}
                />
              </div>
              <div
                className="h-[270px] sm:h-[360px] md:h-[450px] lg:h-[30%] overflow-hidden rounded-md"
                onClick={() => {
                  setIndexCarousel(3);
                }}
              >
                <img
                  className="w-full h-full"
                  style={{ objectFit: "cover" }}
                  src={imageList[3]?.url}
                />
              </div>
              <div
                className="h-[270px] sm:h-[360px] md:h-[450px] lg:h-[30%] overflow-hidden rounded-md"
                onClick={() => {
                  setIndexCarousel(5);
                }}
              >
                <img
                  className="w-full h-full"
                  style={{ objectFit: "cover" }}
                  src={imageList[5]?.url}
                />
              </div>
            </div>
            <div className="lg:basis-1/6 space-y-6">
              <div
                className="h-[270px] sm:h-[360px] md:h-[450px] lg:h-[30%] overflow-hidden rounded-md"
                onClick={() => {
                  setIndexCarousel(2);
                }}
              >
                <img
                  className="w-full h-full"
                  style={{ objectFit: "cover" }}
                  src={imageList[2]?.url}
                />
              </div>
              <div
                className="h-[270px] sm:h-[360px] md:h-[450px] lg:h-[30%] overflow-hidden rounded-md"
                onClick={() => {
                  setIndexCarousel(4);
                }}
              >
                <img
                  className="w-full h-full"
                  style={{ objectFit: "cover" }}
                  src={imageList[4]?.url}
                />
              </div>
              <div
                className="h-[270px] sm:h-[360px] md:h-[450px] lg:h-[30%] overflow-hidden rounded-md relative"
                onClick={() => {
                  setIndexCarousel(6);
                }}
              >
                <img
                  className="w-full h-full"
                  style={{ objectFit: "cover" }}
                  src={imageList[6]?.url}
                />
                <div className="bg-neutral-800 opacity-50 absolute w-full h-full top-0"></div>
                <div className="text-white font-medium lg:text-[36px] text-[58px] absolute m-0 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] cursor-default">
                  +{imageList?.length - 6}
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
              showIndicators={true}
              showThumbs={false}
              showStatus={false}
              selectedItem={indexCarousel}
            >
              {imageList?.map((item, index) =>
                index === 0 ? (
                  <div className="h-[180px] w-[180px] md:h-[360px] md:w-[360px] lg:h-[450px] lg:w-[450px]">
                    <Image
                      src={item?.url}
                      alt="Auth background"
                      layout="fill"
                      className="rounded-xl"
                      objectFit="cover"
                      priority
                      quality={100}
                    />
                    <div className="absolute inset-0 bg-black opacity-10" />
                  </div>
                ) : (
                  <div>
                    <Image
                      src={item?.url}
                      alt="Auth background"
                      layout="fill"
                      className="rounded-xl"
                      objectFit="cover"
                      priority
                      quality={100}
                    />
                    <div className="absolute inset-0 bg-black opacity-10" />
                  </div>
                )
              )}
            </Carousel>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
