'use client';

import React, { useState, useEffect } from 'react'
import { useRole } from '@/hooks/useRole';
import DialogCustom from '@/components/ui/dialogCustom'
import Logo from '@/components/logo';
import { SelectLoaiDoiTac } from './SelectLoaiDoiTac';
import { ThongTinForm } from './(agencyRegister)/ThongTinForm';


function AgencyRegisterModal({ session }) {
    const { getUserRole } = useRole();
    const [userRole, setUserRole] = useState('');
    const [duyetDoiTac, setDuyetDoiTac] = useState('');
    const [isUser, setIsuser] = React.useState(false);
    const [loaiDoiTac, setLoaiDoiTacValue] = React.useState(null);
    const [canhan, setCaNhan] = React.useState(false);
    const [doanhnghiep, setDoanhNghiep] = React.useState(false);



    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const userRole = await getUserRole(session?.user?.id);
                const role = userRole?.role;
                const duyetDoiTac = userRole?.duyetDoiTac;
                setUserRole(role);
                if (role === 'user') {
                    setIsuser(true);
                }
                setDuyetDoiTac(duyetDoiTac);
                console.log(userRole);
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        };

        fetchUserRole();
    }, []);
    return userRole === 'user' ? (
        <div>
            {userRole === 'user' && duyetDoiTac === '' ? (
                <DialogCustom className='w-full lg:w-[70%] h-[80%] lg:h-[95%] flex items-center justify-center' isModalOpen={isUser} notShowClose={true}>
                    <div>
                        <Logo />
                        <h1>Đăng ký để trở thành đối tác với UIT RealEstate.</h1>
                        <SelectLoaiDoiTac
                            setLoaiDoiTacValue={setLoaiDoiTacValue}
                            setCaNhan={setCaNhan}
                            setDoanhNghiep={setDoanhNghiep}
                            canhan={canhan}
                            doanhnghiep={doanhnghiep}
                        />
                        <div className="flex flex-col space-y-3">
                            {loaiDoiTac ? (
                                <ThongTinForm
                                    loaiDoiTac={loaiDoiTac} />
                            ) : null}
                        </div>
                    </div>
                </DialogCustom>
            ) : duyetDoiTac === 'decline' ? (
                <DialogCustom className='w-full lg:w-[70%] h-[80%] lg:h-[95%] flex items-center justify-center' isModalOpen={isUser} notShowClose={true}>
                    <div>
                        <Logo />
                        <h1>Đăng ký của bạn đã bị từ chối.</h1>
                    </div>
                </DialogCustom>
            ) : (
                <DialogCustom className='w-full lg:w-[70%] h-[80%] lg:h-[95%] flex items-center justify-center' isModalOpen={isUser} notShowClose={true}>
                    <div>
                        <Logo />
                        <h1>Đăng ký của bạn đang chờ được phê duyệt.</h1>
                    </div>
                </DialogCustom>
            )}
        </div>
    ) : null;
}

export default AgencyRegisterModal;
