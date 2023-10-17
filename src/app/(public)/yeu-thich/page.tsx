import { LayoutBatDongSanYeuThich } from "./components/LayoutBatDongSanYeuThich";

async function page() {
  return (
    <div className="container mx-auto lg:px-[52px]">
      <div className="ml-4">
        <div className="container pt-[48px]">
          <div>
            <h2 className="text-gray-500">Trang chủ / Danh sách yêu thích</h2>
            <h1 className="text-[32px] text-neutral-700 font-semibold mt-4">
              Danh sách yêu thích của bạn
            </h1>
          </div>
          <LayoutBatDongSanYeuThich />
        </div>
      </div>
    </div>
  );
}

export default page;
