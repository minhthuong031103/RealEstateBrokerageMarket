"use client";

import { Huong } from "@/lib/constant";
import { Select, SelectItem } from "@nextui-org/react";
import React, { useEffect } from "react";

export const HuongCanHo = ({
  setHuongCuaChinh,
  setHuongBanCong,
  huongCuaChinhValue,
  huongBanCongValue,
}) => {
  const [selectedHuongBanCong, setSelectedHuongBanCong] = React.useState(
    new Set([])
  );
  const [banCongTouched, setBanCongTouched] = React.useState(false);

  const [selectedHuongCuaChinh, setSelectedHuongCuaChinh] = React.useState(
    new Set([])
  );
  const [cuaChinhTouched, setCuaChinhTouched] = React.useState(false);

  useEffect(() => {
    if (selectedHuongBanCong.size > 0) {
      const banCongValueArray = Array.from(selectedHuongBanCong);
      setHuongBanCong(banCongValueArray?.[0]);
    }
  }, [selectedHuongBanCong]);

  useEffect(() => {
    if (selectedHuongCuaChinh.size > 0) {
      const cuaChinhValueArray = Array.from(selectedHuongCuaChinh);
      setHuongCuaChinh(cuaChinhValueArray?.[0]);
    }
  }, [selectedHuongCuaChinh]);

  const isCuaChinhValid = selectedHuongCuaChinh.size > 0;
  const isBanCongValid = selectedHuongBanCong.size > 0;

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6 justify-between w-full">
      <Select
        key={"banCong"}
        radius={"sm"}
        variant="bordered"
        label="Hướng ban công"
        isInvalid={isBanCongValid || !banCongTouched ? false : true}
        errorMessage={
          isBanCongValid || !banCongTouched
            ? ""
            : "Vui lòng chọn hướng ban công"
        }
        autoFocus={false}
        placeholder="Chọn hướng ban công"
        selectedKeys={huongBanCongValue ? [huongBanCongValue] : []}
        onSelectionChange={setSelectedHuongBanCong}
        onClose={() => setBanCongTouched(true)}
        className="w-full"
      >
        {Huong?.map((noithat) => (
          <SelectItem key={noithat.value} value={noithat.value}>
            {noithat.value.toString()}
          </SelectItem>
        ))}
      </Select>

      <Select
        key={"cuaChinh"}
        radius={"sm"}
        variant="bordered"
        label="Hướng cửa chính"
        isInvalid={isCuaChinhValid || !cuaChinhTouched ? false : true}
        errorMessage={
          isCuaChinhValid || !cuaChinhTouched
            ? ""
            : "Vui lòng chọn hướng cửa chính"
        }
        autoFocus={false}
        placeholder="Chọn hướng cửa chính"
        selectedKeys={huongCuaChinhValue ? [huongCuaChinhValue] : []}
        onSelectionChange={setSelectedHuongCuaChinh}
        onClose={() => setCuaChinhTouched(true)}
        // className="w-[48%]"
      >
        {Huong?.map((noithat) => (
          <SelectItem key={noithat.value} value={noithat.value}>
            {noithat.value.toString()}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
