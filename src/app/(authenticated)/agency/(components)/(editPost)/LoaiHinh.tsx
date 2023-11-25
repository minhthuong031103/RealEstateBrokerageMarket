"use client";

import { useBatDongSan } from "@/hooks/useBatDongSan";
import { Select, SelectItem } from "@nextui-org/react";
import React, { useEffect } from "react";

export const LoaiHinh = ({ setLoaiHinhValue, danhMucValue, loaiHinhValue }) => {
  console.log(
    "🚀 ~ file: LoaiHinh.tsx:8 ~ LoaiHinh ~ danhMucValue:",
    danhMucValue
  );
  const [selectedLoaiHinh, setSelectedLoaiHinh] = React.useState(new Set([]));
  const [loaiHinhTouched, setLoaiHinhTouched] = React.useState(false);
  const [loaiHinh, setLoaiHinh] = React.useState([]);
  const { fetchLoaiHinhTheoDanhMuc } = useBatDongSan();
  useEffect(() => {
    async function getLoaiHinh() {
      const res = await fetchLoaiHinhTheoDanhMuc(danhMucValue);
      setLoaiHinh(res);
    }
    getLoaiHinh();
  }, [danhMucValue]);
  useEffect(() => {
    if (loaiHinhValue) {
      setSelectedLoaiHinh(new Set([loaiHinhValue]));
    }
    if (selectedLoaiHinh) {
      const loaiHinhValueArray = Array.from(selectedLoaiHinh);
      setLoaiHinhValue(loaiHinhValueArray?.[0]);
    }
  }, [selectedLoaiHinh]);
  const isLoaiHinhValid = selectedLoaiHinh.size > 0;
  return (
    <div className="flex flex-col h-full gap-y-6">
      <Select
        key={"loaihinh"}
        radius={"sm"}
        variant="bordered"
        label="Loại hình bất động sản"
        isInvalid={isLoaiHinhValid || !loaiHinhTouched ? false : true}
        errorMessage={
          isLoaiHinhValid || !loaiHinhTouched ? "" : "Vui lòng chọn loại hình"
        }
        autoFocus={false}
        placeholder="Chọn loại hình bất động sản"
        selectedKeys={selectedLoaiHinh}
        onSelectionChange={setSelectedLoaiHinh}
        onClose={() => setLoaiHinhTouched(true)}
        className="w-full"
      >
        {loaiHinh?.map((loaihinh) => (
          <SelectItem key={loaihinh.name} value={loaihinh.name}>
            {loaihinh.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
