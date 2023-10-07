'use client';

import React from 'react';
import { Image } from '@nextui-org/react';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';

function AgencyImageAndName() {
    return (
        <Card className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center mt-4">
            <div className="flex-shrink-0 w-32 h-32 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 md:mr-4 md:mb-0">
                <Image src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg' className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow">
                <CardTitle className="text-lg font-semibold">Trương Anh Khoa</CardTitle>
                <CardDescription>Đối tác từ ngày 05/09/2023</CardDescription>
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
                                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
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
