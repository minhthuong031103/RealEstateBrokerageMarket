'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Image } from '@nextui-org/react'
import { CheckCircle } from 'lucide-react';
// import Image from 'next/image';

export function RealEstateCard({ item }) {
    return (
        <Card className="mt-4 cursor-pointer">
            <div className="flex items-center m-4">
                <CheckCircle className="mr-2" />
                <p className="font-medium">{item.trangThai}</p>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/6 m-3">
                    <div className="w-full aspect-w-4 aspect-h-3">
                        {/* <Image
                                src="https://angel-prod-public-content.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/sites/7/2023/08/bds.jpg"
                                alt="Property Image"
                                className="rounded-t-md md:rounded-l-md md:rounded-t-none object-cover"
                            /> */}
                        {/* <Image className="rounded-md" src={item.hinhAnhSanPham} alt="Picture of the author" width={500} height={500} /> */}
                        <Image
                            // src={RealIstateImage[0].url}
                            alt='Property Image'
                            width={1000}
                            height={1000}
                            className="object-cover"
                        ></Image>
                    </div>
                </div>
                <div className="md:w-5/6 m-4">
                    <CardHeader>
                        <CardTitle>{item.tieuDe}</CardTitle>
                        <CardDescription>
                            {item.moTa}
                        </CardDescription>
                    </CardHeader>
                </div>
            </div>
        </Card>
    )
}

export default RealEstateCard