'use client';

import React, { useEffect } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { getRequest } from '@/lib/fetch';

export const SelectAddress = () => {
  const [selectedProvince, setSelectedProvince] = React.useState(new Set([]));
  const [selectedDistrict, setSelectedDistrict] = React.useState(new Set([]));
  const [selectedWard, setSelectedWard] = React.useState(new Set([]));

  const [provinceTouched, setProvinceTouched] = React.useState(false);
  const [districtTouched, setDistrictTouched] = React.useState(false);
  const [wardTouched, setWardTouched] = React.useState(false);

  const [isLoadingProvince, setIsLoadingProvince] = React.useState(false);
  const [isLoadingDistrict, setIsLoadingDistrict] = React.useState(false);
  const [isLoadingWard, setIsLoadingWard] = React.useState(false);

  const [provinces, setProvince] = React.useState([]);
  const [districts, setDistrict] = React.useState([]);
  const [wards, setWard] = React.useState([]);
  useEffect(() => {
    async function getProvince() {
      setIsLoadingProvince(true);
      const res = await getRequest({
        endPoint: 'https://provinces.open-api.vn/api/p/',
      });

      setProvince(res);
      setIsLoadingProvince(false);
    }
    getProvince();
  }, []);
  useEffect(() => {
    setDistrict([]);
    setWard([]);
    async function getDistrict() {
      if (selectedProvince.size > 0) {
        setIsLoadingDistrict(true);
        const valuesArray = Array.from(selectedProvince);
        const provinceCode = valuesArray[0];
        const res = await getRequest({
          endPoint: `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`,
        });
        setDistrict(res?.districts);
        setIsLoadingDistrict(false);
      }
    }
    getDistrict();
  }, [selectedProvince]);
  useEffect(() => {
    async function getWard() {
      if (selectedDistrict.size > 0) {
        setIsLoadingWard(true);
        const valuesArray = Array.from(selectedDistrict);
        const districtCode = valuesArray[0];
        const res = await getRequest({
          endPoint: `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`,
        });
        setWard(res?.wards);
        setIsLoadingWard(false);
      }
    }

    getWard();
  }, [selectedDistrict]);
  console.log(wards);
  const isProvinceValid = selectedProvince.size > 0;
  const isDistrictValid = selectedDistrict.size > 0;
  const isWardValid = selectedWard.size > 0;

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-row gap-x-6 ">
        <Select
          isRequired
          key={'province'}
          radius={'md'}
          label="Thành phố, tỉnh thành"
          isInvalid={isProvinceValid || !provinceTouched ? false : true}
          errorMessage={
            isProvinceValid || !provinceTouched
              ? ''
              : 'Vui lòng chọn thành phố, tỉnh thành'
          }
          autoFocus={false}
          placeholder="Chọn thành phố, tỉnh thành"
          selectedKeys={selectedProvince}
          isLoading={isLoadingProvince}
          onSelectionChange={setSelectedProvince}
          className="w-full lg:w-[50%]"
          onClose={() => setProvinceTouched(true)}
        >
          {provinces?.map((province) => (
            <SelectItem key={province.code} value={province.code}>
              {province.name}
            </SelectItem>
          ))}
        </Select>
        <Select
          isRequired
          key={'district'}
          radius={'md'}
          label="Quận, huyện"
          isInvalid={isDistrictValid || !districtTouched ? false : true}
          errorMessage={
            isDistrictValid || !districtTouched
              ? ''
              : 'Vui lòng chọn quận, huyện'
          }
          autoFocus={false}
          placeholder="Chọn quận, huyện"
          selectedKeys={selectedDistrict}
          isLoading={isLoadingDistrict}
          onSelectionChange={setSelectedDistrict}
          className="w-full lg:w-[50%]"
          onClose={() => setDistrictTouched(true)}
        >
          {districts?.map((district) => (
            <SelectItem key={district.code} value={district.code}>
              {district.name}
            </SelectItem>
          ))}
        </Select>
      </div>

      <Select
        isRequired
        key={'ward'}
        radius={'md'}
        label="Xã, phường"
        isInvalid={isWardValid || !wardTouched ? false : true}
        errorMessage={
          isWardValid || !wardTouched ? '' : 'Vui lòng chọn xã, phường'
        }
        autoFocus={false}
        placeholder="Chọn xã, phường"
        selectedKeys={selectedWard}
        isLoading={isLoadingWard}
        onSelectionChange={setSelectedWard}
        className="w-full lg:w-[50%]"
        onClose={() => setWardTouched(true)}
      >
        {wards?.map((ward) => (
          <SelectItem key={ward.code} value={ward.code}>
            {ward.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};
