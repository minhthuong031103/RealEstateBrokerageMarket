/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useEffect } from 'react';
import { TinhTrangNoiThat, Huong, noiThat } from '@/lib/constant';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Select, SelectItem, Input, Checkbox } from '@nextui-org/react';
import { TbWashMachine } from 'react-icons/tb';
import { BsCompass } from 'react-icons/bs';
import { Button } from '@/components/ui/button';
import { FileDialog } from '@/components/ui/FileDialog';
import { ImageList } from '@/components/ui/ImageList';
import { DatePicker } from '@/components/ui/date-picker';
import { DanhSachTienNghi } from '../DanhSachTienNghi';

const canHoSchema = z.object({
  chieuDai: z.string().nonempty({ message: 'Chiều dài không được để trống' }),
  chieuRong: z.string().nonempty({ message: 'Chiều rộng không được để trống' }),
});

export const VanPhongForm = ({
  setNoiThat,
  setHuongCuaChinh,
  danhSachTienNghi,
  noiThatValue,
  huongCuaChinhValue,
  setDanhSachTienNghi,
}) => {
  const form = useForm<z.infer<typeof canHoSchema>>({
    resolver: zodResolver(canHoSchema),
  });
  const [selectedNoiThat, setSelectedNoiThat] = React.useState(new Set([]));
  const [noiThatTouched, setNoiThatTouched] = React.useState(false);
  const [selectedHuongCuaChinh, setSelectedHuongCuaChinh] = React.useState(
    new Set([])
  );
  const [cuaChinhTouched, setCuaChinhTouched] = React.useState(false);

  useEffect(() => {
    if (selectedNoiThat.size > 0) {
      const noiThatValueArray = Array.from(selectedNoiThat);
      setNoiThat(noiThatValueArray?.[0]);
    }
  }, [selectedNoiThat]);

  useEffect(() => {
    if (selectedHuongCuaChinh.size > 0) {
      const cuaChinhValueArray = Array.from(selectedHuongCuaChinh);
      setHuongCuaChinh(cuaChinhValueArray?.[0]);
    }
  }, [selectedHuongCuaChinh]);

  const isNoiThatValid = selectedNoiThat.size > 0;
  const isCuaChinhValid = selectedHuongCuaChinh.size > 0;

  return (
    <Form {...form}>
      <form className="flex flex-col space-y-6 w-full">
        <Select
          key={'noithat'}
          radius={'sm'}
          variant="bordered"
          label="Nội thất"
          isInvalid={isNoiThatValid || !noiThatTouched ? false : true}
          errorMessage={
            isNoiThatValid || !noiThatTouched ? '' : 'Vui lòng chọn nội thất'
          }
          autoFocus={false}
          placeholder="Chọn nội thất"
          selectedKeys={noiThatValue ? [noiThatValue] : []}
          onSelectionChange={setSelectedNoiThat}
          onClose={() => setNoiThatTouched(true)}
          className="w-full"
          startContent={<TbWashMachine className="w-3 h-3" />}
        >
          {TinhTrangNoiThat?.map((noithat) => (
            <SelectItem key={noithat.name} value={noithat.value}>
              {noithat.value.toString()}
            </SelectItem>
          ))}
        </Select>

        <Select
          key={'cuaChinh'}
          radius={'sm'}
          variant="bordered"
          label="Hướng cửa chính"
          isInvalid={isCuaChinhValid || !cuaChinhTouched ? false : true}
          errorMessage={
            isCuaChinhValid || !cuaChinhTouched
              ? ''
              : 'Vui lòng chọn hướng cửa chính'
          }
          autoFocus={false}
          placeholder="Chọn hướng cửa chính"
          selectedKeys={huongCuaChinhValue ? [huongCuaChinhValue] : []}
          onSelectionChange={setSelectedHuongCuaChinh}
          onClose={() => setCuaChinhTouched(true)}
          className="w-full"
          startContent={<BsCompass className="w-3 h-3" />}
        >
          {Huong?.map((noithat) => (
            <SelectItem key={noithat.value} value={noithat.value}>
              {noithat.value.toString()}
            </SelectItem>
          ))}
        </Select>
        <DanhSachTienNghi
          danhSachTienNghi={danhSachTienNghi}
          setDanhSachTienNghi={setDanhSachTienNghi}
        />
      </form>
    </Form>
  );
};
