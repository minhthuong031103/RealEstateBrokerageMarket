import React from 'react';
import { CheckCircledIcon, LockClosedIcon } from '@radix-ui/react-icons';
import { BiXCircle } from 'react-icons/bi';

export const RealEstateStatus = ({ trangthai }) => {
    const statusIconMapping = {
        "Đã duyệt": <CheckCircledIcon className="mr-2" />,
        "Đã khóa": <LockClosedIcon className="mr-2" />,
        "Chờ duyệt": <LockClosedIcon className="mr-2" />,
        "Không duyệt": <BiXCircle className="mr-2" />
    };

    const icon = statusIconMapping[trangthai];

    return (
        <div>
            {icon && (
                <div className="flex items-center m-4">
                    {icon}
                    <p className="font-medium">{trangthai}</p>
                </div>
            )}
        </div>
    );
}