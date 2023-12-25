"use client";

import { useBatDongSan } from "@/hooks/useBatDongSan";
import { Select, SelectItem } from "@nextui-org/react";
import React, { useEffect } from "react";
import { Checkbox } from "@nextui-org/react";

export const SelectDanhMuc = ({
  setDanhMucValue,
  setThue,
  setBan,
  thue,
  ban,
  danhMucValue,
  setLoadingDanhMuc,
}) => {
  const [selectedDanhMuc, setSelectedDanhMuc] = React.useState(new Set([]));
  const [danhMucTouched, setDanhMucTouched] = React.useState(false);
  const [isLoadingDanhMuc, setIsLoadingDanhMuc] = React.useState(false);
  const [danhMuc, setDanhMuc] = React.useState([]);
  const { fetchAllDanhMuc } = useBatDongSan();
  useEffect(() => {
    async function getDanhMuc() {
      setIsLoadingDanhMuc(true);
      const res = await fetchAllDanhMuc();
      setDanhMuc(res);
      setIsLoadingDanhMuc(false);
      setLoadingDanhMuc(false);
    }
    getDanhMuc();
  }, []);
  useEffect(() => {
    if (danhMucValue) {
      setSelectedDanhMuc([danhMucValue]);
    }
  }, []);
  useEffect(() => {
    if (selectedDanhMuc) {
      const danhMucValueArray = Array.from(selectedDanhMuc);
      setDanhMucValue(danhMucValueArray?.[0]);
    }
  }, [selectedDanhMuc]);
  const isProvinceValid = selectedDanhMuc.size > 0;
  return (
    <div className="flex flex-col h-full gap-y-6">
      <div className="flex flex-row gap-2">
        <Checkbox isDisabled={thue} isSelected={ban} onValueChange={setBan}>
          Bán
        </Checkbox>
        <Checkbox isDisabled={ban} isSelected={thue} onValueChange={setThue}>
          Thuê
        </Checkbox>
      </div>
      <Select
        isDisabled
        key={"danhmuc"}
        radius={"sm"}
        variant="bordered"
        label="Danh mục bất động sản"
        isInvalid={isProvinceValid || !danhMucTouched ? false : true}
        errorMessage={
          isProvinceValid || !danhMucTouched ? "" : "Vui lòng chọn danh mục"
        }
        autoFocus={false}
        placeholder="Chọn danh mục bất động sản 12"
        selectedKeys={selectedDanhMuc}
        isLoading={isLoadingDanhMuc}
        onSelectionChange={setSelectedDanhMuc}
        onClose={() => setDanhMucTouched(true)}
        className="w-full"
      >
        {danhMuc?.map((danhmuc) => (
          <SelectItem key={danhmuc.name} value={danhmuc.name}>
            {danhmuc.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
