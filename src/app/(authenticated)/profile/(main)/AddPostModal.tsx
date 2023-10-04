'use client';

import { Button } from '@/components/ui/button';

import React from 'react';
import { SelectAddress } from './SelectAddress';
import DialogCustom from '@/components/ui/dialogCustom';
// import * as z from 'zod';

// const formSchema = z.object({});
export const AddPostModal = () => {
  const [open, setOpen] = React.useState(false);
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
          className="w-full lg:w-[80%] h-[95%]"
          onClose={() => {
            setOpen(false);
          }}
          isModalOpen={open}
        >
          <SelectAddress />
        </DialogCustom>
      ) : null}
    </div>
  );
};
