import { Input } from "@nextui-org/react";
import React from "react";
import { Label } from "@/components/ui/label";

export const PhoneNumber = ({ phoneNumber, setPhoneNumber }) => {
  return (
    <div className="flex flex-col gap-3 w-full ">
      <Label className="font-bold text-sm">
        Số điện thoại <span className="text-red-500">*</span>
      </Label>
      <Input
        isInvalid={phoneNumber !== "" ? false : true}
        errorMessage={`${
          phoneNumber !== "" ? "" : "Vui lòng nhập số điện thoại"
        }`}
        className="w-full "
        radius="sm"
        variant="bordered"
        size="md"
        value={phoneNumber}
        label="Điện thoại"
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
      />
    </div>
  );
};
