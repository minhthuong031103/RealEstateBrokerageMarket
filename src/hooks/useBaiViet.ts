import { postRequest } from '@/lib/fetch';
import toast from 'react-hot-toast';

export const useBaiViet = () => {
  const onCreateBaiViet = async (data) => {
    try {
      const res = await postRequest({
        endPoint: '/api/bai-viet/create',
        isFormData: false,
        formData: data,
      });
      console.log(res);
      if (res) {
        toast.success('Đăng bài thành công');
      }
      return true;
    } catch (e) {
      console.log(e);
      toast.error('Đăng bài thất bại');
      return false;
    }
  };

  return { onCreateBaiViet };
};
