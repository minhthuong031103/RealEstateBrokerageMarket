import { Input } from "@nextui-org/react";
import { formatNumberWithCommas } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const GiaBan = ({ giaBan, setGiaBan }) => {
  const [displayValue, setDisplayValue] = useState();

  useEffect(() => {
    if (giaBan) {
      setDisplayValue(formatNumberWithCommas(giaBan));
    }
  }, [giaBan]);
  const handleInputChange = (e) => {
    const inputVal = e.target.value.replace(/[^0-9]/g, ""); // Only digits
    if (/^\d*$/.test(inputVal)) {
      setGiaBan(inputVal);
      setDisplayValue(formatNumberWithCommas(inputVal));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      <Input
        label="Giá bán"
        placeholder="Nhập giá bán"
        variant="bordered"
        radius="sm"
        isInvalid={giaBan !== "" ? false : true}
        errorMessage={`${giaBan !== "" ? "" : "Vui lòng nhập giá bán"}`}
        value={displayValue}
        onChange={handleInputChange}
      />
    </div>
  );
};
