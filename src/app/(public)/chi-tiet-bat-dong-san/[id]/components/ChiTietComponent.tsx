"use client";
import { Separator } from "@/components/ui/separator";
import { useBatDongSan } from "@/hooks/useBatDongSan";
import { parseJSON } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { BiSolidArrowFromBottom } from "react-icons/bi";
import { BsCheck2 } from "react-icons/bs";
import { ContactInfo } from "./ContactInfo";
import { ImagePost } from "./ImagePost";
import { LikeShareGroup } from "./LikeShareGroup";
const CURRENCY_FORMAT = new Intl.NumberFormat(undefined, {
  currency: "VND",
  style: "currency",
});

export function formatCurrency(value: number) {
  return CURRENCY_FORMAT.format(value);
}

export function ChiTietComponent({ id }) {
  const [chiTietBDS, setChiTietBDS] = useState();
  const { fetchBatDongSanTheoId } = useBatDongSan();
  useEffect(() => {
    const getBatDongSan = async () => {
      await fetchBatDongSanTheoId(id).then((data) => {
        setChiTietBDS(data[0]);
      });
    };

    getBatDongSan();
  }, []);
  return (
    <div className="container mx-auto px-[24px]">
      <div className="ml-4">
        <div className="container pt-[48px]">
          <div className="flex flex-col lg:flex-row justify-between mb-8">
            <div className="w-[60%]">
              <h1 className="text-[28px] text-neutral-700 font-medium ">
                {chiTietBDS?.tieuDe}
              </h1>
              <h4 className="text-gray-500">{chiTietBDS?.diaChi}</h4>
            </div>
            <div className="text-[28px] text-neutral-700 font-medium my-auto flex flex-row lg:w-[40%] lg:justify-end w-full justify-between space-x-6">
              <p>{formatCurrency(chiTietBDS?.gia)}</p>
              <div>
                <LikeShareGroup />
              </div>
            </div>
          </div>
          <ImagePost />
          <div className="flex flex-col lg:flex-row lg:gap-6">
            <div className="basis-3/4">
              <div className="mt-8 w-full rounded-md bg-white border-[1px] shadow p-8">
                <div className="flex flex-row flex-wrap gap-4">
                  <div className="rounded bg-gray-50 text-gray-600 text-[14px] py-2 px-8">
                    {chiTietBDS?.isChothue === false ? "Đăng bán" : "Cho thuê"}
                  </div>
                  <div className="rounded bg-gray-50 text-gray-600 text-[14px] py-2 px-8">
                    {chiTietBDS?.loaiHinh?.name}
                  </div>
                  {chiTietBDS?.loaiHinh?.loaiBDS?.name === "Căn hộ" ||
                  chiTietBDS?.loaiHinh?.loaiBDS?.name === "Nhà ở" ? (
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
                    <div className="w-1/2 font-medium">{chiTietBDS?.id}</div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-1/2">Chiều dài:</div>
                    <div className="w-1/2 font-medium">
                      {chiTietBDS?.chieuDai} m
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-1/2">Chiều rộng:</div>
                    <div className="w-1/2 font-medium">
                      {chiTietBDS?.chieuRong} m
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-1/2">Diện tích:</div>
                    <div className="w-1/2 font-medium">
                      {chiTietBDS?.dienTich} m<sup>2</sup>
                    </div>
                  </div>
                  {chiTietBDS?.loaiHinh?.loaiBDS?.name !== "Đất" ? (
                    <>
                      <div className="flex flex-row">
                        <div className="w-1/2">Năm hoàn thành:</div>
                        <div className="w-1/2 font-medium">
                          {
                            new Date(chiTietBDS?.hoanThanh)
                              .toLocaleDateString("en-GB")
                              .split("/")[2]
                          }
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="w-1/2">Nội thất:</div>
                        <div className="w-1/2 font-medium">
                          {chiTietBDS?.tinhTrangNoiThat}
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="w-1/2">Hướng cửa chính:</div>
                        <div className="w-1/2 font-medium">
                          {chiTietBDS?.huongCuaChinh}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-row">
                      <div className="w-1/2">Hướng đất:</div>
                      <div className="w-1/2 font-medium">
                        {chiTietBDS?.huongDat}
                      </div>
                    </div>
                  )}
                  {chiTietBDS?.loaiHinh?.loaiBDS?.name === "Căn hộ" ? (
                    <>
                      <div className="flex flex-row">
                        <div className="w-1/2">Hướng ban công:</div>
                        <div className="w-1/2 font-medium">
                          {chiTietBDS?.huongBanCong}
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="w-1/2">Số tầng:</div>
                        <div className="w-1/2 font-medium">
                          {chiTietBDS?.soTang}
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="w-1/2">Phòng tắm:</div>
                        <div className="w-1/2 font-medium">
                          {chiTietBDS?.soPhongTam}
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="w-1/2">Phòng ngủ:</div>
                        <div className="w-1/2 font-medium">
                          {chiTietBDS?.soPhongNgu}
                        </div>
                      </div>
                    </>
                  ) : chiTietBDS?.loaiHinh?.loaiBDS?.name === "Nhà ở" ? (
                    <>
                      <div className="flex flex-row">
                        <div className="w-1/2">Phòng tắm:</div>
                        <div className="w-1/2 font-medium">
                          {chiTietBDS?.soPhongTam}
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="w-1/2">Phòng ngủ:</div>
                        <div className="w-1/2 font-medium">
                          {chiTietBDS?.soPhongNgu}
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="w-1/2">Garage:</div>
                        <div className="w-1/2 font-medium">
                          {chiTietBDS?.dienTichGarage} m<sup>2</sup>
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className="w-1/2">Hồ bơi:</div>
                        <div className="w-1/2 font-medium">
                          {chiTietBDS?.dienTichHoBoi} m<sup>2</sup>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  <div className="flex flex-row">
                    <div className="w-1/2">Tình trạng pháp lý:</div>
                    <div className="w-1/2 font-medium">
                      {chiTietBDS?.tinhTrangPhapLy}
                    </div>
                  </div>
                </div>
              </div>
              {chiTietBDS?.loaiHinh?.loaiBDS?.name !== "Đất" ? (
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
                <img
                  src="https://bungalower.com/wp-content/uploads/2019/08/ace-cafe-map-to-obt-1024x538.jpg"
                  className="mt-8 w-full rounded-md"
                />
              </div>
              <div className="mt-8 mb-8 w-full rounded-md bg-white border-[1px] shadow p-8">
                <div className="flex flex-row justify-between flex-wrap">
                  <div className="text-gray-600 font-semibold">Bản vẽ nhà</div>
                </div>
                <img
                  src="https://th.bing.com/th/id/OIP.SAs92LKbXq4cwtYv1UgS5QHaFc?pid=ImgDet&rs=1"
                  className="mt-8 w-full rounded-md"
                  style={{ objectFit: "cover" }}
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
                  className="mt-0 rounded-md w-full h-[270px] md:h-[450px] lg:[540px]"
                  style={{ objectFit: "cover" }}
                  src="https://www.youtube.com/embed/KudedLV0tP0"
                ></iframe>
              </div>
            </div>
            <div className="basis-1/4 h-fit lg:mt-8 mt-0 mb-8">
              <ContactInfo />
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
