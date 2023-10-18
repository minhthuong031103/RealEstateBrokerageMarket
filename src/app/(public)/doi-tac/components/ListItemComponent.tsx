"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const CURRENCY_FORMAT = new Intl.NumberFormat(undefined, {
  currency: "VND",
  style: "currency",
});
export function formatCurrency(value: number) {
  return CURRENCY_FORMAT.format(value);
}
export function ListItemComponent({ item }) {
  return (
    <Link href={`/doi-tac/${item?.id}`}>
      <Card className="hover:shadow-2xl transition ease-in-out duration-200 hover:scale-[1.01] h-full">
        <CardContent>
          <div className="mt-6 rounded-sm relative">
            <div className="lg:h-[180px] xl:h-[200px] md:h-[480px] h-[280px]">
              <img
                src={item?.avatar}
                className="w-full rounded-md lg:h-[180px] xl:h-[200px] md:h-[480px] h-[280px]"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div className="mt-6 space-y-2 mb-6">
            <div className="font-medium text-[20px]">{item?.name}</div>
            <div className="text-red-400 text-sm">Cá nhân hoặc công ty</div>
            <div className="text-neutral-600 text-sm">
              Địa chỉ: {item?.diaChi}
            </div>
            <div className="text-neutral-600 text-sm">
              Điện thoại: {item?.phoneNumber}
            </div>
            <div className="text-neutral-600 text-sm">Email: {item?.email}</div>
          </div>
          <Separator />
        </CardContent>
        <CardFooter className="flex justify-start flex-wrap gap-x-2">
          <div className="text-red-400 text-sm flex flex-row">
            Xem danh sách{" "}
            <MdOutlineKeyboardArrowRight className="h-[24px] grid content-center" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
