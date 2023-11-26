'use client';
import { Separator } from '@/components/ui/separator';
import { CacLoaiHinhBatDongSan } from '../../bat-dong-san/(components)/CacLoaiHinhBatDongSan';
import { ListComponent } from './ListComponent';
import { BatDongSanNoiBat } from '../../bat-dong-san/(components)/BatDongSanNoiBat';
// const BatDongSanNoiBat = dynamic(
//   () => import('../../bat-dong-san/(components)/BatDongSanNoiBat'),
//   {
//     ssr: false,
//   }
// );

export interface searchType {
  searchWord: string;
  location: string;
  type: string;
  branch: string;
  isRent: string;
  loaiCanHo: string;
  loaiNhaO: string;
  loaiVanPhong: string;
  loaiDatDai: string;
  huongBanCong: string;
  huongCuaChinh: string;
  huongDat: string;
  soPhongNgu: string;
  soPhongTam: string;
  minPrice: string;
  maxPrice: string;
  minSquare: string;
  maxSquare: string;
}
export function LayoutBatDongSanYeuThich({ session }) {
  return (
    <>
      <div className="flex flex-col gap-6 lg:gap-0 lg:flex-row pt-8 pb-8">
        <div className="basis-[35%] flex flex-col gap-4">
          <BatDongSanNoiBat />
          <CacLoaiHinhBatDongSan />
        </div>
        <div className="basis-[65%]">
          <Separator className="lg:hidden h-[6px] mt-4 mb-8 w-[96%] text-gray-500 rounded-md" />
          <ListComponent session={session} />
        </div>
      </div>
    </>
  );
}
