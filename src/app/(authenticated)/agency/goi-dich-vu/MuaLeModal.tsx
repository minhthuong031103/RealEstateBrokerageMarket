'use client';

import { Button } from '@/components/ui/button';
import DialogCustom from '@/components/ui/dialogCustom';
import { MuaLeConst } from '@/lib/constant';
import { getRequest, postRequest } from '@/lib/fetch';
import { Select, SelectItem } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentForm } from './PaymentForm';
export const MuaLeModal = ({ setIsModalOpen, isModalOpen }) => {
  const [selectedType, setSelectedType] = React.useState(new Set([]));
  const [typeTouched, setTypeTouched] = React.useState(false);
  const [clientSecret, setClientSecret] = React.useState('');
  const [stripePromise, setStripePromise] = React.useState(null);

  useEffect(() => {
    const getConfig = async () => {
      const res = await getRequest({
        endPoint: '/api/stripe/config',
      });
      setStripePromise(loadStripe(res?.publishableKey));
    };
    getConfig();
  }, []);

  const onSubmit = async () => {
    const phapLyValueArray = Array.from(selectedType);
    const session = await postRequest({
      endPoint: '/api/stripe/checkout-session/mua-le',
      formData: {
        type: phapLyValueArray?.[0],
        amount: 500000,
        giamGia: 20,
      },
      isFormData: false,
    });
    setClientSecret(session?.clientSecret);
  };
  const isTypeValid = selectedType.size > 0;

  return (
    <div className="w-full h-full px-1 ">
      <DialogCustom
        className="w-full lg:w-[50%] h-[80%] lg:h-[95%] flex items-center justify-center "
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        warningOnClose={true}
        callBack={() => {}}
      >
        <div className="flex flex-col justify-between h-full">
          <Select
            isRequired
            key={'sanpham'}
            radius={'md'}
            label="Sản phẩm"
            isInvalid={isTypeValid || !typeTouched ? false : true}
            errorMessage={
              isTypeValid || !typeTouched ? '' : 'Vui lòng chọn sản phẩm'
            }
            autoFocus={false}
            placeholder="Chọn sản phẩm"
            selectedKeys={selectedType}
            onSelectionChange={setSelectedType}
            onClose={() => setTypeTouched(true)}
            className="max-w-xs lg:max-w-lg"
          >
            {MuaLeConst?.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.value.toString()}
              </SelectItem>
            ))}
          </Select>
          <Button onClick={onSubmit}>Thanh toán</Button>
        </div>

        {clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            {/* <CheckoutForm clientSecret={clientSecret} /> */}
            <PaymentForm clientSecret={clientSecret} />
          </Elements>
        ) : null}
      </DialogCustom>
    </div>
  );
};
