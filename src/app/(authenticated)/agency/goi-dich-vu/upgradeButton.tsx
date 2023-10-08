'use client';

import { Button } from '@/components/ui/button';
import { postRequest } from '@/lib/fetch';
import { ArrowRight } from 'lucide-react';
import React from 'react';

const UpgradeButton = () => {
  const onSubmit = async () => {
    const res = await postRequest({
      endPoint: '/api/stripe/checkout-session',
      isFormData: false,
      formData: {},
    });
    console.log(res);
  };

  return (
    <Button
      onClick={() => {
        onSubmit();
      }}
    >
      Upgrade now <ArrowRight className="w-5 h-5 ml-1.5" />
    </Button>
  );
};

export default UpgradeButton;
