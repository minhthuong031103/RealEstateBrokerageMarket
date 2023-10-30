import React from 'react'
import { Button } from "@/components/ui/button";
import { CheckIcon, Pencil1Icon } from '@radix-ui/react-icons';
import DialogCustom from '@/components/ui/dialogCustom';
import { EditForm } from './[id]/components/EditForm';
import { FinishedButton } from './[id]/components/FinishedButton';

export const EditRealEstateModal = ({ id }) => {
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openComplete, setOpenComplete] = React.useState(false);


    return (
        <div className='grid grid-cols-1 gap-4'>
            <Button
                className="rounded-full text-slate-50 bg-red-400 w-[42px] h-[42px] text-[24px] p-0 hover:bg-pink-500 transition ease-in-out duration-200 hover:scale-[1.2]"
                onClick={() => {
                    setOpenEdit(true);
                }}>
                <Pencil1Icon />
            </Button>
            {openEdit ? (
                <DialogCustom className="w-full lg:w-[60%] h-[80%] lg:h-[95%] flex items-center justify-center"
                    setIsModalOpen={setOpenEdit}
                    isModalOpen={openEdit}
                    warningOnClose={true}>
                    <div>
                        <EditForm id={id} />
                    </div>
                </DialogCustom>
            ) : null}
                    <Button
                className="rounded-full text-slate-50 bg-red-400 w-[42px] h-[42px] text-[24px] p-0 hover:bg-pink-500 transition ease-in-out duration-200 hover:scale-[1.2]"
                onClick={() => {
                    setOpenComplete(true);
                }}>
                <CheckIcon />
            </Button>
            {openComplete ? (
                <DialogCustom className="w-full lg:w-[40%] h-[40%] lg:h-[45%] flex items-center justify-center"
                    setIsModalOpen={setOpenComplete}
                    isModalOpen={openComplete}>
                    <div>
                        <p className='text-lg font-bold'>Xác nhận trạng thái hoàn thành mua bán bất động sản?</p>
                        <FinishedButton setOpenComplete={setOpenComplete} id={id} />
                    </div>
                </DialogCustom>
            ) : null}
        </div>
    )
}

