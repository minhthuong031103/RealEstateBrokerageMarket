'use client';

import React, { useEffect } from 'react'
import { Image } from '@nextui-org/react';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import DialogCustom from '@/components/ui/dialogCustom'
import { useDoiTac } from '@/hooks/useDoiTac';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@nextui-org/react';
import { ThongTinForm } from './(edit)/ThongTinForm';



function AgencyImageAndName({ session }) {
    const [loaiDoiTac, setLoaiDoiTacValue] = React.useState();
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [isOpen, setOpen] = React.useState(false);
    const { fetchDoiTacTheoId } = useDoiTac();
    const [giayPhepKinhDoanhImageFiles, setGiayPhepKinhDoanhImageFiles] = React.useState([]);


    const { data: userInfo } = useQuery({
        queryKey: ['userInfo', session?.user?.id],
        queryFn: async () => {
            const res = await fetchDoiTacTheoId(session?.user?.id);
            return res?.[0];
        },
    });

    useEffect(() => {
        if (userInfo) {
            setIsLoaded(true);
            if (userInfo?.giayPhepKinhDoanh != undefined) {
                setGiayPhepKinhDoanhImageFiles(JSON.parse(userInfo!.giayPhepKinhDoanh));
                console.log(giayPhepKinhDoanhImageFiles);
                setLoaiDoiTacValue('doanhnghiep');
            } else {
                setLoaiDoiTacValue('canhan');
                console.log("done");
            }
        }
    }, [userInfo]);

    return (
        <div>
            <Skeleton isLoaded={isLoaded} className='rounded-lg mt-4'>

                <Card className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center mt-4">
                    <div className="flex-shrink-0 w-32 h-32 md:w-32 md:h-32 rounded-full overflow-hidden mb-4 md:mr-4 md:mb-0">
                        <Image src={userInfo?.avatar} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                        <CardTitle className="text-lg font-semibold">{userInfo?.name}</CardTitle>
                        <CardDescription>{userInfo?.email}</CardDescription>
                    </div>
                    <Button className="mt-2 md:mt-0" onClick={() => {
                        setOpen(true);
                    }}>Chỉnh sửa</Button>

                    <DialogCustom className='w-full lg:w-[70%] h-[80%] lg:h-[95%] flex items-center justify-center' isModalOpen={isOpen} setIsModalOpen={setOpen} notShowClose={false}>

                        <div>
                            <div className="flex flex-col space-y-3">
                                {loaiDoiTac ? (
                                    <ThongTinForm
                                        loaiDoiTac={loaiDoiTac} userInfo={userInfo} />
                                ) : null}
                            </div>
                        </div>
                    </DialogCustom>
                </Card>
            </Skeleton>
        </div>
    );
}

export default AgencyImageAndName;
