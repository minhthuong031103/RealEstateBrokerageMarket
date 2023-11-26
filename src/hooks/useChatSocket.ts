import { getRequest, postRequest } from '@/lib/fetch';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { io as ClientIO } from 'socket.io-client';

type ChatSocketProps = {
  session: any;
  conversationId?: string;
  callback?: (data: any) => void;
};

export const useChatSocket = ({
  session,
  conversationId,
  callback,
}: ChatSocketProps) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const router = useRouter();

  const handleUserConnectedAndDisConnected = (data) => {
    console.log('online user!');
    setOnlineUsers(data);
  };

  useEffect(() => {
    const socketInstance = ClientIO(
      `${process.env.NEXT_PUBLIC_SOCKET_URL}/socket`,
      {
        // withCredentials: true,
        query: {
          userId: session.user.id,
          conversationId,
        },
      }
    );
    socketInstance.on('onlineUsers', handleUserConnectedAndDisConnected);
    socketInstance.on('connect', () => {
      // Listen for the 'userDisconnected' event and update the onlineUsers state

      setIsConnected(true);
      socketInstance.emit('userConnected', { userId: session.user.id });
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
      socketInstance.emit('userDisconnected', {
        userId: session.user.id,
      });
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('onMessage', (message) => {
      // Handle the received message, e.g., by updating the state
      callback?.(message);
      console.log(message);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const goToConversation = async (userOneId, userTwoId) => {
    const res: any = await postRequest({
      endPoint: `${process.env.NEXT_PUBLIC_SOCKET_URL}/conversations`,
      formData: { userOneId, userTwoId },
      isFormData: false,
    });
    console.log(res);
    const { conversationId } = res;

    router.push(`/user/chat/conversation?conversationId=${conversationId}`);
  };
  const getConversations = async ({ userId, page }) => {
    const limit = 5;
    const conversations = await getRequest({
      endPoint: `/conversations/all?userId=${userId}&page=${page}&limit=${limit}`,
    });
    console.log(conversations, 'conversations');
    return conversations;
  };

  return {
    socket,
    isConnected,
    onlineUsers,
    goToConversation,
    getConversations,
  };
};
