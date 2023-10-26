/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useEffect, useState } from 'react';
import { useBatDongSan } from '@/hooks/useBatDongSan';
import { Input, Textarea } from '@nextui-org/react';
import { useBaiViet } from '@/hooks/useBaiViet';
import DialogCustom from '@/components/ui/dialogCustom';
import { Button } from '@/components/ui/button';
import { Spinner } from '@nextui-org/react';
import { DienTich } from '@/app/(authenticated)/agency/(components)/(addPost)/DienTich';
import { SelectDanhMuc } from './(editPost)/SelectDanhMuc';
import { GiaBan } from '@/app/(authenticated)/agency/(components)/(addPost)/GiaBan';
import { FileDialog } from '@/components/ui/FileDialog';
import { ImageList } from '@/components/ui/ImageList';
import { generateReactHelpers } from '@uploadthing/react/hooks';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import { useQueryClient } from '@tanstack/react-query';
import { Skeleton } from '@nextui-org/react';
import { LoaiHinh } from './(editPost)/LoaiHinh';
import { GiayToPhapLy } from './(editPost)/GiayToPhapLy';
import { CanHoForm } from './(editPost)/(canho)/CanHoForm';
import { set } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { parse } from 'path';


const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export const EditForm = ({ id }) => {
  const queryClient = useQueryClient();
  const { startUpload } = useUploadThing('imageUploader');
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { fetchBatDongSanTheoId } = useBatDongSan();
  // const [chiTietBDS, setChiTietBDS] = useState();
  const [tieuDe, setTieuDe] = React.useState('');
  const [moTa, setMoTa] = React.useState('');
  const [diaChi, setDiaChi] = React.useState('');
  const [giaBan, setGiaBan] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [chieuDai, setChieuDai] = React.useState();
  const [chieuRong, setChieuRong] = React.useState();
  const [phapLy, setPhapLy] = React.useState(null);
  const [phongNgu, setPhongNgu] = React.useState();
  const [phongTam, setPhongTam] = React.useState();
  const [noiThat, setNoiThat] = React.useState();
  const [huongBanCong, setHuongBanCong] = React.useState();
  const [huongCuaChinh, setHuongCuaChinh] = React.useState();
  const [soTang, setSoTang] = React.useState();
  const [suaChuaLanCuoi, setSuaChuaLanCuoi] = React.useState();
  const [hoanThanh, setHoanThanh] = React.useState();
  const [danhSachTienNghi, setDanhSachTienNghi] = React.useState([]);
  const [danhMucValue, setDanhMucValue] = React.useState(null);
  const [thue, setThue] = React.useState(false);
  const [ban, setBan] = React.useState(false);
  const [productImageFiles, setProductImagesFile] = React.useState([]);
  const [phapLyImageFiles, setPhapLyImageFiles] = React.useState([]);
  const [banVeThietKe, setBanVeThietKe] = React.useState([]);
  const [deletedImage, setDeletedImage] = React.useState([]);
  const [loaiHinhValue, setLoaiHinhValue] = React.useState(null);
  const [oldloaiHinhValue, setoldLoaiHinhValue] = React.useState(null);

  const { onUpdateBaiViet } = useBaiViet();
  const onSubmit = async () => {

    const productfileArray = [];
    const phaplyfileArray = [];


    //image that need to be push to server put in file Array
    productImageFiles.forEach((file) => {
      if (file?.lastModified) {
        productfileArray.push(file);
      }
    });
    const [productImages, phapLyImages] = await Promise.all([
      startUpload([...productfileArray]).then((res) => {
        const formattedImages = res?.map((image) => ({
          id: image.key,
          name: image.key.split('_')[1] ?? image.key,
          url: image.url,
        }));
        return formattedImages ?? null;
      }),
      startUpload([...phaplyfileArray]).then((res) => {
        const formattedImages = res?.map((image) => ({
          id: image.key,
          name: image.key.split('_')[1] ?? image.key,
          url: image.url,
        }));
        return formattedImages ?? null;
      }),
    ]);

    //old image arrray + delete image array + new url arry
    const newArrayImages = productImageFiles?.filter((image) => {
      return !deletedImage.includes(image?.id) && image.id;
    });

    // add product image productImages

    const imagedelete = {
      deletedImage: deletedImage,
    }

    // // array deletedImage truyen vao body
    console.log(
      '🚀 ~ file: EditForm.tsx:89 ~ newArrayImages ~ newArrayImages:',
      newArrayImages
    );

    //array hoan chinh



    const baiVietUpdated = {
      diaChi: diaChi,
      loaiHinh: loaiHinhValue,
      chieuDai: parseFloat(chieuDai),
      chieuRong: parseFloat(chieuRong),
      dienTich: chieuDai * chieuRong,
      tinhTrangPhapLy: phapLy,
      gia: parseFloat(giaBan),
      tieuDe: tieuDe,
      moTa: moTa,
      soPhongNgu: phongNgu ? parseInt(phongNgu) : null,
      soPhongTam: phongTam ? parseInt(phongTam) : null,
      tinhTrangNoiThat: noiThat,
      huongBanCong: huongBanCong,
      hoanThanh: hoanThanh ? new Date(hoanThanh) : null,
      suaChuaLanCuoi: suaChuaLanCuoi ? new Date(suaChuaLanCuoi) : null,
      huongCuaChinh: huongCuaChinh,
      soTang: soTang ? parseInt(soTang) : null,
      hinhAnhSanPham: productImages ? JSON.stringify([...productImages]) : null,
      hinhAnhGiayTo: phapLyImages ? JSON.stringify([...phapLyImages]) : null,
      danhSachTienNghi:
        danhSachTienNghi.length > 0
          ? JSON.stringify([...danhSachTienNghi])
          : null,
      hinhAnhBanVeThietKe: banVeThietKe
        ? JSON.stringify([...banVeThietKe])
        : null,
      isChothue: thue,
    }

    if (oldloaiHinhValue == loaiHinhValue) {
      delete baiVietUpdated.loaiHinh;
    }

    const success = await onUpdateBaiViet(id, baiVietUpdated);
    if (success) {
      setIsSubmitting(true);
      console.log('Thay đổi thông tin bài viết thành công');
    }






  };

  // useEffect(() => {
  //   const getBatDongSan = async () => {
  //     await fetchBatDongSanTheoId(id).then((data) => {
  //       setChiTietBDS(data[0]);
  //     });
  //   };
  //   getBatDongSan();
  // }, []);

  const { data: chiTietBDS } = useQuery({
    queryKey: ['chiTietBDS', id],
    queryFn: async () => {
      const res = await fetchBatDongSanTheoId(id);
      return res?.[0];
    },
  });

  useEffect(() => {
    if (chiTietBDS) {
      setDanhMucValue(chiTietBDS?.loaiHinh?.loaiBDS?.name);
      if (chiTietBDS?.isChothue === true) {
        setThue(true);
      } else {
        setBan(true);
      }
      setLoaiHinhValue(chiTietBDS?.loaiHinh?.name);
      setoldLoaiHinhValue(chiTietBDS?.loaiHinh?.name)
      setTieuDe(chiTietBDS?.tieuDe);
      setMoTa(chiTietBDS?.moTa);
      setDiaChi(chiTietBDS?.diaChi);
      setChieuDai(chiTietBDS?.chieuDai);
      setChieuRong(chiTietBDS?.chieuRong);
      setProductImagesFile(JSON.parse(chiTietBDS?.hinhAnhSanPham));
      setPhapLyImageFiles(JSON.parse(chiTietBDS?.hinhAnhGiayTo));
      setBanVeThietKe(JSON.parse(chiTietBDS?.hinhAnhBanVeThietKe));
      setGiaBan(chiTietBDS?.gia?.toString());
      setPhapLy(chiTietBDS?.tinhTrangPhapLy);
      setPhongNgu(chiTietBDS?.soPhongNgu.toString());
      setPhongTam(chiTietBDS?.soPhongTam.toString());
      setNoiThat(chiTietBDS?.tinhTrangNoiThat);
      setHuongBanCong(chiTietBDS?.huongBanCong);
      setHuongCuaChinh(chiTietBDS?.huongCuaChinh);
      setSuaChuaLanCuoi(Date.parse(chiTietBDS?.suaChuaLanCuoi));
      setHoanThanh(Date.parse(chiTietBDS?.hoanThanh));
      setDanhSachTienNghi(JSON.parse(chiTietBDS?.danhSachTienNghi));
      setIsLoaded(true);
    }
  }, [chiTietBDS]);
  return (
    <div className="grid-cols-1 grid gap-4 mb-6 px-1">
      <Skeleton isLoaded={isLoaded} className='rounded-md'>
        <Input
          value={tieuDe}
          label={'Tiêu đề'}
          onChange={(e) => setTieuDe(e.target.value)}
        />
      </Skeleton>
      <Skeleton isLoaded={isLoaded} className='rounded-md'>
        <Textarea
          value={moTa}
          label={'Mô tả'}
          onChange={(e) => setMoTa(e.target.value)}
        />
      </Skeleton>

      <Skeleton isLoaded={isLoaded} className='rounded-md'>
        <SelectDanhMuc
          setThue={setThue}
          setBan={setBan}
          thue={thue}
          ban={ban}
          setDanhMucValue={setDanhMucValue}
          danhMucValue={danhMucValue}
        />
      </Skeleton>
      <Skeleton isLoaded={isLoaded} className='rounded-md'>
        <Input
          value={diaChi}
          label={'Địa chỉ'}
          onChange={(e) => setDiaChi(e.target.value)}
        />

      </Skeleton>
      <Skeleton isLoaded={isLoaded} className='rounded-md'>
        <LoaiHinh danhMucValue={danhMucValue} setLoaiHinhValue={setLoaiHinhValue} loaiHinhValue={loaiHinhValue} />
      </Skeleton>



      <Skeleton isLoaded={isLoaded} className='rounded-md'>
        <DienTich
          chieuDai={chieuDai}
          chieuRong={chieuRong}
          setChieuDai={setChieuDai}
          setChieuRong={setChieuRong}
        />
      </Skeleton>

      <Skeleton isLoaded={isLoaded} className='rounded-md'>
        <GiayToPhapLy phapLy={phapLy} setPhapLy={setPhapLy} phapLyImageFiles={phapLyImageFiles} setPhapLyImageFiles={setPhapLyImageFiles} />
      </Skeleton>
      {
        danhMucValue === 'Căn hộ' && (
          <Skeleton isLoaded={isLoaded} className='rounded-md'>
            <CanHoForm
              setHuongBanCong={setHuongBanCong}
              setHuongCuaChinh={setHuongCuaChinh}
              setNoiThat={setNoiThat}
              setPhongNgu={setPhongNgu}
              setPhongTam={setPhongTam}
              setSoTang={setSoTang}
              phongNguValue={phongNgu}
              phongTamValue={phongTam}
              soTangValue={soTang}
              noiThatValue={noiThat}
              huongBanCongValue={huongBanCong}
              huongCuaChinhValue={huongCuaChinh}
              banVeThietKe={banVeThietKe}
              setBanVeThietKe={setBanVeThietKe}
              suaChuaLanCuoi={suaChuaLanCuoi}
              setSuaChuaLanCuoi={setSuaChuaLanCuoi}
              hoanThanh={hoanThanh}
              setHoanThanh={setHoanThanh}
              danhSachTienNghi={danhSachTienNghi}
              setDanhSachTienNghi={setDanhSachTienNghi} />
          </Skeleton>

        )}
      <Skeleton isLoaded={isLoaded} className='rounded-md'>
        <GiaBan giaBan={giaBan} setGiaBan={setGiaBan} />
      </Skeleton>

      <Skeleton isLoaded={isLoaded} className='rounded-md'>
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
      </Skeleton>

      {/* <Nhan setNhan={setNhan} setIsMuaLeModalOpen={setIsMuaLeModalOpen} /> */}

      <Skeleton isLoaded={isLoaded} className='rounded-md'>

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
      </Skeleton>
      {/* {isSubmitting && (
        <DialogCustom
          className="w-[90%] lg:w-[50%] h-fit items-center justify-center"
          isModalOpen={isSubmitting}
          notShowClose={true}
        >
          <div className="flex flex-col gap-3 items-center justify-center">
            <div className="text-center font-semibold text-xs sm:text-sm">
              Cập nhật thông tin bất động sản thành công
            </div>
          </div>
        </DialogCustom>
      )} */}
    </div>
  );
};
