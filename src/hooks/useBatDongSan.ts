import { getRequest, postRequest } from '@/lib/fetch';

export const useBatDongSan = () => {
  const fetchAllBatDongSan = async () => {
    const res = await getRequest({ endPoint: '/api/bat-dong-san' });
    return res;
  };

  const fetchAllDanhMuc = async () => {
    const res = await getRequest({ endPoint: '/api/bat-dong-san/danh-muc' });
    return res;
  };

  const fetchLoaiHinhTheoDanhMuc = async (name: string) => {
    const res = await postRequest({
      endPoint: '/api/bat-dong-san/loai-hinh',
      isFormData: false,
      formData: { name },
    });
    return res;
  };

  return {
    fetchAllBatDongSan,
    fetchAllDanhMuc,
    fetchLoaiHinhTheoDanhMuc,
  };
};
