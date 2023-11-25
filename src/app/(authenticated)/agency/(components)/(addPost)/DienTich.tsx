import { formatNumberWithCommas } from "@/lib/utils";
import { Input } from "@nextui-org/react";
import React from "react";
import { TbArrowAutofitHeight, TbArrowAutofitWidth } from "react-icons/tb";
import { LiaPencilRulerSolid } from "react-icons/lia";

export const DienTich = ({
  chieuDai,
  chieuRong,
  setChieuDai,
  setChieuRong,
}) => {
  return (
    <div className="flex flex-col space-y-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full ">
        <Input
          label="Chiều dài"
          placeholder="Chiều dài"
          isInvalid={chieuDai !== "" ? false : true}
          variant="bordered"
          radius="sm"
          errorMessage={`${chieuDai !== "" ? "" : "Vui lòng nhập chiều dài"}`}
          value={chieuDai}
          startContent={<TbArrowAutofitHeight className="w-3 h-3" />}
          onChange={(e) => {
            if (/^\d*$/.test(e.target.value)) {
              setChieuDai(e.target.value);
            }
          }}
        />

        <Input
          isInvalid={chieuRong !== "" ? false : true}
          variant="bordered"
          radius="sm"
          errorMessage={`${chieuRong !== "" ? "" : "Vui lòng nhập chiều rộng"}`}
          label="Chiều rộng"
          placeholder="Chiều rộng"
          value={chieuRong}
          startContent={<TbArrowAutofitWidth className="w-3 h-3" />}
          onChange={(e) => {
            if (/^\d*$/.test(e.target.value)) {
              setChieuRong(e.target.value);
            }
          }}
        />
      </div>
      <Input
        isReadOnly
        variant="bordered"
        radius="sm"
        className="w-full"
        label="Diện tích"
        startContent={<LiaPencilRulerSolid className="w-3 h-3" />}
        value={
          Number(chieuDai) * Number(chieuRong)
            ? `${formatNumberWithCommas(
                `${Number(chieuDai) * Number(chieuRong)}`
              )}  m² `
            : ""
        }
        placeholder="Diện tích"
      />
    </div>
  );
};
