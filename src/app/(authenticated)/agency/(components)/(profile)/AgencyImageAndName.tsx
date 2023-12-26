"use client";

import React, { useEffect } from "react";
import { CiEdit } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import DialogCustom from "@/components/ui/dialogCustom";
import { useDoiTac } from "@/hooks/useDoiTac";
import { useQuery } from "@tanstack/react-query";
import { ThongTinForm } from "./(edit)/ThongTinForm";

function AgencyImageAndName({ session }) {
  const [loaiDoiTac, setLoaiDoiTacValue] = React.useState("");
  const [isOpen, setOpen] = React.useState(false);
  const { fetchDoiTacTheoId } = useDoiTac();

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo", session?.user?.id],
    queryFn: async () => {
      const res = await fetchDoiTacTheoId(session?.user?.id);
      return res?.[0];
    },
  });

  useEffect(() => {
    if (userInfo) {
      if (userInfo?.anhGiayPhepKinhDoanh !== null) {
        setLoaiDoiTacValue("doanhnghiep");
      } else {
        setLoaiDoiTacValue("canhan");
      }
    }
  }, [userInfo]);

  return (
    <div className="flex flex-row justify-between">
      <h1 className="text-xl font-semibold">Hồ sơ đối tác</h1>
      <Button
        className="mt-2 md:mt-0 flex flex-row bg-transparent border-1 border-red-400 text-black transition ease-in-out hover:bg-white hover:text-red-400 hover:scale-105 gap-3"
        onClick={() => {
          setOpen(true);
        }}
      >
        Chỉnh sửa <CiEdit className="w-6 h-6" />
      </Button>

      <DialogCustom
        className="w-full lg:w-[70%] h-[80%] lg:h-[95%] flex items-center justify-center"
        isModalOpen={isOpen}
        setIsModalOpen={setOpen}
        notShowClose={false}
      >
        <div>
          <div className="flex flex-col space-y-3">
            {loaiDoiTac ? (
              <ThongTinForm loaiDoiTac={loaiDoiTac} userInfo={userInfo} />
            ) : null}
          </div>
        </div>
      </DialogCustom>
    </div>
  );
}

export default AgencyImageAndName;
