import { Button } from '@/components/ui/button'
import React, { useState } from 'react';
import { useBaiViet } from '@/hooks/useBaiViet'
import { Spinner } from '@nextui-org/react';

export const FinishedButton = ({ setOpenComplete, id }) => {

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
            <Button
                disabled={isSubmitting}
                onClick={() => {
                    onSubmit();
                }}
                className="w-[30%]"
            >
                Xác nhận
            </Button>
            {isSubmitting && (
                <Spinner size="lg" />
            )}
        </div>
    )
}

