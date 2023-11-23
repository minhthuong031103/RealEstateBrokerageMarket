import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useBaiViet } from "@/hooks/useBaiViet";
import Loader from "@/components/Loader";

export const CompleteButton = ({ setOpenComplete, id }) => {
  const { onUpdateBaiViet } = useBaiViet();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {
    setIsSubmitting(true);
    const data = {
      nhan: "Hoàn thành",
    };
    const success = await onUpdateBaiViet(id, data);
    if (success) {
      setOpenComplete(false);
    }
  };

  return (
    <div>
      {isSubmitting ? (
        <div className="flex h-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="h-full space-y-3">
          <p className="font-semibold">Xác nhận</p>
          <p>Chỉnh sửa nhãn hoàn thành cho bài đăng này</p>
          <div className="flex flex-row justify-end gap-3 mt-3">
            <Button
              disabled={isSubmitting}
              onClick={() => {
                onSubmit();
              }}
              className="border-1 border-emerald-400 text-emerald-400 bg-transparent hover:bg-emerald-400 hover:text-white"
            >
              Xác nhận
            </Button>
            <Button
              disabled={isSubmitting}
              onClick={() => {
                setOpenComplete(false);
              }}
              className="bg-slate-800 text-white hover:bg-black"
            >
              Huỷ
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
