"use client";
import { useDoiTac } from "@/hooks/useDoiTac";
import { useState } from "react";
import { ListItemComponent } from "./ListItemComponent";
import { Pagination } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export function ListComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const { fetchAllDoiTac } = useDoiTac();
  const { data } = useQuery({
    queryKey: ["doi-tac", currentPage],
    queryFn: () => fetchAllDoiTac(currentPage),
    staleTime: 60 * 1000 * 1,
    keepPreviousData: true,
  });
  const ref = React.useRef(null);

  //Set page state when change review page index
  const onPageChange = (page) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setCurrentPage(page);
  };

  return (
    <div ref={ref} className="mr-6">
      <div className="flex justify-start p-4 rounded-xl bg-white border-[1px] shadow-sm">
        <div className=" text-[14px] text-gray-500 flex my-auto">
          {data?.totalItems} kết quả
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {data?.data.map((item) => (
          <ListItemComponent item={item} />
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
  );
}
