'use client';

import { Button } from '@/components/ui/button';
import { postRequest } from '@/lib/fetch';
import { ArrowRight } from 'lucide-react';
import React from 'react';

const UpgradeButton = ({ product }) => {
  const onSubmit = async () => {
    const res = await postRequest({
      endPoint: '/api/stripe/checkout-session',
      isFormData: false,
      formData: {
        product,
      },
    });
    window.location.href = res.url ?? '/agency/goi-dich-vu';
  };

  return (
    <Button
      onClick={() => {
        onSubmit();
      }}
    >
      Đăng ký ngay <ArrowRight className="w-5 h-5 ml-1.5" />
    </Button>
  );
};

export default UpgradeButton;
