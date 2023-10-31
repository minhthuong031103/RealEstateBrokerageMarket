import React from 'react'
import { FaHome } from 'react-icons/fa'
import { MdApartment} from 'react-icons/md'
import { HiOutlineOfficeBuilding } from 'react-icons/hi'
import { GiIsland } from 'react-icons/gi'
import { formatNumberWithCommas } from '@/lib/utils';
import { IoLocationOutline } from 'react-icons/io5'
import { PiBathtub, PiBed } from 'react-icons/pi'


export const RealEstateInfo = ({ item }) => {
    return (
        <div className='text-base flex flex-col gap-1 mt-1'>
            <div className='flex flex-row'>
                <p className='text-xl text-red-400 font-semibold'>{"₫"}{formatNumberWithCommas(item.gia.toString())} </p> <p className='text-lg text-red-400'>/Tháng</p>
            </div>
            <div className='flex flex-row gap-4'>
                <div className='flex flex-row'>
                    {item.loaiHinh?.loaiBDS?.name === "Căn hộ" ? (
                        <MdApartment className='mt-1 text-slate-500' />
                    ) : item.loaiHinh?.loaiBDS?.name === "Nhà ở" ? (
                        <FaHome className='mt-1 text-slate-500' />
                    ) : item.loaiHinh?.loaiBDS?.name === "Văn phòng" ? (
                        <HiOutlineOfficeBuilding className='mt-1 text-slate-500' />
                    ) : (
                        <GiIsland className='mt-1 text-slate-500' />
                    )}
                    <p className='ml-1 text-slate-500'>{item.loaiHinh?.name}</p>
                </div>
                <div className='flex flex-row'>
                    <PiBathtub className='mt-1 ml-2 text-slate-500' /> <p className='ml-1 text-slate-500'>{item.soPhongTam} phòng tắm</p>
                </div>
                <div className='flex flex-row'>
                    <PiBed className='mt-1 ml-2 text-slate-500' /> <p className='ml-1 text-slate-500'>{item.soPhongNgu} phòng ngủ</p>
                </div>
            </div>
            <div className='flex flex-row text-slate-500'>
                <IoLocationOutline className='mt-1' />
                <p className='ml-1'>{item?.diaChi}</p>
            </div>
        </div>
    )
}

