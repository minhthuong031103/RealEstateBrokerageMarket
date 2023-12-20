"use client";
import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { useBanner } from "@/hooks/useBanner";
function Banner() {
  const { fetchBanner } = useBanner();
  const [listBanners, setListBanners] = useState([]);
  useEffect(() => {
    const getBanner = async () => {
      await fetchBanner().then((data) => {
        setListBanners(data?.items);
      });
    };
    getBanner();
  }, []);
  return (
    <div className="relative text-white text-[20px] w-full px-10 mt-16 mx-auto">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={true}
        showThumbs={false}
        showStatus={false}
      >
        {listBanners?.map((item) => (
          <div className="h-[300px] lg:h-[650px] w-full rounded-2xl ">
            <Image
              src={item?.anhBanner}
              alt="Auth background"
              layout="fill"
              className="rounded-2xl"
              objectFit="cover"
              priority
              quality={100}
            />
            <div className="absolute inset-0 bg-black opacity-10" />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Banner;
