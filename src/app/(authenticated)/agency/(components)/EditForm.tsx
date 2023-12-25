/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useEffect, useState } from 'react';
import { useBatDongSan } from '@/hooks/useBatDongSan';
import { Input, Textarea } from '@nextui-org/react';
import { useBaiViet } from '@/hooks/useBaiViet';
import DialogCustom from '@/components/ui/dialogCustom';
import { Button } from '@/components/ui/button';
import { Spinner } from '@nextui-org/react';
import { VideoUploader } from '@/components/videoUpload/VideoUploader';
import { DienTich } from '@/app/(authenticated)/agency/(components)/(addPost)/DienTich';
import { SelectDanhMuc } from './(editPost)/SelectDanhMuc';
import { GiaBan } from '@/app/(authenticated)/agency/(components)/(addPost)/GiaBan';
import { FileDialog } from '@/components/ui/FileDialog';
import { ImageList } from '@/components/ui/ImageList';
import { generateReactHelpers } from '@uploadthing/react/hooks';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import { useQueryClient } from '@tanstack/react-query';
import { LoaiHinh } from './(editPost)/LoaiHinh';
import { GiayToPhapLy } from './(editPost)/GiayToPhapLy';
import { CanHoForm } from './(editPost)/(canho)/CanHoForm';
import { set } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { parse } from 'path';
import { SelectAddress } from './(editPost)/SelectAddress';
import { TieuDe } from '@/app/(authenticated)/agency/(components)/(addPost)/TieuDe';
import { MoTaChiTiet } from '@/app/(authenticated)/agency/(components)/(addPost)/MoTaChiTiet';
import { NhaForm } from './(editPost)/(nha)/NhaForm';
import Loader from '@/components/Loader';
import { VanPhongForm } from './(editPost)/(vanphong)/VanPhongForm';
import toast from 'react-hot-toast';

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

const EditForm = ({ id }) => {
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
  const [dienTichGarage, setDienTichGarage] = React.useState();
  const [dienTichHoBoi, setDienTichHoBoi] = React.useState();
  const [productImageFiles, setProductImagesFile] = React.useState([]);
  const [phapLyImageFiles, setPhapLyImageFiles] = React.useState([]);
  const [banVeThietKeImageFiles, setBanVeThietKeImageFiles] = React.useState(
    []
  );
  const [videoUrl, setVideoUrl] = React.useState('');
  const [deletedImageProductFiles, setDeletedImageProductFiles] =
    React.useState([]);
  const [deletedImagePhapLyFiles, setDeletedImagePhapLyFiles] = React.useState(
    []
  );
  const [deletedImageBanVeThietKeFiles, setDeletedImageBanVeThietKeFiles] =
    React.useState([]);
  const [loaiHinhValue, setLoaiHinhValue] = React.useState(null);
  const [oldloaiHinhValue, setoldLoaiHinhValue] = React.useState(null);
  const [loadingDanhMuc, setLoadingDanhMuc] = React.useState(true);

  const { onUpdateBaiViet } = useBaiViet();
  const onSubmit = async () => {
    // if (productImageFiles.length <= 0) {
    //   toast.error("Vui lòng chọn hình ảnh bất động sản");
    //   return;
    // }
    // if (productImageFiles.length < 7) {
    //   toast.error("Vui lòng chọn tói thiểu 7 hình ảnh bất động sản");
    //   return;
    // }
    // if (phapLyImageFiles.length <= 0) {
    //   toast.error("Vui lòng chọn hình ảnh pháp lý");
    //   return;
    // }
    // if (banVeThietKe.length <= 0) {
    //   toast.error("Vui lòng chọn hình ảnh bản vẽ thiết kế");
    //   return;
    // }
    // if (videoUrl === "") {
    //   toast.error("Vui lòng chọn video giới thiệu bất động sản");
    //   return;
    // }
    if (
      !diaChi ||
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
        !dienTichGarage ||
        !dienTichHoBoi ||
        !soTang ||
        !suaChuaLanCuoi ||
        !hoanThanh
      ) {
        toast.error('Vui lòng nhập đầy đủ thông tin');
        return;
      }
    }

    if (danhMucValue === 'Nhà ở') {
      if (
        !phongNgu ||
        !phongTam ||
        !noiThat ||
        !dienTichGarage ||
        !dienTichHoBoi ||
        !suaChuaLanCuoi ||
        !hoanThanh
      ) {
        toast.error('Vui lòng nhập đầy đủ thông tin');
        return;
      }
    }

    if (danhMucValue === 'Văn phòng') {
      if (!noiThat || !huongCuaChinh) {
        toast.error('Vui lòng nhập đầy đủ thông tin');
        return;
      }
    }

    // const productfileArray = [];
    // const phaplyfileArray = [];
    // const banVeThietKeArray = [];

    // productImageFiles.forEach((file) => {
    //   if (file?.lastModified) {
    //     productfileArray.push(file);
    //   }
    // });

    // phapLyImageFiles.forEach((file) => {
    //   if (file?.lastModified) {
    //     phaplyfileArray.push(file);
    //   }
    // });

    // banVeThietKeImageFiles.forEach((file) => {
    //   if (file?.lastModified) {
    //     banVeThietKeArray.push(file);
    //   }
    // });

    // const [productImages, phapLyImages, banVeThietKeImages] = await Promise.all(
    //   [
    //     startUpload([...productfileArray]).then((res) => {
    //       const formattedImages = res?.map((image) => ({
    //         id: image.key,
    //         name: image.key.split("_")[1] ?? image.key,
    //         url: image.url,
    //       }));
    //       return formattedImages ?? null;
    //     }),
    //     startUpload([...phaplyfileArray]).then((res) => {
    //       const formattedImages = res?.map((image) => ({
    //         id: image.key,
    //         name: image.key.split("_")[1] ?? image.key,
    //         url: image.url,
    //       }));
    //       return formattedImages ?? null;
    //     }),
    //     startUpload([...banVeThietKeArray]).then((res) => {
    //       const formattedImages = res?.map((image) => ({
    //         id: image.key,
    //         name: image.key.split("_")[1] ?? image.key,
    //         url: image.url,
    //       }));
    //       return formattedImages ?? null;
    //     }),
    //   ]
    // );

    // const newArrayImagesProduct = productImageFiles?.filter((image) => {
    //   return !deletedImageProductFiles.includes(image?.id) && image.id;
    // });

    // const newArrayImagesPhapLy = phapLyImageFiles?.filter((image) => {
    //   return !deletedImagePhapLyFiles.includes(image?.id) && image.id;
    // });

    // const newArrayImagesThietKe = banVeThietKeImageFiles?.filter((image) => {
    //   return !deletedImageBanVeThietKeFiles.includes(image?.id) && image.id;
    // });

    // const updateArrayImageProduct = [
    //   ...newArrayImagesProduct,
    //   ...(productImages || []),
    // ];
    // const updateArrayImagePhapLy = [
    //   ...newArrayImagesPhapLy,
    //   ...(phapLyImages || []),
    // ];
    // const updateArrayImageThietKe = [
    //   ...newArrayImagesThietKe,
    //   ...(banVeThietKeImages || []),
    // ];

    const baiVietUpdated = {
      diaChi: diaChi,
      loaiHinh: loaiHinhValue,
      chieuDai: parseFloat(chieuDai),
      chieuRong: parseFloat(chieuRong),
      dienTich: chieuDai * chieuRong,
      dienTichGarage: parseFloat(dienTichGarage),
      dienTichHoBoi: parseFloat(dienTichHoBoi),
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
      // hinhAnhSanPham: updateArrayImageProduct
      //   ? JSON.stringify([...updateArrayImageProduct])
      //   : null,
      // hinhAnhGiayTo: updateArrayImagePhapLy
      //   ? JSON.stringify([...updateArrayImagePhapLy])
      //   : null,
      // hinhAnhBanVeThietKe: updateArrayImageThietKe
      //   ? JSON.stringify([...updateArrayImageThietKe])
      //   : null,
      danhSachTienNghi:
        danhSachTienNghi.length > 0
          ? JSON.stringify([...danhSachTienNghi])
          : null,
      isChothue: thue,
      trangThai: 'cho_duyet',
      deletedImageProductFiles: deletedImageProductFiles
        ? JSON.stringify([...deletedImageProductFiles])
        : null,
    };

    if (oldloaiHinhValue === loaiHinhValue) {
      delete baiVietUpdated.loaiHinh;
    }

    const success = await onUpdateBaiViet(id, baiVietUpdated);
    if (success) {
      setIsSubmitting(true);
    }
  };

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
      setoldLoaiHinhValue(chiTietBDS?.loaiHinh?.name);
      setTieuDe(chiTietBDS?.tieuDe);
      setMoTa(chiTietBDS?.moTa);
      setDiaChi(chiTietBDS?.diaChi);
      setChieuDai(chiTietBDS?.chieuDai);
      setChieuRong(chiTietBDS?.chieuRong);
      setProductImagesFile(JSON.parse(chiTietBDS?.hinhAnhSanPham));
      setPhapLyImageFiles(JSON.parse(chiTietBDS?.hinhAnhGiayTo));
      setBanVeThietKeImageFiles(JSON.parse(chiTietBDS?.hinhAnhBanVeThietKe));
      setVideoUrl(chiTietBDS?.video);
      setGiaBan(chiTietBDS?.gia?.toString());
      setPhapLy(chiTietBDS?.tinhTrangPhapLy);
      setPhongNgu(chiTietBDS?.soPhongNgu?.toString());
      setPhongTam(chiTietBDS?.soPhongTam?.toString());
      setNoiThat(chiTietBDS?.tinhTrangNoiThat);
      setHuongBanCong(chiTietBDS?.huongBanCong);
      setHuongCuaChinh(chiTietBDS?.huongCuaChinh);
      setSuaChuaLanCuoi(Date.parse(chiTietBDS?.suaChuaLanCuoi));
      setHoanThanh(Date.parse(chiTietBDS?.hoanThanh));
      setDanhSachTienNghi(JSON.parse(chiTietBDS?.danhSachTienNghi));
      setSoTang(chiTietBDS?.soTang?.toString());
      setDienTichGarage(chiTietBDS?.dienTichGarage);
      setDienTichHoBoi(chiTietBDS?.dienTichHoBoi);
      setIsLoaded(true);
    }
  }, [chiTietBDS]);

  return (
    <div className="w-full h-full">
      {!isLoaded && loadingDanhMuc ? (
        <div className="flex h-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full h-full flex flex-col space-y-6">
          <div className="flex flex-row justify-between items-center">
            <div className="text-lg font-bold">{`Chỉnh sửa tin bất động sản #${chiTietBDS?.id}`}</div>
          </div>
          <SelectDanhMuc
            setThue={setThue}
            setBan={setBan}
            thue={thue}
            ban={ban}
            setDanhMucValue={setDanhMucValue}
            danhMucValue={danhMucValue}
            setLoadingDanhMuc={setLoadingDanhMuc}
          />
          <TieuDe tieuDe={tieuDe} setTieuDe={setTieuDe} />
          <MoTaChiTiet setMota={MoTaChiTiet} moTa={moTa} />

          <SelectAddress
            addressValue={diaChi}
            setAddressValue={setDiaChi}
            danhMucValue={danhMucValue}
          />

          <LoaiHinh
            danhMucValue={danhMucValue}
            setLoaiHinhValue={setLoaiHinhValue}
            loaiHinhValue={loaiHinhValue}
          />

          <DienTich
            chieuDai={chieuDai}
            chieuRong={chieuRong}
            setChieuDai={setChieuDai}
            setChieuRong={setChieuRong}
          />

          <GiayToPhapLy
            phapLy={phapLy}
            setPhapLy={setPhapLy}
            phapLyImageFiles={phapLyImageFiles}
            setPhapLyImageFiles={setPhapLyImageFiles}
            setDeletedImagePhapLyFiles={setDeletedImagePhapLyFiles}
          />
          {danhMucValue === 'Căn hộ' && (
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
              banVeThietKe={banVeThietKeImageFiles}
              setBanVeThietKe={setBanVeThietKeImageFiles}
              suaChuaLanCuoi={suaChuaLanCuoi}
              setSuaChuaLanCuoi={setSuaChuaLanCuoi}
              hoanThanh={hoanThanh}
              setHoanThanh={setHoanThanh}
              danhSachTienNghi={danhSachTienNghi}
              setDanhSachTienNghi={setDanhSachTienNghi}
              setDeletedImageBanVeThietKeFiles={
                setDeletedImageBanVeThietKeFiles
              }
            />
          )}
          {
            danhMucValue === 'Nhà ở' && (
              <NhaForm
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
                banVeThietKe={banVeThietKeImageFiles}
                setBanVeThietKe={setBanVeThietKeImageFiles}
                suaChuaLanCuoi={suaChuaLanCuoi}
                setSuaChuaLanCuoi={setSuaChuaLanCuoi}
                hoanThanh={hoanThanh}
                setHoanThanh={setHoanThanh}
                danhSachTienNghi={danhSachTienNghi}
                setDanhSachTienNghi={setDanhSachTienNghi}
                dienTichGarage={dienTichGarage}
                setDienTichGarage={setDienTichGarage}
                dienTichHoBoi={dienTichHoBoi}
                setDienTichHoBoi={setDienTichHoBoi}
              />
            )
            // <CanHoForm />
          }
          {
            danhMucValue === 'Văn phòng' && (
              <VanPhongForm
                setNoiThat={setNoiThat}
                noiThatValue={noiThat}
                huongCuaChinhValue={huongCuaChinh}
                setHuongCuaChinh={setHuongCuaChinh}
                danhSachTienNghi={danhSachTienNghi}
                setDanhSachTienNghi={setDanhSachTienNghi}
              />
            )
            // <CanHoForm />
          }

          <GiaBan giaBan={giaBan} setGiaBan={setGiaBan} />

          <div className="flex flex-col gap-y-3 w-full">
            <div className="font-bold text-sm">{`Hình ảnh bài viết (Tối thiểu 7 hình - Tối đa 20 hình)`}</div>
            <div className="border-1 border-gray-400 w-full h-64 overflow-hidden rounded-md">
              {productImageFiles?.length ? (
                <ImageList
                  className={'w-full h-64'}
                  files={productImageFiles}
                  height={32}
                  width={32}
                />
              ) : null}
            </div>
            <FileDialog
              name="images"
              maxFiles={20}
              maxSize={1024 * 1024 * 4}
              files={productImageFiles}
              setFiles={setProductImagesFile}
              disabled={false}
            />
          </div>
          <div className="w-full flex flex-col gap-y-3w">
            <div className="text-sm font-bold">Video bất động sản</div>
            <VideoUploader videoUrl={videoUrl} setVideoUrl={setVideoUrl} />
          </div>

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
        </div>
      )}
    </div>
  );
};
export default EditForm;
