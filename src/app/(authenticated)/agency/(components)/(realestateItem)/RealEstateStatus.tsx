import React from "react";
import { TiLockClosed } from "react-icons/ti";
import { FaRegClock } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { PiXCircleBold } from "react-icons/pi";

export const RealEstateStatus = ({ trangthai }) => {
  const statusIconMapping = {
    "Đã duyệt": <IoMdCheckmarkCircleOutline className="mr-2 font-semibold" />,
    "Đã khóa": <TiLockClosed className="mr-2 font-semibold" />,
    "Chờ duyệt": <FaRegClock className="mr-2 font-semibold" />,
    "Không duyệt": <PiXCircleBold className="mr-2 font-semibold" />,
  };

  const icon = statusIconMapping[trangthai];

  const statusColorMapping = {
    "Đã duyệt": "text-emerald-500",
    "Đã khóa": "text-red-500",
    "Chờ duyệt": "text-blue-500",
    "Không duyệt": "text-black",
  };

  const textColorClass = statusColorMapping[trangthai];

  const statusTextMapping = {
    "Đã duyệt": "Bài viết đã được duyệt.",
    "Đã khóa": "Bài viết đã bị khóa.",
    "Chờ duyệt": "Bài viết đang chờ duyệt",
    "Không duyệt": "Bài viết không được duyệt",
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
