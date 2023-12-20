'use client';

import { Select, SelectItem } from '@nextui-org/react';
import React, { useEffect } from 'react';

export const SelectTinhTrangList = ({ setTrangThaiValue, onSubmit }) => {
  const [selectedTrangThai, setSelectedTrangThai] = React.useState(new Set([]));
  const [trangThaiTouched, setTrangThaiTouched] = React.useState(false);

  console.log(trangThaiTouched);
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
      onSubmit();
    }
  }, [selectedTrangThai]);

  return (
    <div className='"w-full md:w-[480px] mb-2 md:mb-0'>
      <div className="flex flex-row gap-2">
        <Select
          key={'trangthai'}
          radius={'md'}
          label={'Trạng thái'}
          placeholder="Tìm kiếm dựa trên trạng thái bài đăng"
          selectedKeys={selectedTrangThai}
          onSelectionChange={setSelectedTrangThai}
          onClose={() => setTrangThaiTouched(true)}
          className="max-w-xs"
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
