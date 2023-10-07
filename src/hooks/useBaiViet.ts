import { postRequest } from '@/lib/fetch';
import toast from 'react-hot-toast';

export const useBaiViet = () => {
  const onCreateBaiViet = async (data) => {
    const res = await postRequest({
      endPoint: '/api/bai-viet/create',
      isFormData: false,
      formData: data,
    });
    console.log(res);
    if (res) {
      toast.success('Đăng bài thành công');
    }
  };

  return { onCreateBaiViet };
};
