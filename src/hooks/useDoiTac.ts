import { getRequest, postRequest } from '@/lib/fetch';
import toast from 'react-hot-toast';

export const useDoiTac = () => {
  const fetchAllDoiTac = async (page) => {
    const res = await getRequest({endPoint: `api/doi-tac?page=${page}&limit=6`})
    return res;
  };

  const fetchDoiTacTheoId = async (id) => {
    const res = await getRequest({endPoint: `api/doi-tac/thong-tin-doi-tac?id=${id}`})
    return res;
  }

  const uploadDoiTacInfo = async (data) => {
    try {
      const res = await postRequest({
        endPoint: '/api/agency/uploadinfo',
        isFormData: false,
        formData: data,
      })
      console.log(res);
      if (res) {
        toast.success('Gửi thông tin thành công');
      }
    } catch (e) {
      console.log(e);
    }
  }

  return {
    fetchAllDoiTac,
    fetchDoiTacTheoId,
    uploadDoiTacInfo
  };
};
