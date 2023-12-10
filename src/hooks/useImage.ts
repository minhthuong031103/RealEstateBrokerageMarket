/** @format */

import toast from 'react-hot-toast';
import { postRequest } from '@/lib/fetch';

export const useImage = () => {
  const onUploadImage = async ({ formData, callback }) => {
    try {
      const res = await postRequest({
        endPoint: '/api/image/upload',
        formData,
          isFormData: true,
        });
      if (res?.status === 200 || res?.message === 'create success') {
        console.log(
          '🚀 ~ file: useProduct.ts:49 ~ onCreateProduct ~ res:',
          res.data
        );
        toast.success('Image successfully');
        callback();
        return res.data;
      } else {
        toast.error('Image fail');
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  return {
    onUploadImage,
  };
};
