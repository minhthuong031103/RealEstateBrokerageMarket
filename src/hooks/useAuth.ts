import { getRequest, postRequest, putRequest } from '@/lib/fetch';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

export const useAuth = () => {
  const router = useRouter();

  const onRegister1 = async (data, callback) => {
    const response = await postRequest({
      endPoint: '/api/auth/register',
      formData: data,
      isFormData: false,
    });
    callback?.();

    if (response?.message === 'Tài khoản đã được đăng ký') {
      toast.error(response.message);
    }
    if (response?.message === 'User created') {
      toast.success(response.message);
      router.push('/auth/login');
    }
  };

  const onRegister = async (data, callback) => {
    console.log('🚀 ~ file: useAuth.ts:28 ~ onRegister ~ data:', data);
    const res = await postRequest({
      endPoint: '/api/auth/register',
      isFormData: true,
      formData: data,
    });

    if (res?.message === 'Tài khoản đã được đăng ký') {
      callback?.();
      toast.error(res.message);
    }
    if (res?.message === 'Đăng ký thành công, vui lòng xác thực OTP') {
      await signIn('credentials', {
        email: data.get('email'),
        password: data.get('password'),
        redirect: false,
      });
      callback?.();
      router.push(`/auth/register/otp?payload=${res.payload}`);
    }
  };

  const onVerifyOtp = async (email, otp, callback, update) => {
    const res = await postRequest({
      endPoint: '/api/auth/register/otp',
      formData: { email: email, otp: otp },
      isFormData: false,
    });
    callback?.();
    if (res === 'OTP verified') {
      toast.success('OTP verified');
      await update();
      router.push('/');
    } else {
      toast.error('OTP is not valid');
    }
  };

  const onSendAgain = async (data) => {
    console.log(data);

    await putRequest({
      endPoint: '/api/auth/register/otp',

      formData: { email: data },
      isFormData: false,
    });
    toast.success('OTP has been sent to your email');
  };
  const onFirstSend = async (data) => {
    toast.success('OTP đã được gửi đến email của bạn');
    await putRequest({
      endPoint: '/api/auth/register/otp',

      formData: { email: data },
      isFormData: false,
    });
  };

  const queryUser = (session) => {
    return useQuery({
      queryKey: ['user', session?.data?.user?.id],
      queryFn: async () => {
        const res = await getRequest({
          endPoint: `/api/user?userId=${session?.data?.user?.id}`,
        });
        return res;
      },
      refetchInterval: 3000, // Refetch the data every 3 seconds
    });
  };
  const getSessionClient = () => {
    const session = useSession();
    return session?.data?.user?.id;
  };
  return {
    onRegister,
    onRegister1,
    onSendAgain,
    onVerifyOtp,
    onFirstSend,
    queryUser,
    getSessionClient,
  };
};
