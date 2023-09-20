import { Metadata } from 'next';
import React from 'react';
import { getProviders } from 'next-auth/react';

import Login from './Login';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
};

const LoginPage = async () => {
  const providers = await getProviders();

  return (
    <>
      <div className="p-12 relative h-screen w-full ">
        <div className="lg:p-8 sm:p-12 ">
          <div className="mx-auto h-full flex w-full flex-col justify-center space-y-6 ">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back!
              </h1>
              <p className="text-sm text-muted-foreground">
                Explore the entirely new collection of fashion
              </p>
            </div>
            <Login providers={providers} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
