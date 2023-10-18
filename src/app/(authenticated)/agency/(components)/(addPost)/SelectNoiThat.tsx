'use client';

import { TinhTrangNoiThat, noiThat } from '@/lib/constant';
import { Select, SelectItem } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { DanhSachTienNghi } from './DanhSachTienNghi';

export const SelectNoiThat = ({
  setPhongNgu,
  setPhongTam,
  setNoiThat,
  setSoTang,
  danhSachTienNghi,
  setDanhSachTienNghi,
}) => {
  const [selectedPhongNgu, setSelectedPhongNgu] = React.useState(new Set([]));
  const [phongNguTouched, setPhongNguTouched] = React.useState(false);

  const [selectedPhongTam, setSelectedPhongTam] = React.useState(new Set([]));
  const [phongTamTouched, setPhongTamTouched] = React.useState(false);

  const [selectedNoiThat, setSelectedNoiThat] = React.useState(new Set([]));
  const [noiThatTouched, setNoiThatTouched] = React.useState(false);

  const [selectedSoTang, setSelectedSoTang] = React.useState(new Set([]));
  const [soTangTouched, setSoTangTouched] = React.useState(false);

  useEffect(() => {
    if (selectedPhongNgu) {
      const phongNguValueArray = Array.from(selectedPhongNgu);
      setPhongNgu(phongNguValueArray?.[0]);
    }
  }, [selectedPhongNgu]);

  useEffect(() => {
    if (selectedPhongTam) {
      const phongTamValueArray = Array.from(selectedPhongTam);
      setPhongTam(phongTamValueArray?.[0]);
    }
  }, [selectedPhongTam]);

  useEffect(() => {
    if (selectedNoiThat) {
      const noiThatValueArray = Array.from(selectedNoiThat);
      setNoiThat(noiThatValueArray?.[0]);
    }
  }, [selectedNoiThat]);

  useEffect(() => {
    if (selectedSoTang) {
      const soTangValueArray = Array.from(selectedSoTang);
      setSoTang(soTangValueArray?.[0]);
    }
  });

  const isPhongNguValid = selectedPhongNgu.size > 0;
  const isPhongTamValid = selectedPhongTam.size > 0;
  const isNoiThatValid = selectedNoiThat.size > 0;
  const isSoTangValid = selectedSoTang.size > 0;
  return (
    <div className="flex flex-col gap-y-6 max-w-xs lg:max-w-lg ">
      <div className="flex flex-col lg:flex-row h-full gap-6 justify-between max-w-xs lg:max-w-lg ">
        <Select
          key={'phongngu'}
          radius={'md'}
          label="Số phòng ngủ"
          isInvalid={isPhongNguValid || !phongNguTouched ? false : true}
          errorMessage={
            isPhongNguValid || !phongNguTouched
              ? ''
              : 'Vui lòng chọn số phòng ngủ'
          }
          autoFocus={false}
          placeholder="Chọn số phòng ngủ"
          selectedKeys={selectedPhongNgu}
          onSelectionChange={setSelectedPhongNgu}
          onClose={() => setPhongNguTouched(true)}
          // className="w-[48%]"
        >
          {noiThat?.map((noithat) => (
            <SelectItem key={noithat.value} value={noithat.value}>
              {noithat.value.toString()}
            </SelectItem>
          ))}
        </Select>

        <Select
          key={'phongtam'}
          radius={'md'}
          label="Số phòng tắm"
          isInvalid={isPhongTamValid || !phongTamTouched ? false : true}
          errorMessage={
            isPhongTamValid || !phongTamTouched
              ? ''
              : 'Vui lòng chọn số phòng tắm'
          }
          autoFocus={false}
          placeholder="Chọn số phòng tắm"
          selectedKeys={selectedPhongTam}
          onSelectionChange={setSelectedPhongTam}
          onClose={() => setPhongTamTouched(true)}
          // className="w-[48%]"
        >
          {noiThat?.map((noithat) => (
            <SelectItem key={noithat.value} value={noithat.value}>
              {noithat.value.toString()}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Select
        key={'noithat'}
        radius={'md'}
        label="Nội thất"
        isInvalid={isNoiThatValid || !noiThatTouched ? false : true}
        errorMessage={
          isNoiThatValid || !noiThatTouched ? '' : 'Vui lòng chọn nội thất'
        }
        autoFocus={false}
        placeholder="Chọn nội thất"
        selectedKeys={selectedNoiThat}
        onSelectionChange={setSelectedNoiThat}
        onClose={() => setNoiThatTouched(true)}
        className="max-w-xs lg:max-w-lg"
      >
        {TinhTrangNoiThat?.map((noithat) => (
          <SelectItem key={noithat.name} value={noithat.value}>
            {noithat.value.toString()}
          </SelectItem>
        ))}
      </Select>

      <Select
        key={'sotang'}
        radius={'md'}
        label="Số tầng"
        isInvalid={isSoTangValid || !soTangTouched ? false : true}
        errorMessage={
          isSoTangValid || !soTangTouched ? '' : 'Vui lòng chọn số tầng'
        }
        autoFocus={false}
        placeholder="Chọn số tầng"
        selectedKeys={selectedSoTang}
        onSelectionChange={setSelectedSoTang}
        onClose={() => setSoTangTouched(true)}
        className="max-w-xs lg:max-w-lg"
      >
        {noiThat?.map((noithat) => (
          <SelectItem key={noithat.value} value={noithat.value}>
            {noithat.value.toString()}
          </SelectItem>
        ))}
      </Select>
      <DanhSachTienNghi
        danhSachTienNghi={danhSachTienNghi}
        setDanhSachTienNghi={setDanhSachTienNghi}
      />
    </div>
  );
};
