import { postRequest } from '@/lib/fetch';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

export const useAuth = () => {
  const router = useRouter();
  const onRegister = useCallback(async (data, callback) => {
    const res = await postRequest({
      endPoint: '/api/auth/register',
      formData: { name: data.name, email: data.email, password: data.password },
      isFormData: false,
    });

    callback?.(res);
    if (res?.message === 'User already exists') {
      toast.error(res.message);
    }
    if (res?.message === 'User created') {
      toast.success(res.message);
      router.push('/auth/login');
    }
  }, []);

  return {
    onRegister,
  };
};
