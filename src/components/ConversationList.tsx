/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useEffect, useMemo } from 'react';
import clsx from 'clsx';

import useConversation from '@hooks/useConversation';
import ConversationBox from './ConversationBox';
import { FullConversationType } from '@/hooks/useOtherUser';
import { useInfiniteQuery } from '@tanstack/react-query';

interface ConversationListProps {
  initialItems?: FullConversationType[];
  title?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
}) => {
  // const [items, setItems] = useState(initialItems);
  // console.log("🚀 ~ file: ConversationList.tsx:21 ~ initialItems:", initialItems)
  const params = useParams();
  console.log('🚀 ~ file: ConversationList.tsx:25 ~ params:', params);
  const router = useRouter();
  const session = useSession();
  console.log('🚀 ~ file: ConversationList.tsx:47 ~ session:', session);

  const { conversationId, isOpen } = useConversation();
  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }
  }, [pusherKey, router]);
  const fetchConversations = async ({ cursor, pageSize }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SOCKET_URL}/conversations/all?cursor=${cursor}&pageSize=${pageSize}&userId=${session?.data?.user?.id}`
    );
    const data = await response.json();
    return data;
  };

  const useInfiniteMessagesQuery = (pageSize) => {
    return useInfiniteQuery(
      ['conversations'],
      ({ pageParam }) => fetchConversations({ cursor: pageParam, pageSize }),
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor || null,
        enabled: !!session.data?.user?.id,
      }
    );
  };
  const pageSize = 6;

  const { data, error, isFetching, fetchNextPage, hasNextPage } =
    useInfiniteMessagesQuery(pageSize);

  // if()
  return (
    <>
      <aside
        className={clsx(
          `
w-full h-full
        pb-20
        lg:pb-0 
        lg:block
        overflow-y-auto 
        lg:w-[20%]
        border-r 
        border-gray-200 
      `,
          isOpen ? 'hidden' : 'block lg:w-[20%] left-0'
        )}
      >
        <div className="px-5">
          <div className="flex justify-center mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">Messages</div>
          </div>
          {data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.conversations.map((item) => (
                <ConversationBox
                  key={item.id}
                  data={item}
                  selected={conversationId === item.id}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
