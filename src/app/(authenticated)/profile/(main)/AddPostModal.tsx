'use client';

import { Button } from '@/components/ui/button';

import React from 'react';
import { SelectAddress } from './SelectAddress';
import DialogCustom from '@/components/ui/dialogCustom';
import { Label } from '@/components/ui/label';
import { SelectDanhMuc } from './SelectDanhMuc';
// import * as z from 'zod';

// const formSchema = z.object({});
export const AddPostModal = () => {
  const [open, setOpen] = React.useState(false);
  const [addressValue, setAddressValue] = React.useState('');
  // const [danhMucBatDongSan, setDanhMucBatDongSan] = React.useState('');
  const [isWarningClose, setIsWarningClose] = React.useState(false);
  return (
    <div className="w-full h-full">
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Đăng tin bất động sản
      </Button>

      {open ? (
        <DialogCustom
          isWarningOnClose={true}
          className="w-full lg:w-[80%] h-[95%]"
          onClose={() => {
            setIsWarningClose(true);
          }}
          isModalOpen={open}
        >
          <SelectAddress
            setAddressValue={setAddressValue}
            addressValue={addressValue}
          />
          <SelectDanhMuc />
        </DialogCustom>
      ) : null}
      {isWarningClose ? (
        <DialogCustom
          className="w-[80%] lg:w-[30%] h-[50%] "
          onClose={() => {
            setIsWarningClose(false);
          }}
          isModalOpen={isWarningClose}
        >
          <div className="flex flex-col items-center justify-between h-full py-12">
            <Label className="mb-24 font-bold text-lg">
              Bạn có muốn đóng cửa sổ này không?
            </Label>
            <div className="flex items-center justify-center w-full">
              <Button
                variant={'destructive'}
                className="w-[30%] mr-4"
                onClick={() => {
                  setOpen(false);
                  setAddressValue('');
                  setIsWarningClose(false);
                }}
              >
                Có
              </Button>
              <Button
                className="w-[30%]"
                onClick={() => {
                  setIsWarningClose(false);
                }}
              >
                Không
              </Button>
            </div>
          </div>
        </DialogCustom>
      ) : null}
    </div>
  );
};
