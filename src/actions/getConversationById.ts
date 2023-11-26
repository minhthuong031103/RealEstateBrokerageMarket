import prisma from '@/lib/prisma';
import getCurrentUser from './getCurrentUser';

const getConversationById = async (conversationId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.email) {
      return null;
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        userOne: true,
        userTwo: true,
      },
    });

    return conversation;
  } catch (error: any) {
    console.log(error, 'SERVER_ERROR');
    return null;
  }
};

export default getConversationById;
