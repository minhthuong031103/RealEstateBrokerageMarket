import React from 'react'
import { CheckCircledIcon, LockClosedIcon } from '@radix-ui/react-icons';
import { BiXCircle } from 'react-icons/bi';


export const RealEstateStatus = ({ trangthai }) => {
    return (
        <div>
            {trangthai === "Đã duyệt" ? (
                <div className="flex items-center m-4">
                    <CheckCircledIcon className="mr-2"></CheckCircledIcon>
                    <p className="font-medium">{trangthai}</p>
                </div>
            ) : null}

            {trangthai === "Đã khóa" ? (
                <div className="flex items-center m-4">
                    <LockClosedIcon className="mr-2"></LockClosedIcon>
                    <p className="font-medium">{trangthai}</p>
                </div>
            ) : null}

            {trangthai === "Chờ duyệt" ? (
                <div className="flex items-center m-4">
                    <LockClosedIcon className="mr-2"></LockClosedIcon>
                    <p className="font-medium">{trangthai}</p>
                </div>
            ) : null}

            {trangthai === "Không duyệt" ? (
                <div className="flex items-center m-4">
                    <BiXCircle className='mr-2'/>
                    <p className="font-medium">{trangthai}</p>
                </div>
            ) : null}
        </div>
    )
}

