import React from 'react'
import { Button } from "@/components/ui/button";
import { CheckIcon, Pencil1Icon } from '@radix-ui/react-icons';
import DialogCustom from '@/components/ui/dialogCustom';
import { EditForm } from './EditForm';
import { MdOutlinePreview } from 'react-icons/md';
import { ChiTietComponent } from '../(realestate-list)/realestate-detail/[id]/components/(detail)/ChiTietComponent';
import { CompleteButton } from '../(realestate-list)/realestate-detail/[id]/components/CompleteButton';

export const RealEstateModalList = ({ id }) => {
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openPreview, setOpenPreview] = React.useState(false);
    const [openComplete, setOpenComplete] = React.useState(false);

    return (
        <div className='flex flex-row gap-4'>
            <Button
                className="rounded-full text-slate-50 bg-black w-[42px] h-[42px] text-[24px] p-0 hover:bg-black transition ease-in-out duration-200 hover:scale-[1.2]"
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
                className="rounded-full text-slate-50 bg-black w-[42px] h-[42px] text-[24px] p-0 hover:bg-black transition ease-in-out duration-200 hover:scale-[1.2]"
                onClick={() => {
                    setOpenPreview(true);
                }}>
                <MdOutlinePreview />
            </Button>
            {openPreview ? (
                <DialogCustom className="w-full lg:w-[80%] h-[80%] lg:h-[95%] flex items-center justify-center"
                    setIsModalOpen={setOpenPreview}
                    isModalOpen={openPreview}
                    warningOnClose={true}>
                    <ChiTietComponent id={id} />
                </DialogCustom>
            ) : null}
            <Button
                className="rounded-full text-slate-50 bg-black w-[42px] h-[42px] text-[24px] p-0 hover:bg-black transition ease-in-out duration-200 hover:scale-[1.2]"
                onClick={() => {
                    setOpenComplete(true);
                }}>
                <CheckIcon />
            </Button>
            {openComplete ? (
                <DialogCustom className="w-full lg:w-[30%] h-[30%] lg:h-[95%] flex items-center justify-center"
                    setIsModalOpen={setOpenComplete}
                    isModalOpen={openComplete}
                    warningOnClose={true}
                    notShowClose={true}
                    >
                    <CompleteButton setOpenComplete={setOpenComplete} id={id}/>
                    
                </DialogCustom>
            ) : null}
        </div>
    )
}

