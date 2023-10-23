import { formatNumberWithCommas } from '@/lib/utils';
import { Input } from '@nextui-org/react';
import React from 'react';

export const DienTich = ({
  chieuDai,
  chieuRong,
  setChieuDai,
  setChieuRong,
}) => {
  return (
    <div className="flex flex-col space-y-6 max-w-xs lg:max-w-lg">
      <div className="flex flex-col lg:flex-row gap-6 max-w-xs lg:max-w-lg ">
        <Input
          label="Chiều dài"
          isInvalid={chieuDai !== '' ? false : true}
          errorMessage={`${chieuDai !== '' ? '' : 'Vui lòng nhập chiều dài'}`}
          value={chieuDai}
          onChange={(e) => {
            if (/^\d*$/.test(e.target.value)) {
              setChieuDai(e.target.value);
            }
          }}
        />

        <Input
          isInvalid={chieuRong !== '' ? false : true}
          errorMessage={`${chieuRong !== '' ? '' : 'Vui lòng nhập chiều rộng'}`}
          label="Chiều rộng"
          value={chieuRong}
          onChange={(e) => {
            if (/^\d*$/.test(e.target.value)) {
              setChieuRong(e.target.value);
            }
          }}
        />
      </div>
      <Input
        isReadOnly
        variant="bordered"
        className="max-w-xs lg:max-w-lg"
        value={
          Number(chieuDai) * Number(chieuRong)
            ? `${formatNumberWithCommas(
                `${Number(chieuDai) * Number(chieuRong)}`
              )}  m² `
            : ''
        }
        placeholder="Diện tích"
      />
    </div>
  );
};
