import { getRequest } from '@/lib/fetch';

export const useProduct = () => {
  const onGetAllProducts = async () => {
    try {
      const res = await getRequest({ endPoint: '/api/product/all' });
      console.log(res);
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  return { onGetAllProducts };
};
