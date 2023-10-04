"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { HiSortAscending } from "react-icons/hi";
import { ListItemComponent } from "./ListItemComponent";

export function ListComponent() {
  const [pageAmount, setPageAmount] = useState(10);
  const [listProperties, setListProperties] = useState<string[]>([]);
  useEffect(() => {
    for (let i: number = 0; i < 10; i++) {
      setListProperties([...listProperties, "d"]);
    }
  }, []);
  return (
    <div className="mr-6">
      <div className="flex justify-between p-4 rounded-xl bg-white border-[1px] shadow-sm">
        <div className=" text-[14px] text-gray-500 flex my-auto">
          10 kết quả
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
        {listProperties.map(() => (
          <ListItemComponent />
        ))}
      </div>
      <div
        className="text-center py-6 font-medium text-red-400 cursor-pointer"
        onClick={() => {
          setPageAmount(pageAmount + 10);
          for (let i: number = 0; i < 10; i++) {
            listProperties.push("s");
          }
        }}
      >
        Xem thêm
      </div>
    </div>
  );
}
