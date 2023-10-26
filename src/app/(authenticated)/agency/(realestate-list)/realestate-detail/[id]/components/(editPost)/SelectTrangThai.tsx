'use client';

import {Select, SelectItem } from '@nextui-org/react';
import React, { useEffect } from 'react'

export const SelectTrangThai = ({
    setTrangThaiValue,
}) => {
    const [selectedTrangThai, setSelectedTrangThai] = React.useState(new Set([]));
    const [trangThaiTouched, setTrangThaiTouched] = React.useState(false);

    const trangthai = [
        {
            label: "Mở bài đăng", value: "Đã duyệt"
        },
        {
            label: "Khoá bài đăng", value: "Đã khoá"
        }];
    useEffect(() => {
        if (selectedTrangThai) {
            const trangThaiValueArray = Array.from(selectedTrangThai);
            setTrangThaiValue(trangThaiValueArray?.[0]);
        }
    }, [selectedTrangThai]);
    const isTrangThaiValid = selectedTrangThai.size > 0;
    return (
        <div className='flex flex-col h-full gap-y-6'>
            <div className='flex flex-row gap-2'>
                <Select
                    key={'trangthai'}
                    radius={'md'}
                    label="Trạng thái"
                    placeholder="Chọn trạng thái bài đăng"
                    selectedKeys={selectedTrangThai}
                    isInvalid={isTrangThaiValid || !trangThaiTouched ? false : true}
                    errorMessage={
                        isTrangThaiValid || !trangThaiTouched ? '' : 'Vui lòng chọn danh mục'
                    }
                    onSelectionChange={setSelectedTrangThai}
                    onClose={() => setTrangThaiTouched(true)}
                    className="max-w-xs">
                    {trangthai.map((trangthai) => (
                        <SelectItem key={trangthai.value} value={trangthai.value}>
                            {trangthai.label}
                        </SelectItem>
                    ))}
                </Select>
            </div>
        </div>
    )
}

