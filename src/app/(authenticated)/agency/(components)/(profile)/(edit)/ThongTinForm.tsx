'use client';

import React, { useEffect } from 'react';
import { SelectAddress } from './SelectAddress';
import { generateReactHelpers } from '@uploadthing/react/hooks';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import { FileDialog } from '@/components/ui/FileDialog';
import { ImageList } from '@/components/ui/ImageList';
import { Button } from '@/components/ui/button';
import { useDoiTac } from '@/hooks/useDoiTac';
import { PartnerName } from './PartnerName';
import { PhoneNumber } from './PhoneNumber';
import toast from 'react-hot-toast';

const { useUploadThing } = generateReactHelpers<OurFileRouter>();


export const ThongTinForm = ({ loaiDoiTac, userInfo }) => {

  const { startUpload } = useUploadThing('imageUploader');


  const [addressValue, setAddressValue] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [nationalIDFrontImageFile, setNationalIDFrontImageFile] = React.useState([]);
  const [nationalIDBackImageFile, setNationalIDBackImageFile] = React.useState([]);
  const [giayPhepKinhDoanhImageFiles, setGiayPhepKinhDoanhImageFiles] = React.useState([]);
  const [anhChanDungImageFiles, setAnhChanDungImageFiles] = React.useState([]);
  const [nameDoiTac, setNameDoiTac] = React.useState();
  const [isSubmitting, setIsSubmitting] = React.useState(false);


  const { uploadDoiTacInfo } = useDoiTac();


  const onSubmit = async () => {
    if (
      !addressValue ||
      !phoneNumber ||
      !nameDoiTac
    ) {
      toast.error('Vui lòng nhập tất cả thông tin');
      return;
    }


    // if (nationalIDFrontImageFile.length <= 0) {
    //   toast.error('Vui lòng chọn hình ảnh mặt trước CCCD');
    //   return;
    // }

    // if (nationalIDBackImageFile.length <= 0) {
    //   toast.error('Vui lòng chọn hình ảnh mặt sau CCCD');
    //   return;
    // }

    // if (anhChanDungImageFiles.length <= 0) {
    //   toast.error('Vui lòng chọn ảnh chân dung');
    //   return;
    // }

    // if (giayPhepKinhDoanhImageFiles.length <= 0 && loaiDoiTac == 'doanhnghiep'){
    //   toast.error('Vui lòng chọn ảnh giấy phép kinh doanh');
    //   return;
    // }




    const [nationalIDFrontImage, nationalIDBackImage, giayPhepKinhDoanhImages] = await Promise.all([
      startUpload([...nationalIDFrontImageFile]).then((res) => {
        const formattedImages = res?.map((image) => ({
          id: image.key,
          name: image.key.split('_')[1] ?? image.key,
          url: image.url,
        }));
        return formattedImages ?? null;
      }),
      startUpload([...nationalIDBackImageFile]).then((res) => {
        const formattedImages = res?.map((image) => ({
          id: image.key,
          name: image.key.split('_')[1] ?? image.key,
          url: image.url,
        }));
        return formattedImages ?? null;
      }),
      startUpload([...giayPhepKinhDoanhImageFiles]).then((res) => {
        const formattedImages = res?.map((image) => ({
          id: image.key,
          name: image.key.split('_')[1] ?? image.key,
          url: image.url,
        }));
        return formattedImages ?? null;
      }),
      startUpload([...anhChanDungImageFiles]).then((res) => {
        const formattedImages = res?.map((image) => ({
          id: image.key,
          name: image.key.split('_')[1] ?? image.key,
          url: image.url,
        }));
        return formattedImages ?? null;
      }),
    ]);

    const thongTin = {
      name: nameDoiTac,
      diaChi: addressValue,
      phoneNumber: phoneNumber,
      anhCCCDTruoc: nationalIDFrontImage ? JSON.stringify([...nationalIDFrontImage]) : null,
      anhCCCDSau: nationalIDBackImage ? JSON.stringify([...nationalIDBackImage]) : null,
      anhGiayPhepKinhDoanh: giayPhepKinhDoanhImages ? JSON.stringify([...giayPhepKinhDoanhImages]) : null,
      anhChanDung: anhChanDungImageFiles ? JSON.stringify([...anhChanDungImageFiles]) : null,
    }

    setIsSubmitting(true);
    await uploadDoiTacInfo(thongTin);
  }

  useEffect(() => {
    if (userInfo)  {
      setNameDoiTac(userInfo?.name);
      setPhoneNumber(userInfo?.phoneNumber);
      setAddressValue(userInfo?.diaChi);
      setNationalIDFrontImageFile(JSON.parse(userInfo?.anhCCCDTruoc));
      setNationalIDBackImageFile(JSON.parse(userInfo?.anhCCCDSau));
      setGiayPhepKinhDoanhImageFiles(JSON.parse(userInfo?.anhGiayPhepKinhDoanh));
      setAnhChanDungImageFiles(JSON.parse(userInfo?.anhChanDung));
    }
  }, [userInfo])
  return (
    <div className="grid-cols-1 grid gap-4 mb-6 mt-5">
      <PartnerName
        nameDoiTac={nameDoiTac}
        setNameDoiTac={setNameDoiTac}
      />
      <PhoneNumber
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
      />
      <SelectAddress
        setAddressValue={setAddressValue}
        addressValue={addressValue}
      />
      <div className="flex flex-col gap-y-3 max-w-xs lg:max-w-lg">
        <div className="font-bold text-sm">Hình ảnh CCCD mặt trước <span className="text-red-500">*</span></div>
        <FileDialog
          name="images"
          maxFiles={1}
          maxSize={1024 * 1024 * 4}
          files={nationalIDFrontImageFile}
          setFiles={setNationalIDFrontImageFile}
          disabled={false}
        />
        {nationalIDFrontImageFile?.length ? (
          <ImageList
            className={'w-full h-36'}
            files={nationalIDFrontImageFile}
            height={32}
            width={32}
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-y-3 max-w-xs lg:max-w-lg">
        <div className="font-bold text-sm">Hình ảnh CCCD mặt sau <span className="text-red-500">*</span></div>
        <FileDialog
          name="images"
          maxFiles={1}
          maxSize={1024 * 1024 * 4}
          files={nationalIDBackImageFile}
          setFiles={setNationalIDBackImageFile}
          disabled={false}
        />
        {nationalIDBackImageFile?.length ? (
          <ImageList
            className={'w-full h-36'}
            files={nationalIDBackImageFile}
            height={32}
            width={32}
          />
        ) : null}
      </div>
      {loaiDoiTac === "doanhnghiep" ? (
        <div className="flex flex-col gap-y-3 max-w-xs lg:max-w-lg">
          <div className="font-bold text-sm">Hình ảnh giấy phép kinh doanh <span className="text-red-500">*</span></div>
          <FileDialog
            name="images"
            maxFiles={1}
            maxSize={1024 * 1024 * 4}
            files={giayPhepKinhDoanhImageFiles}
            setFiles={setGiayPhepKinhDoanhImageFiles}
            disabled={false}
          />
          {giayPhepKinhDoanhImageFiles?.length ? (
            <ImageList
              className={'w-full h-36'}
              files={giayPhepKinhDoanhImageFiles}
              height={32}
              width={32}
            />
          ) : null}
        </div>
      ) : null}
      <div className="flex flex-col gap-y-3 max-w-xs lg:max-w-lg">
        <div className="font-bold text-sm">Hình ảnh chân dung <span className="text-red-500">*</span></div>
        <FileDialog
          name="images"
          maxFiles={1}
          maxSize={1024 * 1024 * 4}
          files={anhChanDungImageFiles}
          setFiles={setAnhChanDungImageFiles}
          disabled={false}
        />
        {anhChanDungImageFiles?.length ? (
          <ImageList
            className={'w-full h-36'}
            files={anhChanDungImageFiles}
            height={32}
            width={32}
          />
        ) : null}
      </div>
      <div className="w-full flex items-center justify-center pt-10">
        <Button
          disabled={isSubmitting}
          onClick={() => {
            onSubmit();
          }}
          className="w-[50%]">
          Gửi yêu cầu
        </Button>
      </div>
      {/* {isSubmitting && (
        <DialogCustom
          className="w-[90%] lg:w-[50%] h-fit items-center justify-center"
          isModalOpen={isSubmitting}
          notShowClose={true}
        >
          <div className="flex flex-col gap-3 items-center justify-center">
            <div className="text-center font-semibold text-xs sm:text-sm">
              Yêu cầu tham gia chương trình đối tác đã được gửi thành công.
            </div>
          </div>
        </DialogCustom>
      )} */}
    </div >
  )
}
