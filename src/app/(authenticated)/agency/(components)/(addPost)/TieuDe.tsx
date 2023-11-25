import { Chip, Textarea } from "@nextui-org/react";
import React from "react";
import { Label } from "@/components/ui/label";
import { Card, CardBody } from "@nextui-org/react";

export const TieuDe = ({ tieuDe, setTieuDe }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Label className="font-bold text-sm">
        Tiêu đề <span className="text-red-500">*</span>
      </Label>
      <Card>
        <CardBody>
          <Chip className="bg-[#ccaaee] text-slate-900">
            Một tiêu đề tốt nên có:
          </Chip>
          <p className="text-[12px] ">
            Loại bất động sản + Diện tích + Tên dự án/Tên đường, Quận
          </p>
          <p className="text-[12px]">
            Ví dụ: Nhà mặt tiền 120m2 đường Nguyễn Văn Linh, Quận 7, TP.HCM
          </p>
        </CardBody>
      </Card>

      <Textarea
        isInvalid={tieuDe !== "" ? false : true}
        errorMessage={`${tieuDe !== "" ? "" : "Vui lòng nhập tiêu đề"}`}
        variant="bordered"
        className="w-full"
        radius="sm"
        minRows={2}
        maxRows={2}
        value={tieuDe}
        placeholder="Nhập tiêu đề bài viết"
        onChange={(e) => {
          setTieuDe(e.target.value);
        }}
      />
    </div>
  );
};
