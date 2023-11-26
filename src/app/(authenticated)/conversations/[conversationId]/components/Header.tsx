'use client';

import { HiChevronLeft } from 'react-icons/hi';
import { useMemo } from 'react';
import Link from 'next/link';
import { Conversation, User } from '@prisma/client';
import useOtherUser from '@hooks/useOtherUser';
import useActiveList from '@hooks/useActiveList';

import Avatar1 from '@components/Avatar';

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);

  const { members } = useActiveList();
  const isActive = otherUser && members.indexOf(otherUser.email) !== -1;
  const statusText = useMemo(() => {
    return isActive ? 'Active' : 'Offline';
  }, [conversation, isActive]);

  return (
    <div
      className="
        bg-white 
        w-full 
        flex 
        h-[10%]
        border-b-[1px] 
        sm:px-4 
        py-3 
        px-4 
        overflow-hidden
        lg:px-6 
        justify-between 
        items-center 
        shadow-sm
      "
    >
      <div className="flex gap-3 items-center">
        <Link
          href="/conversations"
          className="
            lg:hidden 
            block 
            text-sky-500 
            hover:text-sky-600 
            transition 
            cursor-pointer
          "
        >
          <HiChevronLeft size={32} />
        </Link>

        <Avatar1 user={otherUser} />
        <div className="flex flex-col">
          <div>{conversation.name ?? otherUser?.name ?? ''}</div>
          <div className="text-sm font-light text-neutral-500">
            {statusText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
