'use client';

import { Button } from '@/components/ui/button';

import React from 'react';
import DialogCustom from '@/components/ui/dialogCustom';
// import { Label } from '@/components/ui/label';
import { SelectDanhMuc } from './SelectDanhMuc';
import { BaiVietForm } from './(addPost)/BaiVietForm';
// import * as z from 'zod';

// const formSchema = z.object({});
export const AddPostModal = ({ subscribedPlan, user, currentlyPlan }) => {
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
          className="w-full lg:w-[60%] h-[80%] lg:h-[95%] flex items-center justify-center"
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
            <div className="flex flex-row justify-between items-center">
              <div className="text-lg font-bold">Đăng tin bất động sản</div>
              <div className="text-sm font-bold text-gray-400">
                {user?.name}
              </div>
            </div>
            <div className="w-full h-full">
              <div className="mx-auto mb-10 sm:max-w-lg ">
                {currentlyPlan?.isSubscribed ? (
                  <p>
                    Bạn hiện đang đăng ký gói{' '}
                    <span className="font-bold">{subscribedPlan?.name}</span>.
                  </p>
                ) : (
                  <p>
                    Bạn chưa đăng ký gói nào. Hãy đăng ký ngay để trải nghiệm
                    tất cả các tính năng của UIT Estate
                  </p>
                )}
                <p>
                  Bạn hiện có <span className="font-bold"> {user?.luot}</span>{' '}
                  lượt đăng bài viết.
                </p>
                <p>
                  Bạn hiện có{' '}
                  <span className="font-bold"> {user?.luotChuyenNghiep}</span>{' '}
                  lượt đăng bài viết <span className="font-bold"> Nổi bật</span>
                  .
                </p>
                <p>
                  Bạn hiện có{' '}
                  <span className="font-bold"> {user?.luotVip}</span> lượt đăng
                  bài viết <span className="font-bold"> Yêu thích</span>.
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <div className="font-bold text-sm">Thông tin chung</div>
              <SelectDanhMuc
                setThue={setThue}
                setBan={setBan}
                thue={thue}
                ban={ban}
                setDanhMucValue={setDanhMucValue}
              />
            </div>

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
