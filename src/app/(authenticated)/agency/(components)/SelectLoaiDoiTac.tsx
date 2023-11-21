"use client";

import { Select, SelectItem } from "@nextui-org/react";
import React, { useEffect } from "react";

export const SelectLoaiDoiTac = ({ setLoaiDoiTacValue }) => {
  const [selectedLoaiDoiTac, setSelectedLoaiDoiTac] = React.useState(
    new Set([])
  );
  const [loaiDoiTacTouched, setLoaiDoiTacTouched] = React.useState(false);

  const loaidoitac = [
    {
      label: "Cá nhân",
      value: "canhan",
    },
    {
      label: "Doanh nghiệp",
      value: "doanhnghiep",
    },
  ];

  useEffect(() => {
    if (selectedLoaiDoiTac) {
      const doiTacValueArray = Array.from(selectedLoaiDoiTac);
      setLoaiDoiTacValue(doiTacValueArray?.[0]);
    }
  }, [selectedLoaiDoiTac]);
  const isLoaiDoiTacValid = selectedLoaiDoiTac.size > 0;
  return (
    <div className="flex flex-col h-full gap-y-6">
      <div className="flex flex-row gap-2">
        <Select
          key={"loaidoitac"}
          radius={"sm"}
          variant={"bordered"}
          label="Loại đối tác"
          placeholder="Chọn loại đối tác"
          selectedKeys={selectedLoaiDoiTac}
          isInvalid={isLoaiDoiTacValid || !loaiDoiTacTouched ? false : true}
          errorMessage={
            isLoaiDoiTacValid || !loaiDoiTacTouched
              ? ""
              : "Vui lòng chọn danh mục"
          }
          onSelectionChange={setSelectedLoaiDoiTac}
          onClose={() => setLoaiDoiTacTouched(true)}
          className="w-full"
        >
          {loaidoitac.map((loaidoitac) => (
            <SelectItem key={loaidoitac.value} value={loaidoitac.value}>
              {loaidoitac.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};
