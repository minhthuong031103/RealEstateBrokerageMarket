'use client';

import { User } from '@prisma/client';
import { AvatarImage, Avatar } from '@/components/ui/avatar';
import useActiveList from '@hooks/useActiveList';

interface AvatarProps {
  user?: User;
}

const Avatar1: React.FC<AvatarProps> = ({ user }) => {
  console.log('🚀 ~ file: Avatar.tsx:12 ~ user:', user);
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email) !== -1;

  return (
    <div className="relative">
      <div
        className="
        relative 
        inline-block 
        rounded-full 
        overflow-hidden
        h-9 
        w-9 
        md:h-11 
        md:w-11
      "
      >
        <Avatar>{user?.avatar && <AvatarImage src={user.avatar} />}</Avatar>
      </div>
      {isActive ? (
        <span
          className="
            absolute 
            block 
            rounded-full 
            bg-green-500 
            ring-2 
            ring-white 
            top-0 
            right-0
            h-2 
            w-2 
            md:h-3 
            md:w-3
          "
        />
      ) : null}
    </div>
  );
};

export default Avatar1;
