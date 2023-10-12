'use client';

import { Button } from '@/components/ui/button';

import React from 'react';
import DialogCustom from '@/components/ui/dialogCustom';
// import { Label } from '@/components/ui/label';
import { SelectDanhMuc } from './SelectDanhMuc';
import { BaiVietForm } from './(addPost)/BaiVietForm';
// import * as z from 'zod';

// const formSchema = z.object({});
export const AddPostModal = () => {
  const [open, setOpen] = React.useState(false);

  const [danhMucValue, setDanhMucValue] = React.useState(null);
  const [thue, setThue] = React.useState(false);
  const [ban, setBan] = React.useState(false);
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
          className="w-full lg:w-[80%] h-[80%] lg:h-[95%] flex items-center justify-center"
          setIsModalOpen={setOpen}
          isModalOpen={open}
          warningOnClose={true}
        >
          <div className="flex flex-col gap-y-6 w-full h-full px-1">
            <SelectDanhMuc
              setThue={setThue}
              setBan={setBan}
              thue={thue}
              ban={ban}
              setDanhMucValue={setDanhMucValue}
            />

            {danhMucValue && (thue || ban) ? (
              <BaiVietForm danhMucValue={danhMucValue} isChoThue={thue} />
            ) : null}
          </div>
        </DialogCustom>
      ) : null}
      {/* {isWarningClose ? (
        <DialogCustom
          className="w-[90%] lg:w-[30%] h-[40%] lg:h-[50%] "
          setIsModalOpen={setIsWarningClose}
          isModalOpen={isWarningClose}
        >
          <div className="flex flex-col items-center justify-between h-full lg:py-12">
            <Label className="mb-24 font-bold text-lg">
              Bạn có muốn đóng cửa sổ này không?
            </Label>
            <div className="flex items-center justify-center w-full">
              <Button
                variant={'destructive'}
                className="w-[30%] mr-4"
                onClick={() => {
                  setOpen(false);
                  setDanhMucValue(null);
                  setThue(false);
                  setBan(false);
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
      ) : null} */}
    </div>
  );
};
