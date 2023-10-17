'use client';

import { Input } from '@/components/ui/input';
import { AddPostModal } from './AddPostModal';

export function SearchBarAndCreate({ subscribedPlan, user, currentlyPlan }) {
  return (
    <div className="flex flex-col md:flex-row justify-between">
      <Input
        className="w-full md:w-3/6 bg-white mb-2 md:mb-0"
        type="text"
        placeholder="Tìm kiếm bất động sản theo tên"
      />
      <AddPostModal
        subscribedPlan={subscribedPlan}
        user={user}
        currentlyPlan={currentlyPlan}
      />
    </div>
  );
}

export default SearchBarAndCreate;
