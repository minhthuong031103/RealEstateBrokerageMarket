import { Button } from '@/components/ui/button'
import React, { useState } from 'react';
import { useBaiViet } from '@/hooks/useBaiViet'
import Loader from '@/components/Loader';

export const CompleteButton = ({ setOpenComplete, id }) => {

    const { onUpdateBaiViet } = useBaiViet();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async () => {
        setIsSubmitting(true);
        const data = {
            nhan: "Hoàn thành"
        }
        const success = await onUpdateBaiViet(id, data);
        if (success) {
            setOpenComplete(false);
        }
    }

    return (
        <div className='grid grid-rows-1 bottom-0'>
            {isSubmitting ? (
                <div className="flex h-full items-center justify-center">
                    <Loader />
                </div>
            ) : (
                <div className='h-full items-center justify-center'>
                    <p>Xác nhận hoàn thành cho bất động sản này?</p>
                    <Button
                        disabled={isSubmitting}
                        onClick={() => {
                            onSubmit();
                        }}
                        className="w-[30%] mt-5"
                    >
                        Xác nhận
                    </Button>
                    <Button
                        disabled={isSubmitting}
                        onClick={() => {
                            setOpenComplete(false);
                        }}
                        className="w-[30%] ml-2 mt-5"
                    >
                        Huỷ
                    </Button>
                </div>
            )}
        </div>
    )
}

