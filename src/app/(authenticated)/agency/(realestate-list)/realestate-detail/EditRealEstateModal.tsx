import React from 'react'
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from '@radix-ui/react-icons';
import DialogCustom from '@/components/ui/dialogCustom';
import { EditForm } from './[id]/components/EditForm';

export const EditRealEstateModal = ({ id }) => {
    const [open, setOpen] = React.useState(false);


    return (
        <div>
            <Button
                className="rounded-full text-slate-50 bg-red-400 w-[42px] h-[42px] text-[24px] p-0 hover:bg-pink-500 transition ease-in-out duration-200 hover:scale-[1.2]"
                onClick={() => {
                    setOpen(true);
                }}>
                <Pencil1Icon />
            </Button>
            {open ? (
                <DialogCustom className="w-full lg:w-[60%] h-[80%] lg:h-[95%] flex items-center justify-center"
                    setIsModalOpen={setOpen}
                    isModalOpen={open}
                    warningOnClose={true}>
                    <div>
                        <h3>Chỉnh sửa thông tin bất động sản</h3>
                        <EditForm id={id} />
                    </div>
                </DialogCustom>
            ) : null}

        </div>
    )
}

