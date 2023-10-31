'use client';

import { Card } from '@/components/ui/card'
import React from 'react'
import { Image } from '@nextui-org/react';
import { parseJSON } from "@/lib/utils";
import { RealEstateStatus } from './(realestateItem)/RealEstateStatus';
import { RealEstateInfo } from './(realestateItem)/RealEstateInfo';
import { RealEstateModalList } from './RealEstateModalList';

export function RealEstateCard({ item }) {
    return (
        <Card className="mt-4 cursor-pointer" key={`batdongsan_${item.id}`}>
            <RealEstateStatus trangthai={item.trangThai} />
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/6 m-3">
                    <Image
                        src={parseJSON(item?.hinhAnhSanPham)[0].url} />
                </div>
                <div className="md:w-5/6 m-3">
                    <div className='flex flex-row'>
                        <h1 className='text-2xl font-extrabold mt-2'>{item.tieuDe}</h1>
                        <div className='ml-auto'>
                            <RealEstateModalList id={item.id} />
                        </div>
                    </div>
                    <p className='mt-2 text-medium'>{item.moTa}</p>
                    <RealEstateInfo item={item} />
                </div>
            </div>
        </Card>
    )
}
export default RealEstateCard