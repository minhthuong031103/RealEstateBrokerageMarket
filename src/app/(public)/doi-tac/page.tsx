import { BatDongSanNoiBat } from '../bat-dong-san/(components)/BatDongSanNoiBat';
import { CacLoaiHinhBatDongSan } from '../bat-dong-san/(components)/CacLoaiHinhBatDongSan';
import { ListComponent } from './(components)/ListComponent';

async function page() {
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
          <div className="flex flex-col gap-6 lg:gap-0 lg:flex-row pt-8">
            <div className="basis-[35%] flex flex-col gap-4">
              <BatDongSanNoiBat />
              <CacLoaiHinhBatDongSan />
            </div>
            <div className="basis-[65%]">
              <ListComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
