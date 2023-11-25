"use client";

import { Huong } from "@/lib/constant";
import { Select, SelectItem } from "@nextui-org/react";
import React, { useEffect } from "react";
import { BsCompass } from "react-icons/bs";

export const HuongCanHo = ({ setHuongCuaChinh, setHuongBanCong }) => {
  const [selectedHuongBanCong, setSelectedHuongBanCong] = React.useState(
    new Set([])
  );
  const [banCongTouched, setBanCongTouched] = React.useState(false);

  const [selectedHuongCuaChinh, setSelectedHuongCuaChinh] = React.useState(
    new Set([])
  );
  const [cuaChinhTouched, setCuaChinhTouched] = React.useState(false);

  useEffect(() => {
    if (selectedHuongBanCong) {
      const banCongValueArray = Array.from(selectedHuongBanCong);
      setHuongBanCong(banCongValueArray?.[0]);
    }
  }, [selectedHuongBanCong]);

  useEffect(() => {
    if (selectedHuongCuaChinh) {
      const cuaChinhValueArray = Array.from(selectedHuongCuaChinh);
      setHuongCuaChinh(cuaChinhValueArray?.[0]);
    }
  }, [selectedHuongCuaChinh]);

  const isCuaChinhValid = selectedHuongCuaChinh.size > 0;
  const isBanCongValid = selectedHuongBanCong.size > 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-6 justify-between w-full">
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
        selectedKeys={selectedHuongBanCong}
        onSelectionChange={setSelectedHuongBanCong}
        onClose={() => setBanCongTouched(true)}
        className="w-full"
        startContent={<BsCompass className="w-3 h-3" />}
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
        selectedKeys={selectedHuongCuaChinh}
        onSelectionChange={setSelectedHuongCuaChinh}
        onClose={() => setCuaChinhTouched(true)}
        className="w-full"
        startContent={<BsCompass className="w-3 h-3" />}
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
