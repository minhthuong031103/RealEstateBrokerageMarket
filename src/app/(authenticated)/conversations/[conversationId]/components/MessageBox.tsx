'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';

import Avatar1 from '@/components/Avatar';
import ImageModal from './ImageModal';
import { DirectMessage } from '@prisma/client';
import { getRequest } from '@/lib/fetch';
import { useQuery } from '@tanstack/react-query';

interface MessageBoxProps {
  data: DirectMessage;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isOwn = session.data?.user?.id === data?.userId;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(', ');

  const container = clsx('flex gap-3 p-4', isOwn && 'justify-end');
  const avatar = clsx(isOwn && 'order-2');
  const body = clsx('flex flex-col gap-2', isOwn && 'items-end');
  const message = clsx(
    'text-sm w-fit overflow-hidden',
    isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
    data.fileUrl ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
  );
  const { data: userDetail }: any = useQuery({
    queryKey: ['detail', data.userId],
    queryFn: async () => {
      const res = await getRequest({
        endPoint: `/api/user?userId=${data.userId}`,
      });

      return res;
    },
    staleTime: 60000,
    enabled: !!data.userId,
  });
  // const { onGetUserDetail } = useUser();
  // useEffect(() => {
  //   async function getData() {
  //     const response = await onGetUserDetail(data.userId);
  //     const userData: User = userDetail; // specify the type of the response data
  //     setOtherUser(userData);
  //   }
  //   getData();
  // }, []);
  return (
    <div className={container}>
      {!isOwn && (
        <div className={avatar}>
          <Avatar1 user={userDetail} />
        </div>
      )}

      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">
            {isOwn ? 'You' : userDetail?.name}
          </div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), 'p')}
          </div>
        </div>
        <div className={message}>
          <ImageModal
            src={data.image}
            isOpen={imageModalOpen}
            onClose={() => setImageModalOpen(false)}
          />
          {data.fileUrl ? (
            <Image
              alt="Image"
              height="288"
              width="288"
              onClick={() => setImageModalOpen(true)}
              src={data.fileUrl}
              className="
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition 
                translate
              "
            />
          ) : (
            <div>{data.content}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div
            className="
            text-xs 
            font-light 
            text-gray-500
            "
          >
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
