import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { Conversation, DirectMessage, User } from '@prisma/client';

export type FullConversationType = Conversation & {
  userOne: User;
  userTwo: User;
  directMessages: DirectMessage[];
};

const useOtherUser = (
  conversation: FullConversationType | { userOne: User; userTwo: User }
) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session.data?.user?.email;

    const otherUser =
      conversation.userOne.email === currentUserEmail
        ? conversation.userTwo
        : conversation.userOne;

    return otherUser;
  }, [session.data?.user?.email]);

  return otherUser;
};

export default useOtherUser;
