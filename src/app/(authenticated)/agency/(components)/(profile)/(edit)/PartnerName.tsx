import { Input } from '@nextui-org/react';
import React from 'react';
import { Label } from '@/components/ui/label';

export const PartnerName = ({ nameDoiTac, setNameDoiTac }) => {
  return (
    <div className="flex flex-col gap-3 max-w-xs lg:max-w-2xl ">
      <Label className="font-bold text-sm">
        Tên đối tác <span className="text-red-500">*</span>
      </Label>
      <Input
        isInvalid={nameDoiTac !== '' ? false : true}
        errorMessage={`${nameDoiTac !== '' ? '' : 'Vui lòng nhập tên đối tác'}`}
        className="max-w-xs lg:max-w-2xl "
        value={nameDoiTac}
        placeholder="Nhập tên đối tác"
        onChange={(e) => {
          setNameDoiTac(e.target.value);
        }}
      />
    </div>
  );
};
