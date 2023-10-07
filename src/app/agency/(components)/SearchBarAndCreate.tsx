'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { PlusIcon } from "lucide-react";


export function SearchBarAndCreate() {
    return (
        <div className="flex flex-col md:flex-row">
            <Input className="w-full md:w-3/6 bg-white mb-2 md:mb-0" type="text" placeholder="Tìm kiếm bất động sản theo tên" />
            <Button className="w-full md:w-2/6">
                <PlusIcon className="mr-2" /> Đăng tin bất động sản mới
            </Button>
        </div>
    );
}

export default SearchBarAndCreate;