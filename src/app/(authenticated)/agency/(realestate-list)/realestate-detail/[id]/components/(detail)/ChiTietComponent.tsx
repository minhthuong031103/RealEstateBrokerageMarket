/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { Separator } from '@/components/ui/separator';
import { useBatDongSan } from '@/hooks/useBatDongSan';
import { parseJSON } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import { BiSolidArrowFromBottom } from 'react-icons/bi';
import { BsCheck2 } from 'react-icons/bs';
import { ContactInfo } from './ContactInfo';
import { ImagePost } from './ImagePost';
// import { LikeShareGroup } from "./LikeShareGroup";
import MapComponent from './MapComponent';
import { EditRealEstateModal } from '../../../EditRealEstateModal';
import { useQuery } from '@tanstack/react-query';
import { getRequest } from '@/lib/fetch';
const CURRENCY_FORMAT = new Intl.NumberFormat(undefined, {
  currency: 'VND',
  style: 'currency',
});

async function getLatLonForCity(location: string) {
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    location + ', Vietnam'
  )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
  const geocodeResponse = await fetch(geocodeUrl);
  const geocodeData = await geocodeResponse.json();
  const { lat, lng } = geocodeData.results[0].geometry.location;
  return { lon: lng, lat };
}

export function formatCurrency(value: number) {
  return CURRENCY_FORMAT.format(value);
}
export type ToaDoDiaChi = {
  lat: number;
  lon: number;
};

export function ChiTietComponent({ id, session }) {
  const { fetchBatDongSanTheoIdDoiTac } = useBatDongSan();
  // const [chiTietBDS, setChiTietBDS] = useState();

  const { data: chiTietBDS } = useQuery({
    queryKey: ['chiTietBDS', id],
    queryFn: async () => {
      const res = await fetchBatDongSanTheoIdDoiTac(id, session?.user?.id);
      console.log('🚀 ~ file: ChiTietComponent.tsx:45 ~ queryFn: ~ res:', res);

      return res?.[0];
    },
  });
  console.log(
    '🚀 ~ file: ChiTietComponent.tsx:47 ~ ChiTietComponent ~ chiTietBDS:',
    chiTietBDS
  );
  const [toaDo, setToaDo] = useState<ToaDoDiaChi>();

  useEffect(() => {
    const getLocation = async (diaChi) => {
      const { lat, lon } = await getLatLonForCity(diaChi);
      setToaDo({ lat: lat, lon: lon });
    };
    getLocation(chiTietBDS?.[0]?.diaChi)
  }, []);
  return (
    <div className="container mx-auto px-[24px]">
      <div className="ml-4">
        <div className="container pt-[48px]">
          <div>
            <h1>Bản xem trước bài đăng của bạn</h1>
          </div>
          <div className="flex flex-col lg:flex-row justify-between mb-8">
            <div className="w-[60%]">
              <h1 className="text-[28px] text-neutral-700 font-medium ">
                {chiTietBDS?.tieuDe}
              </h1>
              <h4 className="text-gray-500">{chiTietBDS?.diaChi}</h4>
            </div>
            <div className="text-[28px] text-neutral-700 font-medium my-auto flex flex-row lg:w-[40%] lg:justify-end w-full justify-between space-x-6">
              <p>
                {formatCurrency(chiTietBDS?.gia)}
                {chiTietBDS?.isChothue === true ? (
                  <p className="text-[24px] font-normal"> /Tháng</p>
                ) : (
                  <></>
                )}
              </p>
              <div>
                {/* <LikeShareGroup
                  userIdOfWriter={chiTietBDS?.userId}
                  postId={parseInt(id)}
                /> */}
                <EditRealEstateModal id={id} />
              </div>
            </div>
          </div>
          <ImagePost imageList={parseJSON(chiTietBDS?.hinhAnhSanPham)} />
          <div className="flex flex-col lg:flex-row lg:gap-6">
            <div className="basis-3/4">
              <div className="mt-8 w-full rounded-md bg-white border-[1px] shadow p-8">
                <div className="flex flex-row flex-wrap gap-4">
                  <div className="rounded bg-gray-50 text-gray-600 text-[14px] py-2 px-8">
                    {chiTietBDS?.isChothue === false ? 'Đăng bán' : 'Cho thuê'}
                  </div>
                  <div className="rounded bg-gray-50 text-gray-600 text-[14px] py-2 px-8">
                    {chiTietBDS?.loaiHinh?.name}
                  </div>
                  {chiTietBDS?.loaiHinh?.loaiBDS?.name === 'Căn hộ' ||
                  chiTietBDS?.loaiHinh?.loaiBDS?.name === 'Nhà ở' ? (
                    <>
                      <div className="rounded bg-gray-50 text-gray-600 text-[14px] py-2 px-8">
                        Nhà tắm: {chiTietBDS?.soPhongTam}
                      </div>
                      <div className="rounded bg-gray-50 text-gray-600 text-[14px] py-2 px-8">
                        Phòng ngủ: {chiTietBDS?.soPhongNgu}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  <div className="rounded bg-gray-50 text-gray-600 text-[14px] py-2 px-8">
                    Diện tích: {chiTietBDS?.dienTich} m<sup>2</sup>
                  </div>
                </div>
                <div className="mt-8 text-gray-600">Mô tả</div>
                <div className="mt-4 text-gray-600 text-[14px]">
                  {chiTietBDS?.moTa}
                </div>
                <Separator className="mt-4" />
                <div className="mt-8 text-gray-600">Thông tin chi tiết</div>
                <div className="mt-4 lg:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-600 text-[14px]">
                  <div className="flex flex-row">
                    <div className="w-1/2">BDS ID:</div>
                    <div className="w-1/2 font-semibold">{chiTietBDS?.id}</div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-1/2">Chiều dài:</div>
                    <div className="w-1/2 font-semibold">
                      {chiTietBDS?.chieuDai} m
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-1/2">Chiều rộng:</div>
                    <div className="w-1/2 font-semibold">
                      {chiTietBDS?.chieuRong} m
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-1/2">Diện tích:</div>
                    <div className="w-1/2 font-semibold">
                      {chiTietBDS?.dienTich} m<sup>2</sup>
                    </div>
                  </div>
                  {chiTietBDS?.loaiHinh?.loaiBDS?.name !== 'Đất' ? (
                    <>
                      <div className="flex flex-row">
                        <div className="w-1/2">Năm hoàn thành:</div>
                        <div className="w-1/2 font-semibold">
                          {
                            new Date(chiTietBDS?.hoanThanh)
                              .toLocaleDateString('en-GB')
                              .split('/')[2]
                          }
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="w-1/2">Nội thất:</div>
                        <div className="w-1/2 font-semibold">
                          {chiTietBDS?.tinhTrangNoiThat}
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="w-1/2">Hướng cửa chính:</div>
                        <div className="w-1/2 font-semibold">
                          {chiTietBDS?.huongCuaChinh}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-row">
                      <div className="w-1/2">Hướng đất:</div>
                      <div className="w-1/2 font-semibold">
                        {chiTietBDS?.huongDat}
                      </div>
                    </div>
                  )}
                  {chiTietBDS?.loaiHinh?.loaiBDS?.name === 'Căn hộ' ? (
                    <>
                      <div className="flex flex-row">
                        <div className="w-1/2">Hướng ban công:</div>
                        <div className="w-1/2 font-semibold">
                          {chiTietBDS?.huongBanCong}
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="w-1/2">Số tầng:</div>
                        <div className="w-1/2 font-semibold">
                          {chiTietBDS?.soTang}
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="w-1/2">Phòng tắm:</div>
                        <div className="w-1/2 font-semibold">
                          {chiTietBDS?.soPhongTam}
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="w-1/2">Phòng ngủ:</div>
                        <div className="w-1/2 font-semibold">
                          {chiTietBDS?.soPhongNgu}
                        </div>
                      </div>
                    </>
                  ) : chiTietBDS?.loaiHinh?.loaiBDS?.name === 'Nhà ở' ? (
                    <>
                      <div className="flex flex-row">
                        <div className="w-1/2">Phòng tắm:</div>
                        <div className="w-1/2 font-semibold">
                          {chiTietBDS?.soPhongTam}
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="w-1/2">Phòng ngủ:</div>
                        <div className="w-1/2 font-semibold">
                          {chiTietBDS?.soPhongNgu}
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="w-1/2">Garage:</div>
                        <div className="w-1/2 font-semibold">
                          {chiTietBDS?.dienTichGarage} m<sup>2</sup>
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="w-1/2">Hồ bơi:</div>
                        <div className="w-1/2 font-semibold">
                          {chiTietBDS?.dienTichHoBoi} m<sup>2</sup>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  <div className="flex flex-row">
                    <div className="w-1/2">Tình trạng pháp lý:</div>
                    <div className="w-1/2 font-semibold">
                      {chiTietBDS?.tinhTrangPhapLy}
                    </div>
                  </div>
                </div>
              </div>
              {chiTietBDS?.loaiHinh?.loaiBDS?.name !== 'Đất' ? (
                <div className="mt-8 mb-8 w-full rounded-md bg-white border-[1px] shadow p-8">
                  <div className="text-gray-600 font-semibold">Tiện nghi</div>
                  <div className="mt-4 lg:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-600 text-[14px]">
                    {parseJSON(chiTietBDS?.danhSachTienNghi).map((item) => (
                      <div className="flex flex-row">
                        <BsCheck2 className="text-blue-500 w-[24px] h-[24px] mr-4" />
                        <div className="w-1/2">{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <></>
              )}
              <div className="mt-8 mb-8 w-full rounded-md bg-white border-[1px] shadow p-8">
                <div className="flex flex-row justify-between flex-wrap">
                  <div className="text-gray-600 font-semibold">Vị trí</div>
                  <div className="text-gray-600 text-[14px]">
                    {chiTietBDS?.diaChi}
                  </div>
                </div>
                <div className="mt-8 w-full rounded-md overflow-hidden"></div>
                <MapComponent lat={toaDo?.lat} lon={toaDo?.lon} />
              </div>
              <div className="mt-8 mb-8 w-full rounded-md bg-white border-[1px] shadow p-8">
                <div className="flex flex-row justify-between flex-wrap">
                  <div className="text-gray-600 font-semibold">Bản vẽ nhà</div>
                </div>
                <img
                  src={chiTietBDS?.hinhAnhBanVeThietKe}
                  className="mt-8 w-full rounded-md h-[360px] md:h-[540px] lg:h-[630px]"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="mt-8 mb-8 w-full rounded-md bg-white border-[1px] shadow p-8">
                <div className="flex flex-row justify-between flex-wrap">
                  <div className="text-gray-600 font-semibold">Video</div>
                </div>
                {/* <img
                src="https://thamtuphuctam.com/wp-content/uploads/2019/01/dich-vu-tham-tu-thanh-hoa-min.jpg"
                className="mt-8 w-full rounded-md"
                style={{ objectFit: "cover" }}
              /> */}
                <iframe
                  className="mt-8 rounded-md w-full h-[270px] md:h-[450px] lg:h-[540px]"
                  style={{ objectFit: 'cover' }}
                  src="https://www.youtube.com/embed/KudedLV0tP0"
                ></iframe>
              </div>
            </div>
            <div className="basis-1/4 h-fit lg:mt-8 mt-0 mb-8">
              <ContactInfo doiTacInfo={chiTietBDS?.user} />
            </div>
          </div>

          <a
            href="#"
            className="w-full flex flex-row gap-2 justify-center mb-8 font-medium text-[18px] bg-blue-500 text-white p-4 rounded-md"
          >
            <BiSolidArrowFromBottom className="mt-1" />
            Về đầu trang
          </a>
        </div>
      </div>
    </div>
  );
}
