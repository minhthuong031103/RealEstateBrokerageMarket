'use client';

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { FileDialog } from '@/components/ui/FileDialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'


import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ImageList } from '@/components/ui/ImageList'


const formSchema = z.object({

});

function AgencyRegisterModal() {
    //    const [isUploading, setIsUploading] = useState(false);
    const [isUploading] = useState(false);
    // const [files, setFiles] = useState<Array<any>>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

        },
    });
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Register Modal</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-full">
                <DialogHeader>
                    <DialogTitle>Đăng ký làm đối tác</DialogTitle>
                    <DialogDescription>
                        Tham gia chương trình đối tác cùng UIT RealEstate. Bằng việc chấp nhận, bạn đồng ý với Điều khoản pháp lý.
                    </DialogDescription>
                </DialogHeader>
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
                                <div className="mt-10">
                                    {files?.length ? (
                                        <ImageList files={files} height={128} width={128} scrollHeight={72} scrollWidth="full" />
                                    ) : null}
                                </div>
                            </form>
                        </Form>
                    </div>

                    <div className="w-1/2">
                        <div className="mb-4">
                            {/* <label htmlFor="fullName" className="block text-gray-700 font-bold mb-2">
                                Họ và tên
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            /> */}
                            <Label className="mb-4">Họ và tên</Label>
                            <Input className="w-full" type="text" placeholder="Họ và tên" />
                        </div>

                        <div className="mb-4">
                            <Label className="mb-4">Số điện thoại</Label>
                            <Input className="w-full" type="text" placeholder="Số điện thoại" />
                        </div>

                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Quay về</Button>
                    <Button type="submit">Xác nhận</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AgencyRegisterModal