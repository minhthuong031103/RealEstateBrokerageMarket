'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import React from 'react';
// import * as z from 'zod';

// const formSchema = z.object({});
export const AddPostModal = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="w-full h-full">
      <Dialog open={open}>
        <DialogTrigger>
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            Đăng tin bất động sản{' '}
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full lg:w-[60%]" setIsOpen={setOpen}>
          <div>Đăng tin bất động sản</div>
          <div>hello</div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
