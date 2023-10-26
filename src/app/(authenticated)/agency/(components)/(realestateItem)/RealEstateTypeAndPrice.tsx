import React from 'react'
import { BiDollar } from 'react-icons/bi'
import { FaHome } from 'react-icons/fa'
import { MdApartment } from 'react-icons/md'
import { HiOutlineOfficeBuilding } from 'react-icons/hi'
import { GiIsland } from 'react-icons/gi'
import { formatNumberWithCommas } from '@/lib/utils';


export const RealEstateTypeAndPrice = ({ loaiHinh, gia }) => {
    return (
        <div className='text-base flex flex-row gap-1 mt-1'>
            {loaiHinh?.loaiBDS?.name === "Căn hộ" ? (
                <MdApartment className='mt-1'/>
            ) : loaiHinh?.loaiBDS?.name === "Nhà ở" ? (
                <FaHome className='mt-1'/>
            ) : loaiHinh?.loaiBDS?.name === "Văn phòng" ? (
                <HiOutlineOfficeBuilding className='mt-1'/>
            ) : (
                <GiIsland />
            )}
            {" - "}
            {loaiHinh?.name}
            <BiDollar className='mt-1'/>
            {formatNumberWithCommas(gia.toString())} {" VNĐ"}
        </div>
    )
}

