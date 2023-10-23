/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useEffect, useState } from 'react';
import { useBatDongSan } from '@/hooks/useBatDongSan';
import { Input, Textarea } from '@nextui-org/react';
import { useBaiViet } from '@/hooks/useBaiViet';
import DialogCustom from '@/components/ui/dialogCustom';
import { Button } from '@/components/ui/button';
import { Spinner } from '@nextui-org/react';
// import { LoaiHinh } from '@/app/(authenticated)/agency/(components)/(addPost)/LoaiHinh';
import { DienTich } from '@/app/(authenticated)/agency/(components)/(addPost)/DienTich';
import { SelectDanhMuc } from '@/app/(authenticated)/agency/(components)/SelectDanhMuc';
import { GiaBan } from '@/app/(authenticated)/agency/(components)/(addPost)/GiaBan';
import { FileDialog } from '@/components/ui/FileDialog';
import { ImageList } from '@/components/ui/ImageList';
import { generateReactHelpers } from '@uploadthing/react/hooks';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import { useQueryClient } from '@tanstack/react-query';

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export const EditForm = ({ id }) => {
  const queryClient = useQueryClient();
  const { startUpload } = useUploadThing('imageUploader');
  const { fetchBatDongSanTheoId } = useBatDongSan();
  const [chiTietBDS, setChiTietBDS] = useState();
  console.log(
    '🚀 ~ file: EditForm.tsx:18 ~ EditForm ~ chiTietBDS:',
    chiTietBDS
  );
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
  const [productImageFiles, setProductImagesFile] = React.useState([]);
  const [deletedImage, setDeletedImage] = React.useState([]);
  console.log(
    '🚀 ~ file: EditForm.tsx:46 ~ EditForm ~ deletedImageKeys:',
    deletedImage
  );
  console.log(
    '🚀 ~ file: EditForm.tsx:43 ~ EditForm ~ productImageFiles:',
    productImageFiles
  );
  const { onUpdateBaiViet } = useBaiViet();

  const onSubmit = async () => {
    // let fileArray = [];

    // productImageFiles.forEach((file) => {
    //   if (file?.lastModified) {
    //     fileArray.push(file);
    //   }
    // });
    // console.log(
    //   '🚀 ~ file: EditForm.tsx:62 ~ filesInArray ~ filesInArray:',
    //   fileArray
    // );
    // // const [productImages] = await Promise.all([
    // //   startUpload([...fileArray]).then((res) => {
    // //     const formattedImages = res?.map((image) => ({
    // //       id: image.key,
    // //       name: image.key.split('_')[1] ?? image.key,
    // //       url: image.url,
    // //     }));
    // //     return formattedImages ?? null;
    // //   }),
    // // ]);

    // //array cu~ + array url xoa + array url moi
    // const newArrayImages = productImageFiles?.filter((image) => {
    //   return !deletedImage.includes(image?.id) && image.id;
    // });
    // // + productImages

    // // array deletedImage truyen vao body
    // console.log(
    //   '🚀 ~ file: EditForm.tsx:89 ~ newArrayImages ~ newArrayImages:',
    //   newArrayImages
    // );

    //array hoan chinh
    // const baiViet = {
    //   tieuDe: tieuDe,
    //   moTa: moTa,
    //   trangThai: 'Chờ duyệt',
    //   diaChi: diaChi,
    //   gia: giaBan,
    //   danhMucValue: danhMucValue,
    // };
    // setIsSubmitting(true);
    // const success = await onUpdateBaiViet(id, baiViet);
    // if (success) {
    //   console.log('Thay đổi thông tin bài viết thành công');
    // }
    console.log('onsubmit');
    await queryClient.refetchQueries(['chiTietBDS', `${id}`]);
  };

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
      setTieuDe(chiTietBDS?.tieuDe);
      setMoTa(chiTietBDS?.moTa);
      setDiaChi(chiTietBDS?.diaChi);
      setChieuDai(chiTietBDS?.chieuDai);
      setChieuRong(chiTietBDS?.chieuRong);
      setProductImagesFile(JSON.parse(chiTietBDS?.hinhAnhSanPham));
      setGiaBan(chiTietBDS?.gia?.toString());
    }
  }, [chiTietBDS]);

  return (
    <div className="grid-cols-1 grid gap-4 mb-6 px-1">
      {/* <SelectTrangThai setTrangThaiValue={setTrangThai} /> */}
      <Input
        value={tieuDe}
        label={'Tiêu đề'}
        onChange={(e) => setTieuDe(e.target.value)}
      />
      <Textarea
        value={moTa}
        label={'Mô tả'}
        onChange={(e) => setMoTa(e.target.value)}
      />
      <Input
        value={diaChi}
        label={'Địa chỉ'}
        onChange={(e) => setDiaChi(e.target.value)}
      />
      <DienTich
        chieuDai={chieuDai}
        chieuRong={chieuRong}
        setChieuDai={setChieuDai}
        setChieuRong={setChieuRong}
      />
      <FileDialog
        setDeletedImage={setDeletedImage}
        name="images"
        maxFiles={8}
        maxSize={1024 * 1024 * 4}
        files={productImageFiles}
        setFiles={setProductImagesFile}
        disabled={false}
      />
      {productImageFiles?.length ? (
        <ImageList
          className={'w-full h-36'}
          files={productImageFiles}
          height={32}
          width={32}
        />
      ) : null}
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
  );
};
