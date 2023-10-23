import { getRequest } from '@/lib/fetch';

export const useOffice = () => {
  const fetchOffice = async () => {
    const res = await getRequest({endPoint: `api/office`})
    return res;
  };

  return {
    fetchOffice,
  };
};
