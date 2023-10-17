import { getRequest } from '@/lib/fetch';

export const useDoiTac = () => {
  const fetchAllDoiTac = async (page) => {
    const res = await getRequest({endPoint: `api/doi-tac?page=${page}&limit=6`})
    return res;
  };

  const fetchDoiTacTheoId = async (id) => {
    const res = await getRequest({endPoint: `api/doi-tac/thong-tin-doi-tac?id=${id}`})
    return res;
  }

  return {
    fetchAllDoiTac,
    fetchDoiTacTheoId
  };
};
