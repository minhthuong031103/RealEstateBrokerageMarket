'use client';
import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import { useOffice } from '@/hooks/useOffice';
import { useEffect, useState } from 'react';
import { AiOutlinePhone } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import { IoLocationOutline } from 'react-icons/io5';

const Footer = () => {
  const [info, setInfo] = useState();
  const { fetchOffice } = useOffice();
  useEffect(() => {
    const getOfficeInformation = async () => {
      await fetchOffice().then((data) => {
        setInfo(data);
      });
    };
    getOfficeInformation();
  }, []);
  return (
    <footer className="bg-slate-800 text-white pt-14 pb-3">
      <div
        className="w-full px-5
  md:px-10 mx-auto flex justify-between flex-col md:flex-row gap-[50px] md:gap-0"
      >
        {/* LEFT START */}
        <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] flex-col md:flex-row">
          {/* MENU START */}
          <div className="flex flex-col gap-3 shrink-0">
            <Link href={'/bat-dong-san'}>
              <div className="font-oswald font-medium text-sm cursor-pointer">
                Tìm kiếm bất động sản
              </div>
            </Link>
            <Link href={'/doi-tac'}>
              <div className="font-oswald font-medium text-sm cursor-pointer">
                Tìm kiếm đối tác
              </div>
            </Link>
            <Link href={'/agency'}>
              <div className="font-oswald font-medium text-sm cursor-pointer">
                Trở thành đối tác
              </div>
            </Link>
          </div>
          {/* MENU END */}

          {/* NORMAL MENU START */}
          <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] shrink-0">
            {/* MENU START */}
            <div className="flex flex-col gap-3">
              <div className="font-oswald font-medium text-sm">Liên hệ:</div>
              <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer flex flex-row w-[500px] gap-2">
                <IoLocationOutline className="text-[16px] mt-1" />
                {info?.address}
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer flex flex-row w-[500px] gap-2">
                <AiOutlinePhone className="mt-1 text-[16px]" />
                {info?.phoneNumber}
              </div>
              <div className="text-sm text-white/[0.5] hover:text-white cursor-pointer flex flex-row w-[500px] gap-2">
                <HiOutlineMail className="mt-1 text-[16px]" />
                {info?.email}
              </div>
            </div>
            {/* MENU END */}

            {/* MENU END */}
          </div>
          {/* NORMAL MENU END */}
        </div>
        {/* LEFT END */}

        {/* RIGHT START */}
        <div className="flex gap-4 justify-center md:justify-start">
          <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
            <FaFacebookF size={20} />
          </div>
          <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
            <FaTwitter size={20} />
          </div>
          <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
            <FaYoutube size={20} />
          </div>
          <div className="w-10 h-10 rounded-full bg-white/[0.25] flex items-center justify-center text-black hover:bg-white/[0.5] cursor-pointer">
            <FaInstagram size={20} />
          </div>
        </div>
        {/* RIGHT END */}
      </div>
      <div
        className="w-full px-5
  md:px-10 mx-auto flex justify-between mt-10 flex-col md:flex-row gap-[10px] md:gap-0"
      >
        {/* LEFT START */}
        <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer text-center md:text-left">
          © 2023 UITEstate, Inc. All Rights Reserved
        </div>
        {/* LEFT END */}

        {/* RIGHT START */}
        <div className="flex gap-2 md:gap-5 text-center md:text-left flex-wrap justify-center">
          <Link href={'/chinh-sach'}>
            <div className="text-[12px] text-white/[0.5] hover:text-white cursor-pointer">
              Chính sách sử dụng
            </div>
          </Link>
        </div>
        {/* RIGHT END */}
      </div>
    </footer>
  );
};

export default Footer;
