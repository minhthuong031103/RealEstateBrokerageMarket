'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Image } from '@nextui-org/react'
import { RealEstateStatus } from './RealEstateStatus';
import { parseJSON } from "@/lib/utils";
import Link from "next/link";


export function RealEstateCard({ item }) {
    return (
        <Link href={`agency/realestate-detail/${item?.id}`}>
            <Card className="mt-4 cursor-pointer" key={`batdongsan_${item.id}`}>
                <RealEstateStatus trangthai={item.trangThai} />
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/6 m-3">
                        <div className="w-full aspect-w-4 aspect-h-3">
                            {parseJSON(item?.hinhAnhSanPham)?.[0] && (
                                <div className="rounded-md">
                                    <Image
                                        src={parseJSON(item?.hinhAnhSanPham)[0].url}
                                    />
                                </div>
                            )}
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
        </Link>
    )
}

export default RealEstateCard