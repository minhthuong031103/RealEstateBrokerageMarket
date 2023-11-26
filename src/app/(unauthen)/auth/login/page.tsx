import { Metadata } from 'next';
import React from 'react';
import { alreadyLoggedIn } from '@/lib/auth';
import Login from './Login';
export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
};

const LoginPage = async () => {
  await alreadyLoggedIn();
  return (
    <>
      <div className="p-12 relative h-screen w-full ">
        <div className="lg:p-8 sm:p-12 ">
          <div className="mx-auto h-full flex w-full flex-col justify-center space-y-6 ">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Chào mừng!
              </h1>
              <p className="text-sm text-muted-foreground">
                Đăng nhập để kết nối với cộng đồng UIT Estate
              </p>
            </div>
            <Login />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
