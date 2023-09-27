import { getRequest } from '@/lib/fetch';

export const useProduct = () => {
  const onGetAllProducts = async () => {
    const res = await getRequest({ endPoint: '/api/product/all' });

    return res;
  };

  return { onGetAllProducts };
};
