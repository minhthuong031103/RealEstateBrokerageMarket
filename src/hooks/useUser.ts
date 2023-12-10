import { getRequest } from '@/lib/fetch';

export const useUser = () => {
  const onGetUserDetail = async (userId) => {
    const userDetail = await getRequest({
      endPoint: `/api/user?userId=${userId}`,
    });
    // const data = await productDetail?.json();

    return userDetail;
  };

  return { onGetUserDetail };
};
