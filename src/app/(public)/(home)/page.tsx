import React from 'react';
import dynamic from 'next/dynamic';
import SearchHome from './(components)/SearchHome';
import TypeCollection from './(components)/TypeCollection';
const BatDongSanNoiBatHome = dynamic(
  () => import('./(components)/BatDongSanNoiBat'),
  { ssr: false }
);
const BatDongSanKhuVuc = dynamic(
  () => import('./(components)/BatDongSanKhuVuc'),
  { ssr: false }
);
const Banner = dynamic(() => import('./(components)/Banner'), { ssr: false });
const FindMore = dynamic(() => import('./(components)/FindMore'), {
  ssr: false,
});

const page = async () => {
  return (
    <div className="mt-0 flex h-full w-full flex-col">
      <SearchHome />
      <TypeCollection />
      <BatDongSanNoiBatHome />
      <BatDongSanKhuVuc />
      <Banner />
      <FindMore />
    </div>
  );
};
export default page;
