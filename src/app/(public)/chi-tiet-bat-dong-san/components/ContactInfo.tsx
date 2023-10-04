"use client";

import { Button } from "@/components/ui/button";

export function ContactInfo() {
  return (
    <div className="lg:basis-1/4 h-[380px] sm:h-[380px] lg:h-full rounded-md bg-white border-[1px] shadow p-6">
      <div className="font-semibold text-[24px]">Đăng bởi</div>
      <div className="flex flex-row lg:flex-col gap-4 mt-4">
        <img
          src="https://th.bing.com/th/id/OIP.WNPZIo0CFhZyiTSnrQ1uTQHaEl?pid=ImgDet&rs=1"
          className="rounded-md h-[180px] w-[180px] lg:w-[90px] lg:h-[90px]"
        />
        <div>
          <div className="font-semibold text-[16px] mt-4">Tên đối tác</div>
          <div className="text-[14px] mt-2 overflow-hidden h-[100px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            neque harum quod labore suscipit quibusdam sed maiores aliquid et
            laborum officia est odio, vitae sequi! Veritatis quidem labore quas
            laborum!
          </div>
        </div>
      </div>
      <div className="text-[14px] mt-4 text-gray-400">Địa chỉ</div>
      <Button className="mt-4 w-[94%] lg:w-[50%]">Liên hệ</Button>
    </div>
  );
}
