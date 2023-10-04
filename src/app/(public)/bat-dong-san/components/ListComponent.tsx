"use client";
import { Button } from "@/components/ui/button";
import { useBatDongSan } from "@/hooks/useBatDongSan";
import { useEffect, useState } from "react";
import { HiSortAscending } from "react-icons/hi";
import { ListItemComponent } from "./ListItemComponent";

export function ListComponent() {
  const [listProperties, setListProperties] = useState([]);
  useEffect(() => {
    const getBatDongSan = async () => {
      const result = await fetchBatDongSanAll();
      setListProperties(result as any);
      return result;
    };
    getBatDongSan();
  }, []);
  const { fetchBatDongSanAll } = useBatDongSan();
  return (
    <div className="mr-6">
      <div className="flex justify-between p-4 rounded-xl bg-white border-[1px] shadow-sm">
        <div className=" text-[14px] text-gray-500 flex my-auto">
          {listProperties.length} kết quả
        </div>
        <div className="flex flex-row">
          <p className="text-[14px] text-neutral-800 flex my-auto mr-2 font-semibold">
            Sắp xếp theo ngày đăng:{" "}
          </p>
          <Button
            variant={"outline"}
            size={"sm"}
            className="bg-white text-neutral-800 text-base hover:bg-gray-100 hover:text-neutral active:scale-75 transition ease-in-out duration-200"
          >
            <HiSortAscending />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {listProperties.map((item) => (
          <ListItemComponent item={item} />
        ))}
      </div>
      <div
        className="text-center py-6 font-medium text-red-400 cursor-pointer"
        onClick={() => {}}
      >
        Xem thêm
      </div>
    </div>
  );
}
