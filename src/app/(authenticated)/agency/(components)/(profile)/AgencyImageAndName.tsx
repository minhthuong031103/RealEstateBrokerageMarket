'use client';

import React, { useState, useEffect } from 'react'
import { Image } from '@nextui-org/react';
import { Input } from '@/components/ui/input';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { useDoiTac } from '@/hooks/useDoiTac';
import { generateReactHelpers } from '@uploadthing/react/hooks';
import { FileDialog } from '@/components/ui/FileDialog';
import { ImageList } from '@/components/ui/ImageList';
import { OurFileRouter } from '@/app/api/uploadthing/core';


const { useUploadThing } = generateReactHelpers<OurFileRouter>();


function AgencyImageAndName({ session }) {
    const { startUpload } = useUploadThing('imageUploader');


    const [userInfo, setUserInfo] = useState(null);
    const [addressValue, setAddressValue] = React.useState('');
    const [name, setName] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [avatarImageFile, setAvatarImageFile] = React.useState([]);

    const { uploadDoiTacInfo } = useDoiTac();


    useEffect(() => {
        const fetchThongTinDoiTac = async () => {
            const user = await fetchDoiTacTheoId(session?.user?.id);
            setUserInfo(user[0]);
            return user;
        };

        fetchThongTinDoiTac();
    }, []);

    const onSubmit = async () => {
        const [avatarImages] = await Promise.all([
            startUpload([...avatarImageFile]).then((res) => {
                const formattedImages = res?.map((image) => ({
                    id: image.key,
                    name: image.key.split('_')[1] ?? image.key,
                    url: image.url,
                }));
                return formattedImages ?? null;
            }),
        ]);
        const data = {
            name: name,
            phoneNumber: phoneNumber,
            email: email,
            diaChi: addressValue,
            avatar: avatarImages ? JSON.stringify([...avatarImages]) : null,
        }

        const success = await uploadDoiTacInfo(data);
        if (success){
            console.log('upload đối tác thành công');
        }
    }
    const { fetchDoiTacTheoId } = useDoiTac();

    useEffect(() => {
        if (userInfo) {
            setName(userInfo?.name);
            setPhoneNumber(userInfo?.phoneNumber);
            setEmail(userInfo?.email);
            setAddressValue(userInfo?.diaChi);
        }
    }, [userInfo]);

    return (
        <Card className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center mt-4">
            <div className="flex-shrink-0 w-32 h-32 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 md:mr-4 md:mb-0">
                <Image src={userInfo?.avatar} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow">
                <CardTitle className="text-lg font-semibold">{userInfo?.name}</CardTitle>
                <CardDescription>{userInfo?.email}</CardDescription>
            </div>
            {/* <Button className="mt-2 md:mt-0">Chỉnh sửa</Button> */}
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="mt-2 md:mt-0">Chỉnh sửa</Button>
                </DialogTrigger>
                <DialogContent className='max-w-[600px]'>
                    <DialogTitle>Thay đổi thông tin cá nhân</DialogTitle>
                    <DialogDescription>
                        Sửa đổi thông tin hồ sơ đối tác của bạn
                    </DialogDescription>
                    <div className="flex flex-row items-center space-y-4">
                        <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden mr-10">
                            {/* <Image
                                src={userInfo?.avatar}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            /> */}
                            {avatarImageFile?.length ? (
                                <ImageList
                                    className={'w-full h-36'}
                                    files={avatarImageFile}
                                    height={32}
                                    width={32}
                                />
                            ) : null}
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div className="mb-4">
                                <Input value={name} label={"Họ và tên"} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <Input value={phoneNumber} label={"Số điện thoại"} onChange={(e) => setPhoneNumber(e.target.value)} />
                            </div>
                            <div className='mb-4'>
                                <Input value={addressValue} label={"Địa chỉ"} onChange={(e) => setAddressValue(e.target.value)} />
                            </div>
                            <div className='mb-4'>
                                <FileDialog
                                    name="images"
                                    maxFiles={8}
                                    maxSize={1024 * 1024 * 4}
                                    files={avatarImageFile}
                                    setFiles={setAvatarImageFile}
                                    disabled={false}
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => {
                            onSubmit();
                        }}>Xác nhận</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
}

export default AgencyImageAndName;
