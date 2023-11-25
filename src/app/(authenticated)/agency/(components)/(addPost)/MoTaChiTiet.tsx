import { Chip, Textarea } from "@nextui-org/react";
import React from "react";
import { Label } from "@/components/ui/label";
import { Card, CardBody } from "@nextui-org/react";

export const MoTaChiTiet = ({ moTa, setMota }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Label className="font-bold text-sm">
        Mô tả chi tiết <span className="text-red-500">*</span>
      </Label>
      <Card>
        <CardBody>
          <Chip className="bg-red-400 text-slate-900">Không cho phép:</Chip>
          <p className="text-[12px] ">- Sản phẩm cấm, hạn chế hoặc giả/nhái.</p>
          <p className="text-[12px]">- Sử dụng các từ ngữ không phù hợp.</p>
          <p className="text-[12px]">
            - Thông tin trùng lặp với tin đăng đang hiển thị.
          </p>
          <p className="text-[12px]">
            - Chứa số điện thoại và website, các thông tin liên hệ khác.
          </p>
        </CardBody>
      </Card>

      <Textarea
        isInvalid={moTa !== "" ? false : true}
        errorMessage={`${moTa !== "" ? "" : "Vui lòng nhập mô tả"}`}
        variant="bordered"
        className="w-full"
        radius="sm"
        minRows={10}
        maxRows={10}
        value={moTa}
        placeholder="Nhập mô tả chi tiết"
        onChange={(e) => {
          setMota(e.target.value);
        }}
      />
    </div>
  );
};
