import { getRequest } from '@/lib/fetch';

export const useUser = () => {
  const getAllUsers = async () => {
    const res = await getRequest({ endPoint: '/api/user/all' });
    return res;
  };

  return { getAllUsers };
};
