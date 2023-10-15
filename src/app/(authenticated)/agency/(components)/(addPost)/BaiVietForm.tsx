/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React from 'react';
import { SelectAddress } from './SelectAddress';
import { LoaiHinh } from './LoaiHinh';
import { CanHoForm } from './(canho)/CanHoForm';
import { DienTich } from './DienTich';
import { GiayToPhapLy } from './GiayToPhapLy';
import { GiaBan } from './GiaBan';
import { TieuDe } from './TieuDe';
import { MoTaChiTiet } from './MoTaChiTiet';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useBaiViet } from '@/hooks/useBaiViet';
import { VideoUploader } from '@/components/videoUpload/VideoUploader';

export const BaiVietForm = ({ danhMucValue, isChoThue }) => {
  const [addressValue, setAddressValue] = React.useState('');
  const [loaiHinhValue, setLoaiHinhValue] = React.useState(null);
  const [chieuDai, setChieuDai] = React.useState();
  const [chieuRong, setChieuRong] = React.useState();
  const [phapLy, setPhapLy] = React.useState(null);
  const [giaBan, setGiaBan] = React.useState();
  const [tieuDe, setTieude] = React.useState();
  const [moTa, setMoTa] = React.useState();
  const [phongNgu, setPhongNgu] = React.useState();
  const [phongTam, setPhongTam] = React.useState();
  const [noiThat, setNoiThat] = React.useState();
  const [huongBanCong, setHuongBanCong] = React.useState();
  const [huongCuaChinh, setHuongCuaChinh] = React.useState();
  const [soTang, setSoTang] = React.useState();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isInValid, setIsInValid] = React.useState(false);

  const { onCreateBaiViet } = useBaiViet();

  const onSubmit = async () => {
    if (
      !addressValue ||
      !loaiHinhValue ||
      !chieuDai ||
      !chieuRong ||
      !phapLy ||
      !giaBan ||
      !tieuDe ||
      !moTa
    ) {
      toast.error('Vui lòng nhập đầy đủ thông tin ');
      return;
    }
    if (danhMucValue === 'Căn hộ') {
      if (
        !phongNgu ||
        !phongTam ||
        !noiThat ||
        !huongBanCong ||
        !huongCuaChinh ||
        !soTang
      ) {
        toast.error('Vui lòng nhập đầy đủ thông tin');
        return;
      }
    }

    const baiViet = {
      diaChi: addressValue,
      loaiHinh: loaiHinhValue,
      chieuDai: parseFloat(chieuDai),
      chieuRong: parseFloat(chieuRong),
      dienTich: chieuDai * chieuRong,
      tinhTrangPhapLy: phapLy,
      nhan: 'Test',
      gia: parseFloat(giaBan),
      tieuDe: tieuDe,
      moTa: moTa,
      soPhongNgu: phongNgu ? parseInt(phongNgu) : null,
      soPhongTam: phongTam ? parseInt(phongTam) : null,
      tinhTrangNoiThat: noiThat,
      huongBanCong: huongBanCong,
      hoanThanh: new Date(),
      suaChuaLanCuoi: new Date(),
      huongCuaChinh: huongCuaChinh,
      soTang: soTang ? parseInt(soTang) : null,
      isChoThue,
    };

    await onCreateBaiViet(baiViet);
  };
  return (
    <div className="w-full h-full flex flex-col space-y-6">
      <SelectAddress
        setAddressValue={setAddressValue}
        addressValue={addressValue}
      />
      <LoaiHinh
        danhMucValue={danhMucValue}
        setLoaiHinhValue={setLoaiHinhValue}
      />
      <DienTich
        chieuDai={chieuDai}
        chieuRong={chieuRong}
        setChieuDai={setChieuDai}
        setChieuRong={setChieuRong}
      />
      <GiayToPhapLy setPhapLy={setPhapLy} />

      {/* <CanHoForm /> */}
      <CanHoForm
        setHuongBanCong={setHuongBanCong}
        setHuongCuaChinh={setHuongCuaChinh}
        setNoiThat={setNoiThat}
        setPhongNgu={setPhongNgu}
        setPhongTam={setPhongTam}
        setSoTang={setSoTang}
      />
      {/* <CanHoForm /> */}

      <GiaBan giaBan={giaBan} setGiaBan={setGiaBan} />
      <TieuDe tieuDe={tieuDe} setTieuDe={setTieude} />
      <MoTaChiTiet moTa={moTa} setMota={setMoTa} />
      <VideoUploader />
      <div className="w-full flex items-center justify-center pt-10">
        <Button
          onClick={() => {
            onSubmit();
          }}
          className="w-[50%]"
        >
          Đăng bài
        </Button>
      </div>
    </div>
  );
};
