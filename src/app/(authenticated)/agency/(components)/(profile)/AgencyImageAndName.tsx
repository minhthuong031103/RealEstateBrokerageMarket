'use client';

import React, { useState, useEffect } from 'react'
import { Image } from '@nextui-org/react';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { useDoiTac } from '@/hooks/useDoiTac';

function AgencyImageAndName({ session }) {

    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchThongTinDoiTac = async () => {
            const user = await fetchDoiTacTheoId(session?.user?.id);
            setUserInfo(user[0]);
            return user;
        };

        fetchThongTinDoiTac();
    }, []);

    const {fetchDoiTacTheoId} = useDoiTac();

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
                <DialogContent className='max-w-[450px]'>
                    <DialogTitle>Thay đổi thông tin cá nhân</DialogTitle>
                    <DialogDescription>
                        Sửa đổi thông tin hồ sơ đối tác của bạn
                    </DialogDescription>
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden">
                            <Image
                                src={userInfo?.avatar}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div className="mb-4">
                                <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">
                                    Họ và tên
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={userInfo?.name}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                                    Số điện thoại
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={userInfo?.phoneNumber}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={userInfo?.email}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="submit">Quay về</Button>
                        <Button type="submit">Xác nhận</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
}

export default AgencyImageAndName;
