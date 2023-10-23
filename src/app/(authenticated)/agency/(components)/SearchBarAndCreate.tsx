'use client';

// import { Input } from '@/components/ui/input';
import { AddPostModal } from './AddPostModal';

export function SearchBarAndCreate() {
  return (
    <div className="flex flex-col md:flex-row justify-between">
      {/* <Input
        className="w-full md:w-[480px] bg-white mb-2 md:mb-0"
        type="text"
        placeholder="Tìm kiếm bất động sản theo tên"
      /> */}
      <AddPostModal />
    </div>
  );
}

export default SearchBarAndCreate;
