import { getRequest } from '@/lib/fetch';

export const useBanner = () => {
  const fetchBanner = async () => {
    const res = await getRequest({
      endPoint: '/api/banner/all'});
    return res;
  };

  return { fetchBanner };
};
