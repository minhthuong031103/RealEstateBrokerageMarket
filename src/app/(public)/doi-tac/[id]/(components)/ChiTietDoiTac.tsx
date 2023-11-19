import { LayoutBatDongSanCuaDoiTac } from "./LayoutBatDongSanCuaDoiTac";

export const ChiTietDoiTac = ({ id }) => {
  return (
    <div className="container mx-auto lg:px-[52px]">
      <div className="ml-4">
        <div className="container pt-[48px]">
          <div>
            <h2 className="text-gray-500">Trang chủ / Đối tác</h2>
            <h1 className="text-[32px] text-neutral-700 font-semibold mt-4">
              Đối tác
            </h1>
          </div>
          <LayoutBatDongSanCuaDoiTac id={id} />
        </div>
      </div>
    </div>
  );
};
