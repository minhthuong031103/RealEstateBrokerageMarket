"use client";

import { Input } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";
import { Slider } from "@/components/ui/slider";

type props = {
  range: number[];
  setRange: Dispatch<SetStateAction<number[]>>;
  type: string;
};
export const RangeSelector = ({ range, setRange, type }: props) => {
  return (
    <div className="flex flex-col gap-4 my-2">
      <div>
        {type}
        {" Đơn vị: "}
        {type === "Phạm vi giá thành" ? (
          "VNĐ"
        ) : (
          <>
            m<sup>2</sup>
          </>
        )}
      </div>
      {type === "Phạm vi giá thành" ? (
        <Slider
          defaultValue={range}
          max={10000000000}
          min={0}
          step={100000000}
          value={range}
          onValueChange={(e) => {
            setRange(e);
          }}
        />
      ) : (
        <Slider
          defaultValue={range}
          max={5000}
          min={0}
          step={50}
          value={range}
          onValueChange={(e) => {
            setRange(e);
          }}
        />
      )}
      <div className="flex flex-row justify-between gap-x-4">
        <Input
          variant="bordered"
          radius="sm"
          type={"number"}
          className="h-[52px]"
          value={range[0].toString()}
          onChange={(e) => setRange([e.target.valueAsNumber, range[1]])}
        />
        <div className="h-[48px] grid content-center">-</div>
        <Input
          variant="bordered"
          radius="sm"
          type={"number"}
          className="h-[52px]"
          value={range[1].toString()}
          onChange={(e) => setRange([range[0], e.target.valueAsNumber])}
        />
      </div>
    </div>
  );
};
