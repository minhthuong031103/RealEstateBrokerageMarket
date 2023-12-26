/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import { useRole } from "@/hooks/useRole";
import DialogCustom from "@/components/ui/dialogCustom";
import Logo from "@/components/logo";
import { SelectLoaiDoiTac } from "./SelectLoaiDoiTac";
import { FaRegClock, FaUserLock } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { useDoiTac } from "@/hooks/useDoiTac";
import { ThongTinForm } from "./(profile)/(edit)/ThongTinForm";

function AgencyRegisterModal({ session }) {
  const { getUserRole } = useRole();
  const [userRole, setUserRole] = useState("");
  const [duyetDoiTac, setDuyetDoiTac] = useState("");
  const [duyetKhachHang, setDuyetKhachHang] = useState("");
  const [isUser, setIsuser] = React.useState(false);
  const [loaiDoiTac, setLoaiDoiTacValue] = React.useState(null);
  const [canhan, setCaNhan] = React.useState(false);
  const [doanhnghiep, setDoanhNghiep] = React.useState(false);
  const { fetchDoiTacTheoId } = useDoiTac();
  const { data: userInfo } = useQuery({
    queryKey: ["userInfo", session?.user?.id],
    queryFn: async () => {
      const res = await fetchDoiTacTheoId(session?.user?.id);
      return res?.[0];
    },
  });

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const userRoleFetch = await getUserRole(session?.user?.id);
        const role = userRoleFetch?.role;
        const duyetDoiTac = userRoleFetch?.duyetDoiTac;
        const duyetKhachHang = userRoleFetch?.duyetKhachHang;
        setUserRole(role);
        if (role === "khach_hang") {
          setIsuser(true);
        }
        setDuyetDoiTac(duyetDoiTac);
        setDuyetKhachHang(duyetKhachHang);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);
  return userRole === "khach_hang" ? (
    <div>
      {userRole === "khach_hang" && !duyetDoiTac ? (
        <DialogCustom
          className="w-full lg:w-[70%] h-[80%] lg:h-[95%] flex items-center justify-center"
          isModalOpen={isUser}
          notShowClose={true}
        >
          <div>
            <Logo />
            <h1 className="ml-4 font-medium mb-3">
              Đăng ký để trở thành đối tác với UITEstate.
            </h1>
            <SelectLoaiDoiTac
              setLoaiDoiTacValue={setLoaiDoiTacValue}
              setCaNhan={setCaNhan}
              setDoanhNghiep={setDoanhNghiep}
              canhan={canhan}
              doanhnghiep={doanhnghiep}
            />
            <div className="flex flex-col space-y-3">
              {loaiDoiTac ? (
                <ThongTinForm loaiDoiTac={loaiDoiTac} userInfo={userInfo} />
              ) : null}
            </div>
          </div>
        </DialogCustom>
      ) : (
        <DialogCustom
          className="w-full lg:w-[50%] h-[40%] lg:h-[30%] flex items-center justify-center"
          isModalOpen={isUser}
          notShowClose={true}
        >
          <div>
            <Logo />
            <div className="ml-4 flex flex-row">
              <FaRegClock className="text-red-400 w-6 h-6" />
              <h1 className="ml-4 text-xl font-semibold text-slate-800">
                Đăng ký của bạn đang chờ được phê duyệt.
              </h1>
            </div>
            <h1 className="ml-4 text-slate-800 mt-3">
              Vui lòng quay lại sau. Cảm ơn bạn đã sử dụng dịch vụ của chúng
              tôi.
            </h1>
          </div>
        </DialogCustom>
      )}
    </div>
  ) : userRole === "doi_tac" && duyetDoiTac === "da_khoa" ? (
    <div>
      <DialogCustom
        className="w-full lg:w-[60%] h-[40%] lg:h-[30%] flex items-center justify-center"
        isModalOpen={true}
        notShowClose={true}
      >
        <div>
          <Logo />
          <div className="ml-4 flex flex-row">
            <FaUserLock className="text-red-400 w-6 h-6" />
            <h1 className="ml-4 text-xl font-semibold text-slate-800">
              Tài khoản của bạn đã bị khóa. Vui lòng liên hệ trực tiếp với quản
              lý văn phòng để được xử lý.
            </h1>
          </div>
          <h1 className="ml-4 text-slate-800 mt-3">
            Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.
          </h1>
        </div>
      </DialogCustom>
    </div>
  ) : null;
}

export default AgencyRegisterModal;
