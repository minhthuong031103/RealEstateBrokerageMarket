"use client";

import { useBatDongSan } from "@/hooks/useBatDongSan";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdArrowRight } from "react-icons/md";

const CURRENCY_FORMAT = new Intl.NumberFormat(undefined, {
  currency: "VND",
  style: "currency",
});
export function formatCurrency(value: number) {
  return CURRENCY_FORMAT.format(value);
}
export const CacLoaiHinhBatDongSan = () => {
  const [listLoaiHinh, setListLoaiHinh] = useState([]);
  const { fetchAllDanhMuc } = useBatDongSan();
  useEffect(() => {
    const getDanhMuc = async () => {
      await fetchAllDanhMuc().then((data) => {
        setListLoaiHinh(data);
      });
    };
    getDanhMuc();
  }, []);

  const countBaiViet = (index) => {
    return listLoaiHinh[index]?.loaiHinhs?.length;
  };
  return (
    <div className="p-8 mr-6 rounded-xl bg-white border-[1px] shadow-sm space-y-4">
      <div>Danh mục bất động sản</div>
      <div className="flex flex-col gap-4">
        {listLoaiHinh?.map((item, index) => (
          <Link
            href={`/bat-dong-san/loai-hinh-bat-dong-san/${
              item?.name === "Căn hộ"
                ? "1"
                : item?.name === "Đất"
                ? "2"
                : item?.name === "Nhà ở"
                ? "3"
                : "4"
            }`}
          >
            <div className="flex flex-row flex-wrap justify-between hover:text-red-500 text-sm">
              <div className="flex flex-row gap-1">
                <MdArrowRight className="text-xl" />
                <div>{item?.name}</div>
              </div>
              <div className="text-neutral-800 ">
                {countBaiViet(index)}
                {" loại hình"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
