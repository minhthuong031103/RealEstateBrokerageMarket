'use client';

import React, { useEffect, useState } from 'react';
import { SelectAddress } from './SelectAddress';
import { generateReactHelpers } from '@uploadthing/react/hooks';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import { FileDialog } from '@/components/ui/FileDialog';
import { Button } from '@/components/ui/button';
import { useDoiTac } from '@/hooks/useDoiTac';
import { PartnerName } from './PartnerName';
import { PhoneNumber } from './PhoneNumber';
import toast from 'react-hot-toast';
import { Zoom } from '@/components/ui/zoom-image';
import { postRequest } from '@/lib/fetch';
import { Card, CardBody, Chip, Input } from '@nextui-org/react';
import { Label } from '@/components/ui/label';

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

export const ThongTinForm = ({ userInfo }) => {
  const { startUpload } = useUploadThing('imageUploader');

  const [addressValue, setAddressValue] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [nationalIDFrontImageFile, setNationalIDFrontImageFile] =
    React.useState([]);
  const [nationalIDBackImageFile, setNationalIDBackImageFile] = React.useState(
    []
  );
  const [avatarImageFiles, setAvatarImageFiles] = React.useState([]);

  const [anhChanDungImageFiles, setAnhChanDungImageFiles] = React.useState([]);
  const [nameDoiTac, setNameDoiTac] = React.useState();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [defaultAvatar, setDefaultAvatar] = React.useState('');
  const [defaultPortrait, setDefaultPortrait] = React.useState('');
  const [defaultFrontID, setDefaultFrontID] = React.useState('');
  const [defaultBackID, setDefaultBackID] = React.useState('');
  const [maSoCmnd, setMaSoCmnd] = useState('');

  useEffect(() => {
    const getOcr = async () => {
      try {
        if (nationalIDFrontImageFile?.[0]) {
          const formData = new FormData();
          formData.append('image', nationalIDFrontImageFile[0]);
          const res = await postRequest({
            endPoint: 'https://api.fpt.ai/vision/idr/vnm',
            formData: formData,
            isFormData: true,
            customHeaders: {
              'api-key': 'VfJbF7YsRFRwJY6VoimYoxK8boydrA9G',
            },
          });
          if (res?.errorCode == 0 && res?.data?.[0]) {
            setMaSoCmnd(res?.data?.[0]?.id);
          } else {
            toast.error('Không thể nhận dạng CMND mặt trước');
          }
        }
      } catch (e) {
        toast.error('Không thể nhận dạng CMND mặt trước');
      }
    };
    getOcr();
  }, [nationalIDFrontImageFile]);

  const { uploadDoiTacInfo } = useDoiTac();

  const onSubmit = async () => {
    if (!addressValue || !phoneNumber || !nameDoiTac) {
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

    const [
      avatarImage,
      nationalIDFrontImage,
      nationalIDBackImage,
      anhChanDungImage,
    ] = await Promise.all([
      startUpload([...avatarImageFiles]).then((res) => {
        const formattedImages = res?.map((image) => ({
          id: image.key,
          name: image.key.split('_')[1] ?? image.key,
          url: image.url,
        }));
        return formattedImages ?? null;
      }),
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
      maSoCmnd: maSoCmnd,
      duyetKhachHang: 'cho_duyet',
      avatar: avatarImage ? avatarImage[0]?.url : defaultAvatar,
      anhCCCDTruoc: nationalIDFrontImage
        ? nationalIDFrontImage[0]?.url
        : defaultFrontID,
      anhCCCDSau: nationalIDBackImage
        ? nationalIDBackImage[0]?.url
        : defaultBackID,
      anhChanDung: anhChanDungImage
        ? anhChanDungImage[0]?.url
        : defaultPortrait,
    };

    setIsSubmitting(true);
    await uploadDoiTacInfo(thongTin);
  };

  useEffect(() => {
    if (userInfo) {
      setNameDoiTac(userInfo?.name);
      setPhoneNumber(userInfo?.phoneNumber);
      setAddressValue(userInfo?.diaChi);
      setDefaultFrontID(userInfo?.anhCCCDTruoc);
      setDefaultBackID(userInfo?.anhCCCDSau);
      setMaSoCmnd(userInfo?.maSoCmnd);
      setDefaultPortrait(userInfo?.anhChanDung);
      setDefaultAvatar(userInfo?.avatar);
    }
  }, [userInfo]);
  return (
    <div className="grid-cols-1 grid gap-4 mb-6 mt-5">
      <div className="flex flex-col gap-y-3 w-full">
        <div className="font-bold text-sm">
          Ảnh đại diện <span className="text-red-500">*</span>
        </div>
        <div className="w-full flex flex-col gap-3 justify-center items-center">
          <div className="border-2 border-red-400 rounded-full w-[180px] md:w-[270px] h-[180px] md:h-[270px] overflow-hidden">
            <Zoom key={1} className={'w-full '}>
              <img
                src={
                  avatarImageFiles[0]?.preview ||
                  avatarImageFiles[0]?.url ||
                  defaultAvatar
                }
                alt={avatarImageFiles[0]?.name}
                className="w-full h-full object-cover"
              />
            </Zoom>
          </div>
          <FileDialog
            name="images"
            className="py-0"
            maxFiles={1}
            maxSize={1024 * 1024 * 4}
            files={avatarImageFiles}
            setFiles={setAvatarImageFiles}
            disabled={false}
          />
        </div>
      </div>
      <PartnerName nameDoiTac={nameDoiTac} setNameDoiTac={setNameDoiTac} />
      <PhoneNumber phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
      <SelectAddress
        setAddressValue={setAddressValue}
        addressValue={addressValue}
      />
      <Card>
        <CardBody>
          <Chip className="bg-red-400 text-slate-900">Quy định:</Chip>
          <p className="text-[12px] ">
            - Ảnh đầu vào phải đủ 4 góc rõ ràng hoặc đủ các bộ phận chính của
            một CMT như ảnh, quốc huy, tiêu đề.
          </p>
          <p className="text-[12px]">
            - Các trường thông tin phải rõ ràng, so sánh khi mắt người có thể
            đọc được dễ dàng, không tẩy xoá, hay bị nhoè xước. Số CCCD sẽ được
            điền tự động sau khi tải hình.
          </p>
        </CardBody>
      </Card>
      <div className="flex flex-col gap-3 w-full">
        <Label className="font-bold text-sm">
          Mã số CCCD <span className="text-red-500">*</span>
        </Label>
        <Input
          isInvalid={maSoCmnd !== '' ? false : true}
          errorMessage={`${maSoCmnd !== '' ? '' : 'Vui lòng nhập mã số CCCD'}`}
          className="w-full"
          variant="bordered"
          radius="sm"
          label="Mã số CCCD"
          value={maSoCmnd}
          placeholder="Nhập mã số CCCD"
          onChange={(e) => {
            setMaSoCmnd(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-row flex-wrap gap-10 justify-center">
        <div className="flex flex-col gap-y-3 w-fit">
          <div className="font-bold text-sm">
            Hình ảnh chân dung <span className="text-red-500">*</span>
          </div>
          <div className=" w-28 h-36 border-2 rounded">
            <Zoom key={4} className={'w-full '}>
              <img
                src={
                  anhChanDungImageFiles[0]?.preview ||
                  anhChanDungImageFiles[0]?.url ||
                  defaultPortrait
                }
                alt={anhChanDungImageFiles[0]?.name}
                className={`h-36 w-28 rounded-md object-cover object-center`}
              />
            </Zoom>
          </div>
          <FileDialog
            name="images"
            className="p-0"
            maxFiles={1}
            maxSize={1024 * 1024 * 4}
            files={anhChanDungImageFiles}
            setFiles={setAnhChanDungImageFiles}
            disabled={false}
          />
        </div>
        <div className="flex flex-col gap-y-3 w-fit">
          <div className="font-bold text-sm">
            Hình ảnh CCCD mặt trước <span className="text-red-500">*</span>
          </div>
          <div className=" w-56 h-36 border-2 rounded">
            <Zoom key={1} className={'w-full '}>
              <img
                src={
                  nationalIDFrontImageFile[0]?.preview ||
                  nationalIDFrontImageFile[0]?.url ||
                  defaultFrontID
                }
                alt={nationalIDFrontImageFile[0]?.name}
                className={`h-36 w-56 rounded-md object-cover object-center`}
              />
            </Zoom>
          </div>
          <FileDialog
            name="images"
            className="p-0"
            maxFiles={1}
            maxSize={1024 * 1024 * 4}
            files={nationalIDFrontImageFile}
            setFiles={setNationalIDFrontImageFile}
            disabled={false}
          />
        </div>
        <div className="flex flex-col gap-y-3 w-fit">
          <div className="font-bold text-sm">
            Hình ảnh CCCD mặt sau <span className="text-red-500">*</span>
          </div>
          <div className=" w-56 h-36 border-2 rounded">
            <Zoom key={2} className={'w-full '}>
              <img
                src={
                  nationalIDBackImageFile[0]?.preview ||
                  nationalIDBackImageFile[0]?.url ||
                  defaultBackID
                }
                alt={nationalIDBackImageFile[0]?.name}
                className={`h-36 w-56 rounded-md object-cover object-center`}
              />
            </Zoom>
          </div>
          <FileDialog
            name="images"
            className="p-0"
            maxFiles={1}
            maxSize={1024 * 1024 * 4}
            files={nationalIDBackImageFile}
            setFiles={setNationalIDBackImageFile}
            disabled={false}
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-center pt-10">
        <Button
          disabled={isSubmitting}
          onClick={() => {
            onSubmit();
          }}
          className="w-[50%] p-0"
        >
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
    </div>
  );
};
