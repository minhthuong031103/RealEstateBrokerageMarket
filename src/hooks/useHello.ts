import { getRequest } from '@/lib/fetch';

export const useHello = () => {
  const getHello = async () => {
    const res = await getRequest({ endPoint: '/api/helloworld' });
    return res;
  };

  return {
    getHello,
  };
};
