import React from "react";
import { CheckCircledIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { BiXCircle } from "react-icons/bi";

export const RealEstateStatus = ({ trangthai }) => {
  const statusIconMapping = {
    "Đã duyệt": <CheckCircledIcon className="mr-2" />,
    "Đã khóa": <LockClosedIcon className="mr-2" />,
    "Chờ duyệt": <LockClosedIcon className="mr-2" />,
    "Không duyệt": <BiXCircle className="mr-2" />,
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
          <p className="font-medium">{statusText}</p>
        </div>
      )}
    </div>
  );
};
