'use client';

import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { useUser } from '@/hooks/useUser';
import { Zoom } from '@/components/ui/zoom-image';
import { ImageCus } from '@/components/ui/ImageCus';
// import Avatar1 from '@/components/Avatar';
import { User } from '@prisma/client';

interface MessageBoxProps {
  data;
}

const NewMessage: React.FC<MessageBoxProps> = ({ data }) => {
  const session = useSession();
  const isOwn = true;

  const container = clsx('flex gap-3 p-4', isOwn && 'justify-end');
  // const avatar = clsx(isOwn && 'order-2');
  const body = clsx('flex flex-col gap-2', isOwn && 'items-end');
  const message = clsx(
    'text-sm w-fit overflow-hidden',
    isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
    data?.fileUrl ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
  );
  const [otherUser, setOtherUser] = useState<User>();

  const { onGetUserDetail } = useUser();
  useEffect(() => {
    async function getData() {
      const response = await onGetUserDetail(session?.data?.user?.id);
      const userData: User = response; // specify the type of the response data
      setOtherUser(userData);
    }
    getData();
  }, []);
  return (
    <div className={container}>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">
            {isOwn ? 'You' : otherUser?.name}
          </div>
          <div className="text-xs text-gray-400">{format(Date.now(), 'p')}</div>
        </div>
        <div className={message}>
          {data?.fileUrl ? (
            <Zoom>
              <ImageCus
                src={data?.fileUrl}
                alt={'file'}
                className={`h-[200px] w-[200px] shrink-0 rounded-md object-cover object-center`}
              />
            </Zoom>
          ) : (
            <div>{data.content}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewMessage;
