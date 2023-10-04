import React from "react";
import { ListComponent } from "./components/ListComponent";
import { SearchComponent } from "./components/SearchComponent";
import { SearchSheetComponent } from "./components/SearchSheetComponent";

async function page() {
  return (
    <div className="container mx-auto lg:px-[52px]">
      <div className="ml-4">
        <div className="container pt-[48px]">
          <div>
            <h2 className="text-gray-500">
              Trang chủ / Danh sách bất động sản
            </h2>
            <h1 className="text-[32px] text-neutral-700 font-semibold mt-4">
              Danh sách bất động sản
            </h1>
          </div>
          <div className="flex flex-row mt-4 justify-between lg:hidden">
            <SearchSheetComponent />
          </div>
          <div className="flex flex-col lg:flex-row pt-8">
            <div className="basis-[35%] hidden lg:block">
              <SearchComponent />
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
