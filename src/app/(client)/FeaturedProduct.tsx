'use client';
import { buttonVariants } from '@/components/new-york/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductCard from '@/components/ProductCard';
import Loader from '@/components/Loader';
function FeaturedProduct() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  useEffect(() => {
    const getFeaturedProducts = async () => {
      const res = await fetch('/api/product/featured');
      const data = await res.json();
      if (data) {
        setFeaturedProducts(data);
      }
    };
    getFeaturedProducts();
  }, []);

  return (
    <section className="lg:px-10 px-5 py-10 mt-20 md:mt-30">
      <div className=" mx-auto flex flex-col space-y-4 text-center">
        <section
          id="featured-products"
          aria-labelledby="featured-products-heading"
          className="space-y-6"
        >
          <div className="flex justify-between flex-wrap ">
            <h2 className=" text-2xl font-medium sm:text-3xl">
              Featured products
            </h2>
            <Link aria-label="Products" href="/products">
              <div
                className={cn(
                  buttonVariants({
                    size: 'sm',
                  })
                )}
              >
                View all
              </div>
            </Link>
          </div>
          <Swiper
            style={
              {
                '--swiper-navigation-size': '44px',
                '--swiper-navigation-top-offset': '40%',
                '--swiper-navigation-sides-offset': '10px',
                '--swiper-navigation-color': '#000000',
                '--swiper-navigation-color-hover': '#000000',
                '--swiper-button-next': '12px',
              } as React.CSSProperties
            }
            slidesPerView={1}
            spaceBetween={10}
            navigation={true}
            breakpoints={{
              700: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              900: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1100: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1300: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
            }}
            modules={[Navigation]}
            className="w-full h-auto overflow-visible relative"
          >
            {featuredProducts ? (
              featuredProducts?.map((product, index) => (
                <SwiperSlide key={index}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))
            ) : (
              <Loader />
            )}
          </Swiper>
        </section>
      </div>
    </section>
  );
}

export default FeaturedProduct;
