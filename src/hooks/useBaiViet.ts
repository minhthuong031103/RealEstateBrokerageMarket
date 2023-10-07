import { postRequest } from '@/lib/fetch';

export const useBaiViet = () => {
  const onCreateBaiViet = async (data) => {
    const res = await postRequest({
      endPoint: '/api/bai-viet/create',
      isFormData: false,
      formData: data,
    });
    console.log(res);
  };

  return { onCreateBaiViet };
};
