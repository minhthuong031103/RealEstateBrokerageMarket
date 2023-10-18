'use client';


import React, { useState, useEffect } from 'react'
import { useRole } from '@/hooks/useRole';
import DialogCustom from '@/components/ui/dialogCustom'
import Logo from '@/components/logo';



function AgencyRegisterModal({ session }) {
    const { getUserRole } = useRole();
    const [userRole, setUserRole] = useState(null);
    const [isUser, setIsuser] = React.useState(false);
    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                const userRole = await getUserRole(session?.user?.id);
                const role = userRole.role;
                setUserRole(role);
                if (role === 'user') {
                    setIsuser(true);
                }
            } catch (error) {
                console.error('Error fetching user role:', error);
            }
        };

        fetchUserRole();
    }, []);

    return userRole === 'user' ? (
        <div>
            <DialogCustom className='w-full lg:w-[70%] h-[80%] lg:h-[95%] flex items-center justify-center' isModalOpen={isUser} notShowClose={true}>
                <div>
                    <Logo/>
                    <h1>Đăng ký để trở thành đối tác với UIT RealEstate .</h1>
                    {/* <div className="w-1/2 mt-4">
                        <div className="mb-4">
                            <Label className="mb-4">Họ và tên</Label>
                            <Input className="w-full" type="text" placeholder="Họ và tên" />
                        </div>

                        <div className="mb-4">
                            <Label className="mb-4">Số điện thoại</Label>
                            <Input className="w-full" type="text" placeholder="Số điện thoại" />
                        </div>

                        <div className="mb-4">
                            <Label className="mb-4">Địa chỉ</Label>
                            <Input className="w-full" type="text" placeholder="Địa chỉ" />
                        </div>

                        <div className="mb-4">
                            <Label className="mb-4">Mã số thuế</Label>
                            <Input className="w-full" type="text" placeholder="Mã số thuế" />
                        </div>

                    </div> */}
                </div>
            </DialogCustom>

            {/* <DialogCustom
                className="sm:max-w-full"
                isModalOpen={isUser}
                notShowClose={true}>
                <div className="flex justify-center items-start p-8">
                    <div className="w-1/2 mr-8">
                        <Form {...form}>
                            <form>
                                <FormField
                                    name="images"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="mr-10">Hình ảnh đại diện</FormLabel>
                                            <FormControl>
                                                <FileDialog
                                                    setValue={field.onChange}
                                                    name="images"
                                                    maxFiles={3}
                                                    maxSize={1024 * 1024 * 4}
                                                    files={files}
                                                    setFiles={setFiles as any}
                                                    isUploading={isUploading}
                                                    disabled={false}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>


                        <Form {...form}>
                            <form>
                                <FormField
                                    name="images"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="mr-10">Ảnh CMND mặt sau</FormLabel>
                                            <FormControl>
                                                <FileDialog
                                                    setValue={field.onChange}
                                                    name="images"
                                                    maxFiles={3}
                                                    maxSize={1024 * 1024 * 4}
                                                    files={files}
                                                    setFiles={setFiles as any}
                                                    isUploading={isUploading}
                                                    disabled={false}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>


                        <Form {...form}>
                            <form>
                                <FormField
                                    name="images"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="mr-10">Ảnh CMND mặt trước</FormLabel>
                                            <FormControl>
                                                <FileDialog
                                                    setValue={field.onChange}
                                                    name="images"
                                                    maxFiles={3}
                                                    maxSize={1024 * 1024 * 4}
                                                    files={files}
                                                    setFiles={setFiles as any}
                                                    isUploading={isUploading}
                                                    disabled={false}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                    </div>

                    <div className="w-1/2">
                        <div className="mb-4">
                            <Label className="mb-4">Họ và tên</Label>
                            <Input className="w-full" type="text" placeholder="Họ và tên" />
                        </div>

                        <div className="mb-4">
                            <Label className="mb-4">Số điện thoại</Label>
                            <Input className="w-full" type="text" placeholder="Số điện thoại" />
                        </div>

                        <div className="mb-4">
                            <Label className="mb-4">Địa chỉ</Label>
                            <Input className="w-full" type="text" placeholder="Địa chỉ" />
                        </div>

                        <div className="mb-4">
                            <Label className="mb-4">Mã số thuế</Label>
                            <Input className="w-full" type="text" placeholder="Mã số thuế" />
                        </div>

                    </div>
                </div>
            </DialogCustom> */}

        </div>
    ) : null;
}

export default AgencyRegisterModal;
