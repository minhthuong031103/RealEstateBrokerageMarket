'use client';
import { Button } from '@/components/ui/button';
import { useBatDongSan } from '@/hooks/useBatDongSan';
import { useState } from 'react';
import { HiSortAscending } from 'react-icons/hi';
import { ListItemComponent } from '../../bat-dong-san/(components)/ListItemComponent';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export function ListComponent({ session }) {
  const userId = session?.user?.id;
  const { fetchAllBatDongSanYeuThich } = useBatDongSan();
  const { data } = useQuery({
    queryKey: [['userId', userId]],
    queryFn: () => fetchAllBatDongSanYeuThich(userId),
    staleTime: 60 * 1000 * 1,
    keepPreviousData: true,
  });

  const [isDefault, setIsDefault] = useState(true);
  const [isDefaultPrice, setIsDefaultPrice] = useState(true);

  const sort = () => {
    if (isDefault) {
      data?.baiViets?.sort((a, b) => {
        return (
          new Date(b?.ngayDang).getTime() - new Date(a?.ngayDang).getTime()
        );
      });
    } else
      data?.baiViets?.sort((a, b) => {
        return (
          new Date(a?.ngayDang).getTime() - new Date(b?.ngayDang).getTime()
        );
      });
    setIsDefault((prev) => !prev);
  };
  const sortPrice = () => {
    if (isDefaultPrice) {
      data?.baiViets?.sort((a, b) => {
        return b?.gia - a?.gia;
      });
    } else
      data?.baiViets?.sort((a, b) => {
        return a?.gia - b?.gia;
      });
    setIsDefaultPrice((prev) => !prev);
  };
  return (
    <div className="mr-6">
      <div className="flex justify-between p-4 rounded-xl bg-white border-[1px] shadow-sm">
        <div className=" text-[14px] text-gray-500 flex my-auto">
          {data?.baiViets?.length} kết quả
        </div>
        <div className="flex flex-row">
          <p className="text-[14px] text-neutral-800 flex my-auto mr-2 font-semibold">
            Sắp xếp :{' '}
          </p>
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant={'outline'}
                size={'sm'}
                className="bg-white text-neutral-800 text-base hover:bg-gray-100 hover:text-neutral active:scale-75 transition ease-in-out duration-200"
              >
                <HiSortAscending />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Filter">
              <DropdownItem key={'day'} color={'default'} onClick={sort}>
                Theo ngày đăng
              </DropdownItem>
              <DropdownItem key={'price'} color={'default'} onClick={sortPrice}>
                Theo giá
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {data?.baiViets?.map((item) => (
          <ListItemComponent item={item} />
        ))}
      </div>
    </div>
  );
}
