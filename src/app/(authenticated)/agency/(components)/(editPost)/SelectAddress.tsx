/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useEffect } from 'react';
import { Select, SelectItem } from '@nextui-org/react';
import { getRequest } from '@/lib/fetch';
import { Input } from '@/components/ui/input';
import DialogCustom from '@/components/ui/dialogCustom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SelectAddressProps {
  addressValue: string;
  setAddressValue: (value: string) => void;
  danhMucValue: string | null;
  editAddress?: any;
}

export const SelectAddress = ({
  addressValue,
  setAddressValue,
  danhMucValue,
  editAddress,
}: SelectAddressProps) => {
  const [selectedProvince, setSelectedProvince] = React.useState(new Set([]));
  const [selectedDistrict, setSelectedDistrict] = React.useState(new Set([]));
  const [selectedWard, setSelectedWard] = React.useState(new Set([]));

  const [diaChiTouched, setDiaChiTouched] = React.useState(false);
  const [provinceTouched, setProvinceTouched] = React.useState(false);
  const [districtTouched, setDistrictTouched] = React.useState(false);
  const [wardTouched, setWardTouched] = React.useState(false);

  const [isLoadingProvince, setIsLoadingProvince] = React.useState(false);
  const [isLoadingDistrict, setIsLoadingDistrict] = React.useState(false);
  const [isLoadingWard, setIsLoadingWard] = React.useState(false);

  const [provinces, setProvince] = React.useState([]);
  const [districts, setDistrict] = React.useState([]);
  const [wards, setWard] = React.useState([]);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [streetValue, setStreetValue] = React.useState('');
  const [houseNumberValue, setHouseNumberValue] = React.useState('');
  const [tangSoValue, setTangSoValue] = React.useState('');
  const [blockValue, setBlockValue] = React.useState('');
  const [maCanValue, setMaCanValue] = React.useState('');
  const [phanKhuLoValue, setPhanKhuLoValue] = React.useState('');
  const [tenPhanKhuValue, setTenPhanKhuValue] = React.useState('');
  const [maLoValue, setMaLoValue] = React.useState('');

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
  const isProvinceValid = selectedProvince.size > 0;
  const isDistrictValid = selectedDistrict.size > 0;
  const isWardValid = selectedWard.size > 0;

  const onSubmit = () => {
    const valuesArrayProvince = Array.from(selectedProvince);
    const provinceCode = valuesArrayProvince[0];
    const provinceValue = provinces.find(
      (province) => province.code == provinceCode
    )?.name;

    const valuesArrayDistrict = Array.from(selectedDistrict);
    const districtCode = valuesArrayDistrict[0];
    const districtValue = districts.find(
      (district) => district.code == districtCode
    )?.name;

    const valuesArrayWard = Array.from(selectedWard);
    const wardCode = valuesArrayWard[0];
    const wardValue = wards.find((ward) => ward.code == wardCode)?.name;

    if (danhMucValue === 'Căn hộ' || danhMucValue === 'Văn phòng') {
      setAddressValue(
        `Mã căn ${maCanValue}, tháp ${blockValue}, tầng ${tangSoValue} , số nhà ${houseNumberValue}, đường ${streetValue}, ${wardValue}, ${districtValue}, ${provinceValue}`
      );
    } else if (danhMucValue === 'Nhà ở') {
      setAddressValue(
        `Mã căn ${maCanValue}, phân khu lô ${phanKhuLoValue} , số nhà ${houseNumberValue}, đường ${streetValue}, ${wardValue}, ${districtValue}, ${provinceValue}`
      );
    } else {
      setAddressValue(
        `Phân khu ${tenPhanKhuValue}, mã lô ${maLoValue} ,số nhà ${houseNumberValue}, đường ${streetValue}, ${wardValue}, ${districtValue}, ${provinceValue}`
      );
    }
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col w-full ">
      {isModalOpen ? (
        <DialogCustom
          // onClose={() => {
          //   setIsModalOpen(false);
          //   setDiaChiTouched(true);
          // }}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          className="w-full md:w-[50%] max-h-[95%]"
          isChild={true}
        >
          <ScrollArea className=" h-[calc(85vh-8rem)]">
            <div className="flex flex-col gap-y-6 w-full px-1 h-full">
              <p className="font-medium">Địa chỉ</p>
              <Select
                key={'province'}
                radius={'sm'}
                variant={'bordered'}
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
                className="w-full "
                onClose={() => setProvinceTouched(true)}
              >
                {provinces?.map((province) => (
                  <SelectItem key={province.code} value={province.code}>
                    {province.name}
                  </SelectItem>
                ))}
              </Select>
              <Select
                key={'district'}
                radius={'sm'}
                variant={'bordered'}
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
                className="w-full "
                onClose={() => setDistrictTouched(true)}
              >
                {districts?.map((district) => (
                  <SelectItem key={district.code} value={district.code}>
                    {district.name}
                  </SelectItem>
                ))}
              </Select>
              <Select
                key={'ward'}
                radius={'sm'}
                variant={'bordered'}
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
                className="w-full "
                onClose={() => setWardTouched(true)}
              >
                {wards?.map((ward) => (
                  <SelectItem key={ward.code} value={ward.code}>
                    {ward.name}
                  </SelectItem>
                ))}
              </Select>
              <div className="flex flex-row gap-3 ">
                <div className="flex flex-col gap-y-3">
                  <Label>
                    <div className="font-semibold">Tên Đường</div>
                  </Label>
                  <Input
                    value={streetValue}
                    onChange={(e) => {
                      setStreetValue(e.target.value);
                    }}
                    className="w-full "
                    placeholder="Tên đường"
                  />
                </div>
                <div className="flex flex-col gap-y-3">
                  <Label>
                    <div className="font-semibold">Số nhà</div>
                  </Label>
                  <Input
                    value={houseNumberValue}
                    onChange={(e) => {
                      setHouseNumberValue(e.target.value);
                    }}
                    className="w-full "
                    placeholder="Số nhà"
                  />
                </div>
              </div>

              {danhMucValue === 'Căn hộ' && (
                <>
                  <p className="font-medium">Vị trí BĐS</p>
                  <Input
                    value={tangSoValue}
                    onChange={(e) => {
                      setTangSoValue(e.target.value);
                    }}
                    className="w-full "
                    placeholder="Tầng số"
                  />
                  <div className="flex flex-row gap-3 ">
                    <Input
                      value={blockValue}
                      onChange={(e) => {
                        setBlockValue(e.target.value);
                      }}
                      className="w-full "
                      placeholder="Block/Tháp"
                    />
                    <Input
                      value={maCanValue}
                      onChange={(e) => {
                        setMaCanValue(e.target.value);
                      }}
                      className="w-full "
                      placeholder="Mã căn"
                    />
                  </div>
                </>
              )}
              {danhMucValue === 'Văn phòng' && (
                <>
                  <p className="font-medium">Vị trí BĐS</p>
                  <Input
                    value={tangSoValue}
                    onChange={(e) => {
                      setTangSoValue(e.target.value);
                    }}
                    className="w-full "
                    placeholder="Tầng số"
                  />
                  <div className="flex flex-row gap-3 ">
                    <div className="flex flex-col gap-y-3">
                      <Label>
                        <div className="font-semibold">Block/tháp</div>
                      </Label>
                      <Input
                        value={blockValue}
                        onChange={(e) => {
                          setBlockValue(e.target.value);
                        }}
                        className="w-full "
                        placeholder="Block/Tháp"
                      />
                    </div>
                    <div className="flex flex-col gap-y-3">
                      <Label>
                        <div className="font-semibold">Mã Căn</div>
                      </Label>
                      <Input
                        value={maCanValue}
                        onChange={(e) => {
                          setMaCanValue(e.target.value);
                        }}
                        className="w-full "
                        placeholder="Mã căn"
                      />
                    </div>
                  </div>
                </>
              )}
              {danhMucValue === 'Nhà ở' && (
                <>
                  <p className="font-medium">Vị trí BĐS</p>
                  <div className="flex flex-col gap-y-3">
                    <Label>
                      <div className="font-semibold">Phân khu Lô</div>
                    </Label>
                    <Input
                      value={phanKhuLoValue}
                      onChange={(e) => {
                        setPhanKhuLoValue(e.target.value);
                      }}
                      className="w-full "
                      placeholder="Phân khu lô"
                    />
                  </div>
                  <div className="flex flex-col gap-y-3">
                    <Label>
                      <div className="font-semibold">Mã Căn</div>
                    </Label>
                    <Input
                      value={maCanValue}
                      onChange={(e) => {
                        setMaCanValue(e.target.value);
                      }}
                      className="w-full "
                      placeholder="Mã căn"
                    />
                  </div>
                </>
              )}
              {danhMucValue === 'Đất' && (
                <>
                  <p className="font-medium">Vị trí BĐS</p>
                  <div className="flex flex-col gap-y-3">
                    <Label>
                      <div className="font-semibold">Mã lô</div>
                    </Label>
                    <Input
                      value={maLoValue}
                      onChange={(e) => {
                        setMaLoValue(e.target.value);
                      }}
                      className="w-full "
                      placeholder="Mã lô"
                    />
                  </div>
                  <div className="flex flex-col gap-y-3">
                    <Label>
                      <div className="font-semibold">Tên phân khu</div>
                    </Label>
                    <Input
                      value={tenPhanKhuValue}
                      onChange={(e) => {
                        setTenPhanKhuValue(e.target.value);
                      }}
                      className="w-full "
                      placeholder="Tên phân khu"
                    />
                  </div>
                </>
              )}

              <div className="w-full flex items-center justify-center">
                <Button
                  disabled={
                    !isProvinceValid ||
                    !isDistrictValid ||
                    !isWardValid ||
                    !streetValue ||
                    !houseNumberValue
                  }
                  onClick={onSubmit}
                  className="w-[50%]"
                >
                  Xác nhận
                </Button>
              </div>
            </div>
          </ScrollArea>
        </DialogCustom>
      ) : null}

      {/* <Input
        className="w-full lg:w-[50%]"
        placeholder="Địa chỉ"
        onClick={() => {
          setIsModalOpen(true);
        }}
        onFocus={() => {
          setIsModalOpen(true);
        }}
      /> */}
      <Select
        isOpen={false}
        label="Địa chỉ bất động sản"
        placeholder="Chọn địa chỉ"
        selectedKeys={addressValue !== '' ? [addressValue] : null}
        isInvalid={addressValue !== '' || !diaChiTouched ? false : true}
        errorMessage={
          addressValue !== '' || !diaChiTouched ? '' : 'Vui lòng chọn địa chỉ'
        }
        className="w-full"
        radius="sm"
        variant="bordered"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <SelectItem key={addressValue} value={addressValue}>
          {addressValue}
        </SelectItem>
      </Select>
    </div>
  );
};
