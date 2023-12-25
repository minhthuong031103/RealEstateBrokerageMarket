import { postRequest } from '@/lib/fetch';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useBaiViet = () => {
  const queryClient = useQueryClient();
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
        queryClient.refetchQueries();
      }
      return true;
    } catch (e) {
      console.error(e);
      toast.error('Đăng bài thất bại');
      return false;
    }
  };

  const onUpdateBaiViet = async (id, updatedData) => {
    try {
      const res = await postRequest({
        endPoint: `/api/bai-viet/modify/?id=${id}`, // Adjust the API endpoint to your route
        isFormData: false,
        formData: updatedData,
      });
      console.log(res);
      if (res) {
        toast.success('Cập nhật thông tin thành công');
      }
      return true;
    } catch (e) {
      console.error(e);
      toast.error('Cập nhật thông tin thất bại');
      return false;
    }
  };

  return {
    onCreateBaiViet,
    onUpdateBaiViet,
  };
};
