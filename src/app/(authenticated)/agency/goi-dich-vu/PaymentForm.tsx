/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React from 'react';
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';

export const PaymentForm = ({ callback }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = React.useState(false);
  const onSubmit = async () => {
    if (!stripe || !elements) return;

    setLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/agency/goi-dich-vu`,
      },
      redirect: 'if_required',
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      toast.success('Thanh toán thành công');
      callback && callback();
    } else {
      toast.error('Thanh toán thất bại');
    }
  };
  return stripe && elements ? (
    <div className="px-1">
      <div className="flex flex-col w-full gap-y-6 ">
        <PaymentElement />
        <div className="w-full flex items-center justify-center">
          <Button disabled={loading} className="w-[60%]" onClick={onSubmit}>
            <span>Thanh toán</span>
          </Button>
        </div>
        {loading ? (
          <div className="w-full flex items-center justify-center">
            <Loader />
            Giao dịch của bạn đang được xử lý
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
};
