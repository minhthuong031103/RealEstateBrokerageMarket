"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import clsx from "clsx";

import Avatar1 from "@/components/Avatar";
import { FullConversationType } from "@/types";
import useOtherUser from "@hooks/useOtherUser";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
}) => {
  const otherUser = useOtherUser(data);

  // const session = useSession();
  const router = useRouter();
  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data, router]);

  const lastMessage = useMemo(() => {
    return data.lastMessage;
  }, [data.lastMessage]);

  // const userEmail = useMemo(() => session.data?.user?.email,
  // [session.data?.user?.email]);

  // const hasSeen = useMemo(() => {
  //   if (!lastMessage) {
  //     return false;
  //   }

  //   const seenArray = lastMessage.seen || [];

  //   if (!userEmail) {
  //     return false;
  //   }

  //   return seenArray
  //     .filter((user) => user.email === userEmail).length !== 0;
  // }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    // if (lastMessage?.image) {
    //   return 'Sent an image';
    // }

    if (lastMessage) {
      return lastMessage;
    }

    return "Started a conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
        w-full 
        relative 
        flex 
        items-center 
        space-x-3 
        p-4 
        hover:bg-neutral-100
        rounded-lg
        transition
        cursor-pointer
        `,
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      <Avatar1 user={otherUser} />

      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {otherUser?.name?.length ? otherUser.name : "Demo"}
            </p>
            {data.lastMessageAt && (
              <p
                className="
                  text-xs 
                  text-gray-400 
                  font-light
                "
              >
                {format(new Date(data.lastMessageAt), "p")}
              </p>
            )}
          </div>
          <div
            className={
              clsx(`
              truncate 
              text-sm
              `)
              // hasSeen ? 'text-gray-500' : 'text-black font-medium'
            }
          >
            {lastMessageText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
