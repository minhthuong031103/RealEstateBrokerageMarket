'use client';

import React from 'react';
import { useState } from 'react';
import { RealEstateCard } from './RealEstateCard';
// import { useBaiVietDoiTac } from '@/hooks/useBaiVietDoiTac';
import { useQuery } from '@tanstack/react-query';
import { useBatDongSan } from '@/hooks/useBatDongSan';
import { searchType } from './RealEstateListLayout';
import { Pagination } from '@nextui-org/react';
import Loader from '@/components/Loader';

type props = {
  searchProps: searchType | unknown;
  id: number;
};

function ListItemRealEstate({ searchProps, id }: props) {
  const [currentPage, setCurrentPage] = useState(1);
  const { fetchAllBatDongSanCuaDoiTacTatCaTrangThai } = useBatDongSan();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { data } = useQuery({
    queryKey: [
      ['bat-dong-san', currentPage],
      ['props', searchProps],
      ['iduser', id],
    ],
    queryFn: () =>
      fetchAllBatDongSanCuaDoiTacTatCaTrangThai(currentPage, searchProps, id),
    staleTime: 60 * 1000 * 1,
    keepPreviousData: true,
    onSuccess: () => {
      setIsLoaded(true);
    },
  });

  const ref = React.useRef(null);

  const onPageChange = (page) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setCurrentPage(page);
  };

  // const [isDefault, setIsDefault] = useState(true);
  // const [isDefaultPrice, setIsDefaultPrice] = useState(true);

  return (
    <div>
      {!isLoaded ? (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="mr-6 mt-4 bg-slate-50">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mt-6">
            {data?.data.map((item) => (
              <RealEstateCard item={item} key={`realestate-${item.id}`} />
            ))}
          </div>
          <div className="flex justify-center p-6">
            <Pagination
              showControls
              total={data?.totalPages}
              initialPage={1}
              onChange={(page) => {
                onPageChange(page);
              }}
              page={currentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ListItemRealEstate;
