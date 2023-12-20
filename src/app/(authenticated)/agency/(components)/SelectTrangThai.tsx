'use client';

import { Select, SelectItem } from '@nextui-org/react';
import React, { useEffect } from 'react';

export const SelectTrangThai = ({ setTrangThaiValue }) => {
  const [selectedTrangThai, setSelectedTrangThai] = React.useState(new Set([]));

  const trangthai = [
    {
      label: 'Tất cả',
      value: '',
    },
    {
      label: 'Đã duyệt',
      value: 'da_duyet',
    },
    {
      label: 'Đã khoá',
      value: 'da_khoa',
    },
    {
      label: 'Chờ duyệt',
      value: 'cho_duyet',
    },
    {
      label: 'Không duyệt',
      value: 'khong_duyet',
    },
  ];
  useEffect(() => {
    if (selectedTrangThai) {
      const trangThaiValueArray = Array.from(selectedTrangThai);
      setTrangThaiValue(trangThaiValueArray?.[0]);
    }
  }, [selectedTrangThai]);

  return (
    <div className='"w-full md:w-[480px] mb-2 md:mb-0'>
      <div className="flex flex-row gap-2">
        <Select
          key={'trangthai'}
          radius={'sm'}
          variant="bordered"
          label={'Trạng thái'}
          placeholder="Tìm kiếm dựa trên trạng thái bài đăng"
          selectedKeys={selectedTrangThai}
          onSelectionChange={setSelectedTrangThai}
          className="w-full md:max-w-xs"
        >
          {trangthai.map((trangthai) => (
            <SelectItem key={trangthai.value} value={trangthai.value}>
              {trangthai.label}
            </SelectItem>
          ))}
        </Select>
      </div>
    </div>
  );
};
