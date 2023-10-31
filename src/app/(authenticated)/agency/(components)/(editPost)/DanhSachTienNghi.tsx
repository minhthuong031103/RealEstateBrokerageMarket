'use client';
import React, { useState } from 'react';
import { Chip, Input } from '@nextui-org/react'; // Assuming '@nextui-org/react' has an Input component.
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const DanhSachTienNghi = ({ danhSachTienNghi, setDanhSachTienNghi }) => {
  const [inputValue, setInputValue] = useState('');
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
      setInputValue('');
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
          endContent={
            <div className="py-3 ">
              <Button type="button" onClick={handleAddFruit}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          }
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {danhSachTienNghi.map((tienNghi, index) => (
          <Chip
            className={
              removingFruits.includes(tienNghi)
                ? 'animate-appearance-out duration-100'
                : 'animate-appearance-in'
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
