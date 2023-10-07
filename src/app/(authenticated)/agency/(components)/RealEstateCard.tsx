'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Image } from '@nextui-org/react'
import { CheckCircle } from 'lucide-react';

export const RealEstateCard = () => {
    return (
            <Card className="mt-4 cursor-pointer">
                <div className="flex items-center m-4">
                    <CheckCircle className="mr-2" />
                    <p className="font-medium">Thông tin bất động sản đã được phê duyệt</p>
                </div>
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/6 m-3">
                        <div className="w-full aspect-w-4 aspect-h-3">
                            <Image
                                src="https://angel-prod-public-content.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/sites/7/2023/08/bds.jpg"
                                alt="Property Image"
                                className="rounded-t-md md:rounded-l-md md:rounded-t-none object-cover"
                            />
                        </div>
                    </div>
                    <div className="md:w-5/6 m-4">
                        <CardHeader>
                            <CardTitle>Biệt thự view biển giá hạt rẻ</CardTitle>
                            <CardDescription>
                                Lorem ipsum dolor sit amet consectetur. Cursus feugiat molestie in suspendisse faucibus ut. Egestas magna sagittis interdum interdum. Sapien vulputate iaculis orci at et pulvinar non ac..
                            </CardDescription>
                        </CardHeader>
                    </div>
                </div>
            </Card>



    )
}

export default RealEstateCard