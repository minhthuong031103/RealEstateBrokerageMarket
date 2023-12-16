/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { SelectNoiThat } from "../SelectNoiThat";
import { HuongCanHo } from "./HuongCanHo";
import { FileDialog } from "@/components/ui/FileDialog";
import { ImageList } from "@/components/ui/ImageList";
import { DatePicker } from "@/components/ui/date-picker";

const canHoSchema = z.object({
  chieuDai: z.string().nonempty({ message: "Chiều dài không được để trống" }),
  chieuRong: z.string().nonempty({ message: "Chiều rộng không được để trống" }),
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
  phongNguValue,
  phongTamValue,
  soTangValue,
  noiThatValue,
  huongBanCongValue,
  huongCuaChinhValue,
  setDeletedImageBanVeThietKeFiles,
}) => {
  const form = useForm<z.infer<typeof canHoSchema>>({
    resolver: zodResolver(canHoSchema),
  });
  return (
    <Form {...form}>
      <form className="flex flex-col space-y-6 w-full">
        <SelectNoiThat
          setPhongNgu={setPhongNgu}
          setPhongTam={setPhongTam}
          setNoiThat={setNoiThat}
          setSoTang={setSoTang}
          phongNguValue={phongNguValue}
          phongTamValue={phongTamValue}
          soTangValue={soTangValue}
          noiThatValue={noiThatValue}
          danhSachTienNghi={danhSachTienNghi}
          setDanhSachTienNghi={setDanhSachTienNghi}
          loaiHinh={"Căn hộ"}
        />
        <div className="flex flex-col space-y-3">
          <div className="font-bold text-sm"> Bản vẽ thiết kế</div>
          <div className="h-44 w-full overflow-hidden rounded-md flex justify-center">
            <ImageList
              className={"w-64 h-44 border-1 border-gray-400 rounded-md"}
              files={banVeThietKe}
              height={44}
              width={64}
            />
          </div>
          <FileDialog
            setDeletedImage={setDeletedImageBanVeThietKeFiles}
            name="images"
            maxFiles={1}
            maxSize={1024 * 1024 * 4}
            files={banVeThietKe}
            setFiles={setBanVeThietKe}
            disabled={false}
            className="mb-3"
          />
        </div>

        <HuongCanHo
          huongBanCongValue={huongBanCongValue}
          huongCuaChinhValue={huongCuaChinhValue}
          setHuongBanCong={setHuongBanCong}
          setHuongCuaChinh={setHuongCuaChinh}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DatePicker
            date={suaChuaLanCuoi}
            setDate={setSuaChuaLanCuoi}
            label={"Sửa chữa lần cuối"}
          />

          <DatePicker
            date={hoanThanh}
            setDate={setHoanThanh}
            label={"Hoàn thành"}
          />
        </div>
      </form>
    </Form>
  );
};
