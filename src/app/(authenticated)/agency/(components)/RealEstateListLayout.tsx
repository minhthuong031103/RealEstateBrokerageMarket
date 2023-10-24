'use client';


import React, { useEffect, useState } from 'react';
import ListItemRealEstate from './ListItemRealEstate';
import { SearchComponent } from '@/app/(public)/bat-dong-san/components/SearchComponent';

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
        };
        setSearchProps(search);
    }, []);

    return (
        <div>
            <SearchComponent setSearchProps={setSearchProps} />
            <ListItemRealEstate searchProps={searchProps} id={session?.user?.id} />
        </div>
    );
}

export default RealEstateListLayout;
