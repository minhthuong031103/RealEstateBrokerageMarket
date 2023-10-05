/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React from 'react';
import { SelectAddress } from './SelectAddress';
import { LoaiHinh } from './LoaiHinh';
import { useForm } from 'react-hook-form';
import { CanHoForm } from './(canho)/CanHoForm';
import { DienTich } from './DienTich';
import { GiayToPhapLy } from './GiayToPhapLy';
import { GiaBan } from './GiaBan';
import { TieuDe } from './TieuDe';
import { MoTaChiTiet } from './MoTaChiTiet';

export const BaiVietForm = ({ danhMucValue }) => {
  const { control, handleSubmit } = useForm();
  const [addressValue, setAddressValue] = React.useState('');
  const [loaiHinhValue, setLoaiHinhValue] = React.useState(null);
  const [chieuDai, setChieuDai] = React.useState();
  const [chieuRong, setChieuRong] = React.useState();
  const [phapoLy, setPhapLy] = React.useState(null);
  const [giaBan, setGiaBan] = React.useState();
  const [tieuDe, setTieude] = React.useState();
  const [moTa, setMoTa] = React.useState();
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
      <CanHoForm />
      <GiaBan giaBan={giaBan} setGiaBan={setGiaBan} />
      <TieuDe tieuDe={tieuDe} setTieuDe={setTieude} />
      <MoTaChiTiet moTa={moTa} setMota={setMoTa} />
    </div>
  );
};
