import React from 'react'
import { FaDollarSign } from 'react-icons/fa'
import { FaHome } from 'react-icons/fa'
import { MdApartment, MdBathtub, MdBed } from 'react-icons/md'
import { HiOutlineOfficeBuilding } from 'react-icons/hi'
import { GiIsland } from 'react-icons/gi'
import { formatNumberWithCommas } from '@/lib/utils';
import { IoLocationOutline } from 'react-icons/io5'


export const RealEstateInfo = ({ item }) => {
    return (
        <div className='text-base flex flex-col gap-1 mt-1'>
            <div className='flex flex-row'>
                <FaDollarSign className='mt-1' />
                <p className='text-xl'>{formatNumberWithCommas(item.gia.toString())} {" VNĐ"}</p>
            </div>
            <div className='flex flex-row'>
                {item.loaiHinh?.loaiBDS?.name === "Căn hộ" ? (
                    <MdApartment className='mt-1' />
                ) : item.loaiHinh?.loaiBDS?.name === "Nhà ở" ? (
                    <FaHome className='mt-1' />
                ) : item.loaiHinh?.loaiBDS?.name === "Văn phòng" ? (
                    <HiOutlineOfficeBuilding className='mt-1' />
                ) : (
                    <GiIsland />
                )}
                <p className='ml-1'>{item.loaiHinh?.name}</p> 
                 <MdBathtub className='mt-1 ml-2'/> <p>{item.soPhongTam} phòng tắm</p> <MdBed className='mt-1 ml-2'/> <p>{item.soPhongNgu} phòng ngủ</p>
            </div>
            <div className='flex flex-row text-gray-400'>
                <IoLocationOutline className='mt-1' />
                <p className='ml-1'>{item?.diaChi}</p>
            </div>
        </div>
    )
}

