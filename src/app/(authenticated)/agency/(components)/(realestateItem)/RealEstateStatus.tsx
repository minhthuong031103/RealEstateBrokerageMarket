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

    const statusColorMapping = {
        "Đã duyệt": "text-blue-500",
        "Đã khóa": "text-yellow-500",
        "Chờ duyệt": "text-yellow-500",
        "Không duyệt": "text-red-500"
    };

    const textColorClass = statusColorMapping[trangthai];

    const statusTextMapping = {
        "Đã duyệt": "Bài viết bất động sản đã được phê duyệt.",
        "Đã khóa": "Bài viết bất động sản đã bị khóa.",
        "Chờ duyệt": "Bài viết bất động sản đang chờ duyệt",
        "Không duyệt": "Bài viết bất động sản không được duyệt"
    };

    const statusText = statusTextMapping[trangthai];

    return (
        <div>
            {icon && (
                <div className={`flex items-center m-4 ${textColorClass}`}>
                    {icon}
                    <p className="font-medium">{statusText}</p>
                </div>
            )}
        </div>
    );
}