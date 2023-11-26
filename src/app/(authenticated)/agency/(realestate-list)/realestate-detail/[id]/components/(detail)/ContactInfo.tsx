'use client';

import { Button } from '@/components/ui/button';
import { AiOutlinePhone } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import { IoLocationOutline, IoStorefrontOutline } from 'react-icons/io5';

export function ContactInfo({ doiTacInfo, nhan }) {
  return (
    <div className="lg:basis-1/4 h-fit rounded-md bg-white border-[1px] shadow p-6">
      <div className="font-semibold text-[24px] text-slate-800 w-full text-center">
        Đăng bởi
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <img
          src={doiTacInfo?.avatar}
          className="rounded-md h-[270px] w-full lg:h-[180px] object-cover"
        />
        <div>
          <div className="font-semibold text-[16px] mt-4 text-slate-800">
            {doiTacInfo?.name}
          </div>
          <div className="text-[14px] mt-2 overflow-hidden text-slate-800">
            <div className="flex flex-row gap-2 text-red-400">
              <IoStorefrontOutline className="py-auto" />
              {doiTacInfo?.anhGiayPhepKinhDoanh ? 'Doanh nghiệp' : 'Cá nhân'}
            </div>
            <div className="flex flex-row gap-2">
              <AiOutlinePhone className="py-auto" />
              {doiTacInfo?.phoneNumber}
            </div>
            <div className="flex flex-row gap-2">
              <HiOutlineMail />
              {doiTacInfo?.email}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-2 text-[14px] mt-1 text-gray-400">
        <IoLocationOutline className="text-[28px]" />
        {doiTacInfo?.diaChi}
      </div>
      {nhan === 'Hoàn thành' ? (
        <p className="text-sm mt-4 w-full font-semibold text-emerald-500">
          Bất động sản đã hoàn thành giao dịch
        </p>
      ) : (
        <Button className="mt-4 w-[94%] lg:w-[50%] bg-red-400">Liên hệ</Button>
      )}
    </div>
  );
}
