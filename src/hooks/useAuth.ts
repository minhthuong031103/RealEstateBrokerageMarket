import { postRequest, putRequest } from '@/lib/fetch';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';

export const useAuth = () => {
  const router = useRouter();

  const onRegister1 = async (data, callback) => {
    const response = await postRequest({
      endPoint: '/api/auth/register',
      formData: data,
      isFormData: false,
    });
    callback?.();

    if (response?.message === 'User already exists') {
      toast.error(response.message);
    }
    if (response?.message === 'User created') {
      toast.success(response.message);
      router.push('/auth/login');
    }
  };

  const onRegister = async (data, callback) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });

    const response = await res.json();

    if (response?.message === 'User already exists') {
      callback?.();
      toast.error(response.message);
    }
    if (response?.message === 'User created and OTP sent') {
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      callback?.();
      router.push(`/auth/register/otp?payload=${response.payload}`);
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
    toast.success('OTP has been sent to your email');
    await putRequest({
      endPoint: '/api/auth/register/otp',

      formData: { email: data },
      isFormData: false,
    });
  };

  return {
    onRegister,
    onRegister1,
    onSendAgain,
    onVerifyOtp,
  };
};
