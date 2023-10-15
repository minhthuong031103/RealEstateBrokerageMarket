/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React from 'react';
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';

export const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  return (
    <div>
      <PaymentElement />
    </div>
  );
};
