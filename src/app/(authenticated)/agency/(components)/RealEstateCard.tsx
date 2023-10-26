'use client';

import { Card } from '@/components/ui/card'
import React from 'react'
import { Image } from '@nextui-org/react'
import { parseJSON } from "@/lib/utils";
import Link from "next/link";
import { RealEstateStatus } from './(realestateItem)/RealEstateStatus';
import { RealEstateTypeAndPrice } from './(realestateItem)/RealEstateTypeAndPrice';


export function RealEstateCard({ item }) {
    return (
        <Link href={`agency/realestate-detail/${item?.id}`}>
            <Card className="mt-4 cursor-pointer" key={`batdongsan_${item.id}`}>
                <RealEstateStatus trangthai={item.trangThai} />
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/6 m-3">
                        <div className="w-full aspect-w-4 aspect-h-3" >
                            {parseJSON(item?.hinhAnhSanPham)?.[0] && (
                                <div className="rounded-md">
                                    <Image
                                        src={parseJSON(item?.hinhAnhSanPham)[0].url} />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="md:w-5/6 m-3">
                        <h1 className='text-2xl font-bold'>{item.tieuDe}</h1>
                        <RealEstateTypeAndPrice loaiHinh={item.loaiHinh} gia={item.gia} />
                        <p className='text-sm mt-2'>{item.moTa}</p>
                    </div>
                </div>
            </Card>
        </Link>
    )
}

export default RealEstateCard