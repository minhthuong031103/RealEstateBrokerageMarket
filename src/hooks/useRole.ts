import { getRequest } from '@/lib/fetch';

export const useRole = () => {
  const getUserRole = async (userId) => {
    try {
        const res = await getRequest({ endPoint: `api/role?id=${userId}` });
        return res;      
    } catch (error) {
      // Handle any network or unexpected errors
      console.error('An error occurred:', error);
      return null;
    }
  };

  return { getUserRole };
};