import { Separator } from "@/components/ui/separator";
import React from "react";
import { BiSolidArrowFromBottom } from "react-icons/bi";
import { BsCheck2 } from "react-icons/bs";
import { ContactInfo } from "./components/ContactInfo";
import { ImagePost } from "./components/ImagePost";
import { LikeShareGroup } from "./components/LikeShareGroup";

async function page() {
  return (
    <div className="container mx-auto px-[24px]">
      <div className="ml-4">
        <div className="container pt-[48px]">
          <div className="flex flex-col lg:flex-row justify-between mb-8">
            <div className="w-[60%]">
              <h1 className="text-[28px] text-neutral-700 font-medium ">
                Biệt thự làng Việt Kiều châu Âu
                bllllllllllllllllllssssssssssssss
              </h1>
              <h4 className="text-gray-500">Mỗ lao, Hà Đông, Hà Nội</h4>
            </div>
            <div className="text-[28px] text-neutral-700 font-medium my-auto flex flex-row lg:w-[40%] lg:justify-end w-full justify-between space-x-6">
              <p>100.000.000đ</p>
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
                    Biệt thự
                  </div>
                  <div className="rounded bg-gray-50 text-gray-600 text-[14px] py-2 px-8">
                    Nhà tắm: 4
                  </div>
                  <div className="rounded bg-gray-50 text-gray-600 text-[14px] py-2 px-8">
                    Phòng ngủ: 6
                  </div>
                  <div className="rounded bg-gray-50 text-gray-600 text-[14px] py-2 px-8">
                    Diện tích: 500 m2
                  </div>
                </div>
                <div className="mt-8 text-gray-600">Mô tả</div>
                <div className="mt-4 text-gray-600 text-[14px]">
                  The Terra An Hưng là một trong những dự án chung cư giá rẻ của
                  Văn Phú Invest - chủ đầu tư từng phát triển nhiều dự án nhà ở
                  tại Hà Nội như: The Van Phu Victoria, Nhà phố thương mại The
                  Victoria, Home city, The Terra – Hào Nam, Grandeur Palace
                  Giảng Võ, Grandeur Palace Phạm Hùng… Một đặc điểm khá rõ nét ở
                  các dự án của Văn Phú đó là vị trí thường nằm tại những khu
                  dân cư đã phát triển ổn định, tận dụng hạ tầng của các dự án
                  lớn, với triết lý “đứng trên vai người khổng lồ”.
                </div>
                <Separator className="mt-4" />
                <div className="mt-8 text-gray-600">Thông tin chi tiết</div>
                <div className="mt-4 lg:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-600 text-[14px]">
                  <div className="flex flex-row">
                    <div className="w-1/2">BDS ID:</div>
                    <div className="w-1/2 font-medium">123456</div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-1/2">Phòng ngủ:</div>
                    <div className="w-1/2 font-medium">4</div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-1/2">Nhà tắm:</div>
                    <div className="w-1/2 font-medium">2</div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-1/2">Diện tích:</div>
                    <div className="w-1/2 font-medium">500 m2</div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-1/2">Năm hoàn thành:</div>
                    <div className="w-1/2 font-medium">2023</div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-1/2">BDS ID:</div>
                    <div className="w-1/2 font-medium">123456</div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-1/2">Phòng ngủ:</div>
                    <div className="w-1/2 font-medium">4</div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-1/2">Nhà tắm:</div>
                    <div className="w-1/2 font-medium">2</div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-1/2">Diện tích:</div>
                    <div className="w-1/2 font-medium">500 m2</div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-1/2">BDS ID:</div>
                    <div className="w-1/2 font-medium">123456</div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-1/2">Phòng ngủ:</div>
                    <div className="w-1/2 font-medium">4</div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-1/2">Nhà tắm:</div>
                    <div className="w-1/2 font-medium">2</div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-1/2">Diện tích:</div>
                    <div className="w-1/2 font-medium">500 m2</div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-1/2">BDS ID:</div>
                    <div className="w-1/2 font-medium">123456</div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-1/2">Phòng ngủ:</div>
                    <div className="w-1/2 font-medium">4</div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-1/2">Nhà tắm:</div>
                    <div className="w-1/2 font-medium">2</div>
                  </div>
                  <div className="flex flex-row">
                    <div className="w-1/2">Diện tích:</div>
                    <div className="w-1/2 font-medium">500 m2</div>
                  </div>
                </div>
              </div>
              <div className="mt-8 mb-8 w-full rounded-md bg-white border-[1px] shadow p-8">
                <div className="text-gray-600 font-semibold">Tiện nghi</div>
                <div className="mt-4 lg:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-600 text-[14px]">
                  <div className="flex flex-row">
                    <BsCheck2 className="text-blue-500 w-[24px] h-[24px] mr-4" />
                    <div className="w-1/2">Điều hòa</div>
                  </div>
                  <div className="flex flex-row">
                    <BsCheck2 className="text-blue-500 w-[24px] h-[24px] mr-4" />
                    <div className="w-1/2">Lò sưởi</div>
                  </div>
                  <div className="flex flex-row">
                    <BsCheck2 className="text-blue-500 w-[24px] h-[24px] mr-4" />
                    <div className="w-1/2">Bếp nướng</div>
                  </div>
                  <div className="flex flex-row">
                    <BsCheck2 className="text-blue-500 w-[24px] h-[24px] mr-4" />
                    <div className="w-1/2">Điều hòa</div>
                  </div>
                  <div className="flex flex-row">
                    <BsCheck2 className="text-blue-500 w-[24px] h-[24px] mr-4" />
                    <div className="w-1/2">Lò sưởi</div>
                  </div>
                  <div className="flex flex-row">
                    <BsCheck2 className="text-blue-500 w-[24px] h-[24px] mr-4" />
                    <div className="w-1/2">Bếp nướng</div>
                  </div>
                  <div className="flex flex-row">
                    <BsCheck2 className="text-blue-500 w-[24px] h-[24px] mr-4" />
                    <div className="w-1/2">Máy giặt</div>
                  </div>
                  <div className="flex flex-row">
                    <BsCheck2 className="text-blue-500 w-[24px] h-[24px] mr-4" />
                    <div className="w-1/2">Lò sưởi</div>
                  </div>
                  <div className="flex flex-row">
                    <BsCheck2 className="text-blue-500 w-[24px] h-[24px] mr-4" />
                    <div className="w-1/2">Bếp nướng</div>
                  </div>
                  <div className="flex flex-row">
                    <BsCheck2 className="text-blue-500 w-[24px] h-[24px] mr-4" />
                    <div className="w-1/2">Tủ lạnh</div>
                  </div>
                  <div className="flex flex-row">
                    <BsCheck2 className="text-blue-500 w-[24px] h-[24px] mr-4" />
                    <div className="w-1/2">Lò sưởi</div>
                  </div>
                  <div className="flex flex-row">
                    <BsCheck2 className="text-blue-500 w-[24px] h-[24px] mr-4" />
                    <div className="w-1/2">Bếp nướng</div>
                  </div>
                </div>
              </div>
              <div className="mt-8 mb-8 w-full rounded-md bg-white border-[1px] shadow p-8">
                <div className="flex flex-row justify-between flex-wrap">
                  <div className="text-gray-600 font-semibold">Vị trí</div>
                  <div className="text-gray-600 text-[14px]">
                    Mỗ Lao , Hà Đông, Hà Nội
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

export default page;
