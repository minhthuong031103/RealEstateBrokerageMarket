import { getRequest } from '@/lib/fetch';

export const useUser = () => {
  const onGetUserDetail = async (userId) => {
    const productDetail = await getRequest({
      endPoint: `/api/user?userId=${userId}`,
    });
    // const data = await productDetail?.json();

    return productDetail;
  };

  return { onGetUserDetail };
};
