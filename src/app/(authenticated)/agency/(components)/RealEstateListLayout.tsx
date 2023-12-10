'use client';

import React, { useEffect, useState } from 'react';
import ListItemRealEstate from './ListItemRealEstate';
import SearchBarAndCreate from './SearchBarAndCreate';

export interface searchType {
  searchWord: string;
  location: string;
  type: string;
  branch: string;
  isRent: string;
  loaiCanHo: string;
  loaiNhaO: string;
  loaiVanPhong: string;
  loaiDatDai: string;
  huongBanCong: string;
  huongCuaChinh: string;
  huongDat: string;
  soPhongNgu: string;
  soPhongTam: string;
  minPrice: string;
  maxPrice: string;
  minSquare: string;
  maxSquare: string;
  trangThai: string;
}

export function RealEstateListLayout({ session }) {
  const [searchProps, setSearchProps] = useState<searchType>({
    searchWord: '',
    location: '',
    type: '',
    branch: '',
    isRent: '',
    loaiCanHo: '',
    loaiNhaO: '',
    loaiVanPhong: '',
    loaiDatDai: '',
    huongBanCong: '',
    huongCuaChinh: '',
    huongDat: '',
    soPhongNgu: '',
    soPhongTam: '',
    minPrice: '',
    maxPrice: '',
    minSquare: '',
    maxSquare: '',
    trangThai: '',
  });

  useEffect(() => {
    const search = {
      searchWord: '',
      location: '',
      type: '',
      branch: '',
      isRent: '',
      loaiCanHo: '',
      loaiNhaO: '',
      loaiVanPhong: '',
      loaiDatDai: '',
      huongBanCong: '',
      huongCuaChinh: '',
      huongDat: '',
      soPhongNgu: '',
      soPhongTam: '',
      minPrice: '',
      maxPrice: '',
      minSquare: '',
      maxSquare: '',
      trangThai: '',
    };
    setSearchProps(search);
  }, []);

  return (
    <div>
      <SearchBarAndCreate setSearchProps={setSearchProps} />
      <ListItemRealEstate searchProps={searchProps} id={session?.user?.id} />
    </div>
  );
}

export default RealEstateListLayout;
