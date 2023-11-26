import { postRequest } from '@/lib/fetch';
import { useParams, useRouter } from 'next/navigation';
import { useMemo } from 'react';

const useConversation = () => {
  const params = useParams();
  const router = useRouter();

  const goToConversation = async (userOneId, userTwoId) => {
    const res: any = await postRequest({
      endPoint: `${process.env.NEXT_PUBLIC_SOCKET_URL}/conversations`,
      formData: { userOneId, userTwoId },
      isFormData: false,
    });
    console.log(res);
    const { conversationId } = res;

    router.push(`/conversations/${conversationId}`);
  };

  const conversationId = useMemo(() => {
    if (!params?.conversationId) {
      return '';
    }

    return params.conversationId as string;
  }, [params?.conversationId]);

  const isOpen = useMemo(() => !!conversationId, [conversationId]);

  return useMemo(
    () => ({
      isOpen,
      goToConversation,
      conversationId,
    }),
    [isOpen, conversationId]
  );
};

export default useConversation;
