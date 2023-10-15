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
          callBack={() => {
            setThue(false);
            setBan(false);
            setDanhMucValue(null);
          }}
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
              <BaiVietForm
                danhMucValue={danhMucValue}
                isChoThue={thue}
                setOpen={setOpen}
              />
            ) : null}
          </div>
        </DialogCustom>
      ) : null}
    </div>
  );
};
