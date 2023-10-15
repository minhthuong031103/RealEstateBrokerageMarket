import { LayoutBatDongSanTheoType } from "./components/LayoutBatDongSanTheoType";

export default function page({ params }) {
  return (
    <div className="container mx-auto lg:px-[52px]">
      <div className="ml-4">
        <div className="container pt-[48px]">
          <div>
            <h2 className="text-gray-500">
              Trang chủ / Danh sách bất động sản /{" "}
              {params.id === "1"
                ? "Căn hộ"
                : params.id === "2"
                ? "Đất"
                : params.id === "3"
                ? "Nhà ở"
                : "Văn phòng"}
            </h2>
            <h1 className="text-[32px] text-neutral-700 font-semibold mt-4">
              Danh sách bất động sản
            </h1>
          </div>
          <LayoutBatDongSanTheoType
            type={
              params.id === "1"
                ? "Căn hộ"
                : params.id === "2"
                ? "Đất"
                : params.id === "3"
                ? "Nhà ở"
                : "Văn phòng"
            }
          />
        </div>
      </div>
    </div>
  );
}
