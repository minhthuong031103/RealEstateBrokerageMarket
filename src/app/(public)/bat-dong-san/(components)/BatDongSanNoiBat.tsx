'use client';

import { useBatDongSan } from '@/hooks/useBatDongSan';
import { parseJSON } from '@/lib/utils';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';

const CURRENCY_FORMAT = new Intl.NumberFormat(undefined, {
  currency: 'VND',
  style: 'currency',
});
export function formatCurrency(value: number) {
  return CURRENCY_FORMAT.format(value);
}
export const BatDongSanNoiBat = () => {
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
    <div className="p-8 mr-6 rounded-xl bg-white border-[1px] shadow-sm space-y-4">
      <div>Tin nổi bật mới nhất</div>
      <Carousel
        autoPlay={false}
        infiniteLoop={false}
        showIndicators={true}
        showThumbs={false}
        showStatus={false}
      >
        {listNoiBat?.map((item) => (
          <Link href={`/bat-dong-san/chi-tiet-bat-dong-san/${item?.id}`}>
            <div className="rounded-sm relative">
              {parseJSON(item?.hinhAnhSanPham)?.map((url, index) =>
                index === 0 ? (
                  <img
                    src={url?.url}
                    className="w-full rounded-md lg:h-[180px] xl:h-[200px] md:h-[480px] h-[280px]"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <></>
                )
              )}
              <div className="flex flex-row gap-2 absolute top-4 left-6">
                <HinhThuc type={item?.isChothue}></HinhThuc>
                <BranchPost type={item?.nhan}></BranchPost>
              </div>
              <div className="font-semibold text-[24px] text-white absolute bottom-12 left-6 ">
                {formatCurrency(item?.gia)}
                {item?.isChothue === true ? (
                  <p className="text-[20px] font-normal"> /Tháng</p>
                ) : (
                  <></>
                )}
              </div>
              <div className="text-[16px] text-white absolute bottom-6 left-6">
                {item?.tieuDe}
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

function BranchPost(type) {
  return type?.type === 'Yêu thích' ? (
    <p className="bg-blue-500 w-[82px] h-[36px] rounded-md text-white text-[14px] text-center py-2">
      Yêu thích
    </p>
  ) : type?.type === 'Nổi bật' ? (
    <p className="bg-red-500 w-[82px] h-[36px] rounded-md text-white text-[14px] text-center py-2">
      Nổi bật
    </p>
  ) : (
    <></>
  );
}

function HinhThuc(type) {
  return (
    <p className="bg-[#3E4C66] w-[82px] h-[36px] rounded-md text-white text-[14px] text-center py-2">
      {type?.type === false ? 'Đăng bán' : 'Cho thuê'}
    </p>
  );
}
