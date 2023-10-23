'use client';

import React, { useEffect, useState } from 'react'
import { useBatDongSan } from "@/hooks/useBatDongSan";
import { Input, Textarea} from '@nextui-org/react';
import { SelectTrangThai } from './(edit)/SelectTrangThai';
// import { GiaBan } from './(edit)/GiaBan';
import { useBaiViet } from '@/hooks/useBaiViet';
import DialogCustom from '@/components/ui/dialogCustom';
import { Button } from '@/components/ui/button';
import { Spinner } from '@nextui-org/react';


export const EditForm = ({ id }) => {
    const { fetchBatDongSanTheoId } = useBatDongSan();
    const [trangThai, setTrangThai] = useState(new Set([]));
    const [chiTietBDS, setChiTietBDS] = useState();
    const [tieuDe, setTieuDe] = React.useState('');
    const [moTa, setMoTa] = React.useState('');
    const [diaChi, setDiaChi] = React.useState('');
    const [giaBan, setGiaBan] = React.useState('');
    // const [hinhThucBan, setHinhThucBan] = React.useState(new Set([]));
    const [isSubmitting, setIsSubmitting] = React.useState(false);


    const { onUpdateBaiViet } = useBaiViet();
    
    const onSubmit = async () => {
        const baiViet = {
            tieuDe: tieuDe,
            moTa: moTa,
            trangThai: trangThai,
            diaChi: diaChi,
            gia: giaBan,
        }
        setIsSubmitting(true);
        const success = await onUpdateBaiViet(id ,baiViet);
        if (success){
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
            setTieuDe(chiTietBDS.tieuDe);
            setMoTa(chiTietBDS.moTa);
            setDiaChi(chiTietBDS.diaChi);
            setTrangThai(chiTietBDS.trangThai);
            setGiaBan(chiTietBDS.gia);
        }
    }, [chiTietBDS]);

    return (
        <div className="grid-cols-1 grid gap-4 mb-6">
            <SelectTrangThai setTrangThaiValue={setTrangThai} />
            <Input value={tieuDe} label={"Tiêu đề"} onChange={(e) => setTieuDe(e.target.value)} />
            <Textarea value={moTa} label={"Mô tả"} onChange={(e) => setMoTa(e.target.value)} />
            <Input value={diaChi} label={"Địa chỉ"} onChange={(e) => setDiaChi(e.target.value)} />
            {/* <GiaBan giaBan={giaBan} setGiaBan={setGiaBan} /> */}
            <Input value={giaBan} label={"Giá bán"} onChange={(e) => setGiaBan(e.target.value)} />
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
              Yêu cầu tham gia chương trình đối tác đã được gửi thành công.
            </div>
          </div>
        </DialogCustom>
      )}
        </div>
    )
}

