'use client';

import React, { useEffect, useState } from 'react'
import { useBatDongSan } from "@/hooks/useBatDongSan";
import { Input, Textarea } from '@nextui-org/react';
import { useBaiViet } from '@/hooks/useBaiViet';
import DialogCustom from '@/components/ui/dialogCustom';
import { Button } from '@/components/ui/button';
import { Spinner } from '@nextui-org/react';
// import { LoaiHinh } from '@/app/(authenticated)/agency/(components)/(addPost)/LoaiHinh';
import { DienTich } from '@/app/(authenticated)/agency/(components)/(addPost)/DienTich';
import { SelectDanhMuc } from '@/app/(authenticated)/agency/(components)/SelectDanhMuc';
import { GiaBan } from '@/app/(authenticated)/agency/(components)/(addPost)/GiaBan';

export const EditForm = ({ id }) => {
  const { fetchBatDongSanTheoId } = useBatDongSan();
  const [chiTietBDS, setChiTietBDS] = useState();
  const [tieuDe, setTieuDe] = React.useState('');
  const [moTa, setMoTa] = React.useState('');
  const [diaChi, setDiaChi] = React.useState('');
  const [giaBan, setGiaBan] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [chieuDai, setChieuDai] = React.useState();
  const [chieuRong, setChieuRong] = React.useState();
  // const [phapLy, setPhapLy] = React.useState(null);
  // const [phongNgu, setPhongNgu] = React.useState();
  // const [phongTam, setPhongTam] = React.useState();
  // const [noiThat, setNoiThat] = React.useState();
  // const [huongBanCong, setHuongBanCong] = React.useState();
  // const [huongCuaChinh, setHuongCuaChinh] = React.useState();
  // const [soTang, setSoTang] = React.useState();
  // const [suaChuaLanCuoi, setSuaChuaLanCuoi] = React.useState();
  // const [hoanThanh, setHoanThanh] = React.useState();
  // const [danhSachTienNghi, setDanhSachTienNghi] = React.useState([]);
  const [danhMucValue, setDanhMucValue] = React.useState(null);
  const [thue, setThue] = React.useState(false);
  const [ban, setBan] = React.useState(false);


  const { onUpdateBaiViet } = useBaiViet();

  const onSubmit = async () => {
    const baiViet = {
      tieuDe: tieuDe,
      moTa: moTa,
      trangThai: 'Chờ duyệt',
      diaChi: diaChi,
      gia: giaBan,
      danhMucValue: danhMucValue,
    }
    setIsSubmitting(true);
    const success = await onUpdateBaiViet(id, baiViet);
    if (success) {
      console.log("Thay đổi thông tin bài viết thành công");
    }
  }


  useEffect(() => {
    const getBatDongSan = async () => {
      await fetchBatDongSanTheoId(id).then((data) => {
        setChiTietBDS(data[0]);
      });
    };
    getBatDongSan();
  }, []);



  useEffect(() => {
    if (chiTietBDS) {
      console.log(chiTietBDS);
      setTieuDe(chiTietBDS.tieuDe);
      setMoTa(chiTietBDS.moTa);
      setDiaChi(chiTietBDS.diaChi);
      setChieuDai(chiTietBDS.chieuDai);
      setChieuRong(chiTietBDS.chieuRong);
    }
  }, [chiTietBDS]);

  return (
    <div className="grid-cols-1 grid gap-4 mb-6">
      {/* <SelectTrangThai setTrangThaiValue={setTrangThai} /> */}
      <Input value={tieuDe} label={"Tiêu đề"} onChange={(e) => setTieuDe(e.target.value)} />
      <Textarea value={moTa} label={"Mô tả"} onChange={(e) => setMoTa(e.target.value)} />
      <Input value={diaChi} label={"Địa chỉ"} onChange={(e) => setDiaChi(e.target.value)} />
      <DienTich
        chieuDai={chieuDai}
        chieuRong={chieuRong}
        setChieuDai={setChieuDai}
        setChieuRong={setChieuRong}
      />

      <SelectDanhMuc
        setThue={setThue}
        setBan={setBan}
        thue={thue}
        ban={ban}
        setDanhMucValue={setDanhMucValue}
      />

      <GiaBan giaBan={giaBan} setGiaBan={setGiaBan} />

      <div className="w-full flex items-center justify-center pt-10">
        <Button
          disabled={isSubmitting}
          onClick={() => {
            onSubmit();
          }}
          className="w-[50%]"
        >
          Lưu thông tin
        </Button>
      </div>
      {isSubmitting && (
        <DialogCustom
          className="w-[90%] lg:w-[50%] h-fit items-center justify-center"
          isModalOpen={isSubmitting}
          notShowClose={true}
        >
          <div className="flex flex-col gap-3 items-center justify-center">
            <Spinner size="lg" />
            <div className="text-center font-semibold text-xs sm:text-sm">
              Cập nhật thông tin bất động sản thành công
            </div>
          </div>
        </DialogCustom>
      )}
    </div>
  )
}

