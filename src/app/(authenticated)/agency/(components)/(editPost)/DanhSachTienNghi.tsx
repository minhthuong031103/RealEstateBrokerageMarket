"use client";
import React, { useState } from "react";
import { Chip, Input } from "@nextui-org/react"; // Assuming '@nextui-org/react' has an Input component.
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const DanhSachTienNghi = ({ danhSachTienNghi, setDanhSachTienNghi }) => {
  const [inputValue, setInputValue] = useState("");
  const [removingFruits, setRemovingFruits] = useState([]);

  const handleClose = (tienNghiToRemove) => {
    setRemovingFruits((prev) => [...prev, tienNghiToRemove]);

    setTimeout(() => {
      setDanhSachTienNghi(
        danhSachTienNghi.filter((tienNghi) => tienNghi !== tienNghiToRemove)
      );
      setRemovingFruits((prev) =>
        prev.filter((item) => item !== tienNghiToRemove)
      );
    }, 100); // 250ms is the duration of the animation
  };

  const handleAddFruit = () => {
    if (inputValue && !danhSachTienNghi.includes(inputValue)) {
      setDanhSachTienNghi((prevFruits) => [...prevFruits, inputValue]);
      setInputValue("");
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex flex-col space-y-3">
      <div className="font-bold text-sm">Danh sách tiện nghi</div>
      <div className="mb-4 flex flex-row">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Thêm các tiện nghi của bất động sản"
          variant="bordered"
          radius="sm"
          label="Tên tiện nghi"
          endContent={
            <Button
              type="button"
              className="rounded-full transition ease-in-out hover:scale-115 origin-center hover:rotate-180 w-8 h-8 p-0 border-1 border-red-400 bg-transparent text-red-400 hover:bg-red-400 hover:text-white -mt-4"
              onClick={handleAddFruit}
            >
              <Plus className="h-4 w-4" />
            </Button>
          }
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {danhSachTienNghi.map((tienNghi, index) => (
          <Chip
            className={
              removingFruits.includes(tienNghi)
                ? "animate-appearance-out duration-100"
                : "animate-appearance-in"
            }
            key={index}
            onClose={() => handleClose(tienNghi)}
            variant="flat"
          >
            {tienNghi}
          </Chip>
        ))}
      </div>
    </div>
  );
};
