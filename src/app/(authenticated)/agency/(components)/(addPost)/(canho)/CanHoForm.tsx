/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { SelectNoiThat } from '../SelectNoiThat';
import { HuongCanHo } from './HuongCanHo';
import { Button } from '@/components/ui/button';
import { FileDialog } from '@/components/ui/FileDialog';
import { ImageList } from '@/components/ui/ImageList';
import { DatePicker } from '@/components/ui/date-picker';

const canHoSchema = z.object({
  chieuDai: z.string().nonempty({ message: 'Chiều dài không được để trống' }),
  chieuRong: z.string().nonempty({ message: 'Chiều rộng không được để trống' }),
});

export const CanHoForm = ({
  setPhongNgu,
  setPhongTam,
  setNoiThat,
  setHuongBanCong,
  setHuongCuaChinh,
  setSoTang,
  banVeThietKe,
  setBanVeThietKe,
  suaChuaLanCuoi,
  setSuaChuaLanCuoi,
  hoanThanh,
  setHoanThanh,
  danhSachTienNghi,
  setDanhSachTienNghi,
}) => {
  const form = useForm<z.infer<typeof canHoSchema>>({
    resolver: zodResolver(canHoSchema),
  });
  console.log(form);
  return (
    <Form {...form}>
      <form className="flex flex-col space-y-6 max-w-xs lg:max-w-lg">
        <SelectNoiThat
          setPhongNgu={setPhongNgu}
          setPhongTam={setPhongTam}
          setNoiThat={setNoiThat}
          setSoTang={setSoTang}
          danhSachTienNghi={danhSachTienNghi}
          setDanhSachTienNghi={setDanhSachTienNghi}
        />
        <div className="flex flex-col space-y-3">
          <div className="font-bold text-sm"> Bản vẽ thiết kế</div>
          <FileDialog
            name="images"
            maxFiles={8}
            maxSize={1024 * 1024 * 4}
            files={banVeThietKe}
            setFiles={setBanVeThietKe}
            disabled={false}
            className="mb-3"
          />
          {banVeThietKe?.length ? (
            <ImageList
              className={'w-full h-36'}
              files={banVeThietKe}
              height={32}
              width={32}
            />
          ) : null}
        </div>

        <HuongCanHo
          setHuongBanCong={setHuongBanCong}
          setHuongCuaChinh={setHuongCuaChinh}
        />

        <DatePicker
          date={suaChuaLanCuoi}
          setDate={setSuaChuaLanCuoi}
          label={'Sửa chữa lần cuối'}
        />

        <DatePicker
          date={hoanThanh}
          setDate={setHoanThanh}
          label={'Hoàn thành'}
        />
      </form>
    </Form>
  );
};
