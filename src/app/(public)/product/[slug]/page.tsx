import React from 'react';
import ProductDetailLeft from './ProductDetailLeft';
import ProductDetailRight from './ProductDetailRight';
import { CommonSvg } from '@/assets/CommonSvg';
import { useProduct } from '@/hooks/useProduct';

async function page({ params }) {
  const { slug } = params;
  const { onGetProductDetail } = useProduct();
  // const productDetail = await fetch(
  //   `${process.env.API_HOST}/api/product/detail?productId=${slug}`,
  //   {
  //     cache: 'no-cache',
  //   }
  // );
  // const data = await productDetail?.json();
  // console.log(data);
  const res = await onGetProductDetail(slug);

  console.log('resssssssss', res);
  const data = res;
  return (
    <div className="w-full md:py-20 ">
      <div
        className="w-full flex-col max-w-[1280px] px-5
  md:px-10 mx-auto"
      >
        <div className="flex flex-col lg:flex-row gap-[50px] lg:gap-[100px] ">
          <div className=" w-full md:w-auto flex-[1.2] max-w-[500px] lg:max-w-full lg:mx-0">
            <ProductDetailLeft data={data} />
          </div>

          <div className="flex-[0.8] py-5">
            <ProductDetailRight data={data} />
          </div>
        </div>
        <div className=" flex-col gap-3 mt-20 lg:mt-32 justify-center items-center flex text-[34px] font-semibold mb-2 leading-tight">
          Reviews
          <div className="flex gap-4 justify-center items-center">
            {[1, 2, 3, 4, 5].map(() => {
              return CommonSvg.startFilled();
            })}
          </div>
          <div className="text-lg">(1234 Reviews)</div>
        </div>
      </div>
    </div>
  );
}

export default page;
