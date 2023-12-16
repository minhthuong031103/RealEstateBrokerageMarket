/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { TinhTrangNoiThat, noiThat } from "@/lib/constant";
import { Select, SelectItem, Input, Checkbox } from "@nextui-org/react";
import React, { useEffect } from "react";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtubLight, PiGarageFill } from "react-icons/pi";
import { TbWashMachine } from "react-icons/tb";
import { DanhSachTienNghi } from "./DanhSachTienNghi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { LiaSwimmingPoolSolid } from "react-icons/lia";
import { formatNumberWithCommas } from "@/lib/utils";

interface SelectNoiThatProps {
  setPhongNgu: (value: string) => void;
  setPhongTam: (value: string) => void;
  setNoiThat: (value: string) => void;
  setSoTang: (value: string) => void;
  setDienTichGarage: (value: string) => void;
  setDienTichHoBoi: (value: string) => void;
  danhSachTienNghi: any;
  dienTichGarage: any;
  dienTichHoBoi: any;
  setDanhSachTienNghi: (value: any) => void;
  phongNguValue?: any;
  danhMucValue?: any;
  isEdit?: boolean;
}

export const SelectNoiThat = ({
  setPhongNgu,
  setPhongTam,
  setNoiThat,
  setSoTang,
  danhSachTienNghi,
  phongNguValue,
  setDanhSachTienNghi,
  dienTichGarage,
  dienTichHoBoi,
  setDienTichGarage,
  setDienTichHoBoi,
  danhMucValue,
}: SelectNoiThatProps) => {
  const [selectedPhongNgu, setSelectedPhongNgu] = React.useState(new Set([]));
  const [phongNguTouched, setPhongNguTouched] = React.useState(false);

  const [selectedPhongTam, setSelectedPhongTam] = React.useState(new Set([]));
  const [phongTamTouched, setPhongTamTouched] = React.useState(false);

  const [selectedNoiThat, setSelectedNoiThat] = React.useState(new Set([]));
  const [noiThatTouched, setNoiThatTouched] = React.useState(false);

  const [selectedSoTang, setSelectedSoTang] = React.useState(new Set([]));
  const [soTangTouched, setSoTangTouched] = React.useState(false);

  useEffect(() => {
    if (selectedPhongNgu.size > 0) {
      const phongNguValueArray = Array.from(selectedPhongNgu);
      setPhongNgu(phongNguValueArray?.[0]);
    }
  }, [selectedPhongNgu]);

  useEffect(() => {
    if (selectedPhongTam.size > 0) {
      const phongTamValueArray = Array.from(selectedPhongTam);
      setPhongTam(phongTamValueArray?.[0]);
    }
  }, [selectedPhongTam]);

  useEffect(() => {
    if (selectedNoiThat.size > 0) {
      const noiThatValueArray = Array.from(selectedNoiThat);
      setNoiThat(noiThatValueArray?.[0]);
    }
  }, [selectedNoiThat]);

  useEffect(() => {
    if (selectedSoTang.size > 0) {
      const soTangValueArray = Array.from(selectedSoTang);
      setSoTang(soTangValueArray?.[0]);
    }
  }, [selectedSoTang]);

  const isPhongNguValid = selectedPhongNgu.size > 0;
  const isPhongTamValid = selectedPhongTam.size > 0;
  const isNoiThatValid = selectedNoiThat.size > 0;
  const isSoTangValid = selectedSoTang.size > 0;
  return (
    <div className="flex flex-col gap-y-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-6 justify-between w-full">
        <Select
          key={"phongngu"}
          radius={"sm"}
          variant="bordered"
          label="Số phòng ngủ"
          isInvalid={isPhongNguValid || !phongNguTouched ? false : true}
          errorMessage={
            isPhongNguValid || !phongNguTouched
              ? ""
              : "Vui lòng chọn số phòng ngủ"
          }
          autoFocus={false}
          placeholder="Chọn số phòng ngủ"
          selectedKeys={selectedPhongNgu}
          onSelectionChange={setSelectedPhongNgu}
          onClose={() => setPhongNguTouched(true)}
          className="w-full"
          startContent={<IoBedOutline className="w-3 h-3" />}
        >
          {noiThat?.map((noithat) => (
            <SelectItem key={noithat.value} value={noithat.value}>
              {noithat.value.toString()}
            </SelectItem>
          ))}
        </Select>

        <Select
          key={"phongtam"}
          radius={"sm"}
          variant="bordered"
          label="Số phòng tắm"
          isInvalid={isPhongTamValid || !phongTamTouched ? false : true}
          errorMessage={
            isPhongTamValid || !phongTamTouched
              ? ""
              : "Vui lòng chọn số phòng tắm"
          }
          autoFocus={false}
          placeholder="Chọn số phòng tắm"
          selectedKeys={selectedPhongTam}
          onSelectionChange={setSelectedPhongTam}
          onClose={() => setPhongTamTouched(true)}
          className="w-full"
          startContent={<PiBathtubLight className="w-3 h-3" />}
        >
          {noiThat?.map((noithat) => (
            <SelectItem key={noithat.value} value={noithat.value}>
              {noithat.value.toString()}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Select
        key={"noithat"}
        radius={"sm"}
        variant="bordered"
        label="Nội thất"
        isInvalid={isNoiThatValid || !noiThatTouched ? false : true}
        errorMessage={
          isNoiThatValid || !noiThatTouched ? "" : "Vui lòng chọn nội thất"
        }
        autoFocus={false}
        placeholder="Chọn nội thất"
        selectedKeys={selectedNoiThat}
        onSelectionChange={setSelectedNoiThat}
        onClose={() => setNoiThatTouched(true)}
        className="w-full"
        startContent={<TbWashMachine className="w-3 h-3" />}
      >
        {TinhTrangNoiThat?.map((noithat) => (
          <SelectItem key={noithat.name} value={noithat.value}>
            {noithat.value.toString()}
          </SelectItem>
        ))}
      </Select>
      {danhMucValue === "Căn hộ" && (
        <Select
          key={"sotang"}
          radius={"sm"}
          variant="bordered"
          label="Số tầng"
          isInvalid={isSoTangValid || !soTangTouched ? false : true}
          errorMessage={
            isSoTangValid || !soTangTouched ? "" : "Vui lòng chọn số tầng"
          }
          autoFocus={false}
          placeholder="Chọn số tầng"
          selectedKeys={selectedSoTang}
          onSelectionChange={setSelectedSoTang}
          onClose={() => setSoTangTouched(true)}
          className="w-full"
          startContent={<HiOutlineBuildingOffice2 className="w-3 h-3" />}
        >
          {noiThat?.map((noithat) => (
            <SelectItem key={noithat.value} value={noithat.value}>
              {noithat.value.toString()}
            </SelectItem>
          ))}
        </Select>
      )}

      <div className="flex flex-col gap-y-4">
        <Input
          variant="bordered"
          radius="sm"
          className="w-full"
          label="Diện tích Garage"
          value={dienTichGarage}
          description="Nhập 0 nếu không có Garage"
          startContent={<PiGarageFill className="w-3 h-3" />}
          placeholder="Diện tích Garage"
          onChange={(e) => {
            if (/^\d*$/.test(e.target.value)) {
              setDienTichGarage(e.target.value);
            }
          }}
        />
        <Input
          variant="bordered"
          radius="sm"
          className="w-full"
          label="Diện tích hồ bơi"
          description="Nhập 0 nếu không có hồ bơi"
          startContent={<LiaSwimmingPoolSolid className="w-3 h-3" />}
          placeholder="Diện tích hồ bơi"
          value={dienTichHoBoi}
          onChange={(e) => {
            if (/^\d*$/.test(e.target.value)) {
              setDienTichHoBoi(e.target.value);
            }
          }}
        />
      </div>
      <DanhSachTienNghi
        danhSachTienNghi={danhSachTienNghi}
        setDanhSachTienNghi={setDanhSachTienNghi}
      />
    </div>
  );
};
