import React from 'react';
import { TiLockClosed } from 'react-icons/ti';
import { FaRegClock } from 'react-icons/fa';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { PiXCircleBold } from 'react-icons/pi';

export const RealEstateStatus = ({ trangthai }) => {
  const statusIconMapping = {
    da_duyet: <IoMdCheckmarkCircleOutline className="mr-2 font-semibold" />,
    da_khoa: <TiLockClosed className="mr-2 font-semibold" />,
    cho_duyet: <FaRegClock className="mr-2 font-semibold" />,
    khong_duyet: <PiXCircleBold className="mr-2 font-semibold" />,
  };

  const icon = statusIconMapping[trangthai];

  const statusColorMapping = {
    da_duyet: 'text-emerald-500',
    da_khoa: 'text-red-500',
    cho_duyet: 'text-blue-500',
    khong_duyet: 'text-black',
  };

  const textColorClass = statusColorMapping[trangthai];

  const statusTextMapping = {
    da_duyet: 'Bài viết đã được duyệt.',
    da_khoa: 'Bài viết đã bị khóa.',
    cho_duyet: 'Bài viết đang chờ duyệt',
    khong_duyet: 'Bài viết không được duyệt',
  };

  const statusText = statusTextMapping[trangthai];

  return (
    <div>
      {icon && (
        <div className={`flex items-center mt-3 ml-4 ${textColorClass}`}>
          {icon}
          <p className="font-semibold text-sm">{statusText}</p>
        </div>
      )}
    </div>
  );
};
