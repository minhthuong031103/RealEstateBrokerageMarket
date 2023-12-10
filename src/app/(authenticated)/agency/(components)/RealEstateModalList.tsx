import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckIcon, Pencil1Icon } from '@radix-ui/react-icons';
import DialogCustom from '@/components/ui/dialogCustom';
import dynamic from 'next/dynamic';
const EditForm = dynamic(() => import('./EditForm'), {
  ssr: false,
});
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { ChiTietComponent } from '../(realestate-list)/realestate-detail/[id]/components/(detail)/ChiTietComponent';
import { CompleteButton } from '../(realestate-list)/realestate-detail/[id]/components/CompleteButton';

export const RealEstateModalList = ({ id }) => {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openPreview, setOpenPreview] = React.useState(false);
  const [openComplete, setOpenComplete] = React.useState(false);

  return (
    <div className="flex flex-row gap-4">
      <Button
        className="rounded-full text-blue-500 border-1 border-blue-500 bg-transparent w-[42px] h-[42px] text-[24px] p-0 hover:bg-blue-500 hover:text-white transition ease-in-out duration-200 hover:scale-[1.2]"
        onClick={() => {
          setOpenEdit(true);
        }}
      >
        <Pencil1Icon />
      </Button>
      {openEdit ? (
        <DialogCustom
          className="w-full lg:w-[60%] h-[80%] lg:h-[95%] flex items-center justify-center"
          setIsModalOpen={setOpenEdit}
          isModalOpen={openEdit}
          warningOnClose={true}
        >
          <div>
            <EditForm id={id} />
          </div>
        </DialogCustom>
      ) : null}
      <Button
        className="rounded-full text-gray-400 border-1 border-gray-400 bg-transparent w-[42px] h-[42px] text-[24px] p-0 hover:bg-gray-400 hover:text-white transition ease-in-out duration-200 hover:scale-[1.2]"
        onClick={() => {
          setOpenPreview(true);
        }}
      >
        <HiOutlineMagnifyingGlass className="w-3 h-3" />
      </Button>
      {openPreview ? (
        <DialogCustom
          className="w-full lg:w-[80%] h-[80%] lg:h-[95%] flex items-center justify-center"
          setIsModalOpen={setOpenPreview}
          isModalOpen={openPreview}
          warningOnClose={true}
        >
          <ChiTietComponent id={id} />
        </DialogCustom>
      ) : null}
      <Button
        className="rounded-full text-emerald-500 border-1 border-emerald-500 bg-transparent w-[42px] h-[42px] text-[24px] p-0 hover:bg-emerald-500 hover:text-white transition ease-in-out duration-200 hover:scale-[1.2]"
        onClick={() => {
          setOpenComplete(true);
        }}
      >
        <CheckIcon />
      </Button>
      {openComplete ? (
        <DialogCustom
          className="w-full lg:w-[30%] h-[26%] flex items-center justify-center"
          setIsModalOpen={setOpenComplete}
          isModalOpen={openComplete}
          warningOnClose={true}
          notShowClose={true}
        >
          <CompleteButton setOpenComplete={setOpenComplete} id={id} />
        </DialogCustom>
      ) : null}
    </div>
  );
};
