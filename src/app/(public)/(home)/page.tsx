import React from 'react';
import HomeBanner from '@/components/HomeBanner';
import { Balancer } from 'react-wrap-balancer';
import ShopByCollection from './ShopByCollection';
import Categories from './Categories';
import FeaturedProduct from './FeaturedProduct';
import ShopAll from './ShopAll';
// import { useProduct } from '@/hooks/useProduct';
// import SalesProduct from './SalesProduct';

const page = async () => {
  // const { onGetAllProducts } = useProduct();
  // const allProducts = await onGetAllProducts();
  return (
    <div className="mt-10 flex h-full w-full flex-col">
      <HomeBanner />

      <ShopAll />
      {/* <Image
        src={
          'https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_974,c_limit/79cf6b2d-1216-4d22-a3cd-e9fca50ddebe/nike-just-do-it.png'
        }
        className="relative"
        width={windowWidth.current}
        height={windowWidth.current / 2}
        priority
        quality={100}
        objectFit="cover"
        alt="hero image"
      /> */}

      <ShopByCollection />
      {/* <SalesProduct allProducts={allProducts} /> */}
      {/* 
      <Image
        src={
          'https://static.nike.com/a/images/f_auto/dpr_1.3,cs_srgb/w_1531,c_limit/bb4458f0-855c-4548-a745-97aefec048ea/nike-just-do-it.jpg'
        }
        className="relative"
        width={windowWidth.current}
        height={windowWidth.current / 2}
        priority
        quality={100}
        objectFit="cover"
        alt="hero image"
      /> */}
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-28"
      >
        <h1 className="px-1 text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          NEVER DONE RISING
        </h1>
        <Balancer className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
          Keep it classic in timeless, easy-to-wear kicks.
        </Balancer>
      </section>
      <FeaturedProduct />

      <section>
        <Categories />
      </section>
    </div>
  );
};
export default page;
