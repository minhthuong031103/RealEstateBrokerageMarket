'use client';

import { SelectTrangThai } from './SelectTrangThai';
import React, { useEffect } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { searchType } from './RealEstateListLayout';
import dynamic from 'next/dynamic';
const AddPostModal = dynamic(() => import('./AddPostModal'), {
  ssr: false,
});
type props = {
  setSearchProps: Dispatch<SetStateAction<searchType>>;
};

export function SearchBarAndCreate({ setSearchProps }: props) {
  const [trangThaiValue, setTrangThaiValue] = React.useState();
  function onSubmit() {
    setSearchProps({
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
      trangThai: trangThaiValue,
    });
  }

  useEffect(() => {
    if (trangThaiValue) {
      onSubmit();
    } else if (trangThaiValue == '') {
      onSubmit();
    }
  }, [trangThaiValue]);

  return (
    <div className="flex flex-col md:flex-row md:mr-6 justify-between gap-2">
      <SelectTrangThai setTrangThaiValue={setTrangThaiValue} />
      <AddPostModal />
    </div>
  );
}

export default SearchBarAndCreate;
