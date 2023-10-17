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
import Loader from '@/components/Loader';
import { Input } from '@/components/ui/input';
import { CommonSvg } from '@/assets/CommonSvg';
import { currencyFormat } from '@/lib/utils';
import { Label } from '@/components/ui/label';
export const MuaLeModal = ({ setIsModalOpen, isModalOpen }) => {
  const [selectedType, setSelectedType] = React.useState(new Set([]));
  const [typeTouched, setTypeTouched] = React.useState(false);
  const [clientSecret, setClientSecret] = React.useState('');
  const [stripePromise, setStripePromise] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [quantity, setQuantity] = React.useState(1);
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
    if (!stripePromise) return;
    setLoading(true);
    const phapLyValueArray = Array.from(selectedType);
    let luot = null;
    let luotChuyenNghiep = null;
    let luotVip = null;
    if (phapLyValueArray?.[0] === MuaLeConst[0].value) {
      luot = quantity;
    }
    if (phapLyValueArray?.[0] === MuaLeConst[1].value) {
      luotChuyenNghiep = quantity;
    }
    if (phapLyValueArray?.[0] === MuaLeConst[2].value) {
      luotVip = quantity;
    }
    const amount =
      MuaLeConst?.find(
        (item) => item.value === selectedType?.values().next().value
      )?.price * quantity;

    const session = await postRequest({
      endPoint: '/api/stripe/checkout-session/mua-le',
      formData: {
        type: phapLyValueArray?.[0],
        amount,
        giamGia: 20,
        luot,
        luotChuyenNghiep,
        luotVip,
      },
      isFormData: false,
    });

    setClientSecret(session?.clientSecret);
    setLoading(false);
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
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            {/* <CheckoutForm clientSecret={clientSecret} /> */}
            <PaymentForm />
          </Elements>
        ) : (
          <div className="flex flex-col justify-between gap-y-6 h-full px-1">
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
              onSelectionChange={(keys) => {
                setSelectedType(keys);
                setQuantity(1);
              }}
              onClose={() => setTypeTouched(true)}
              className="max-w-xs lg:max-w-lg"
            >
              {MuaLeConst?.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.value.toString()}
                </SelectItem>
              ))}
            </Select>
            {isTypeValid && (
              <>
                <Label>
                  <div className="flex flex-row gap-x-3">
                    <div className="font-semibold">Giá:</div>
                    {currencyFormat(
                      MuaLeConst?.find(
                        (item) =>
                          item.value === selectedType?.values().next().value
                      )?.price
                    )}
                  </div>
                </Label>
                <div className="flex px-5 gap-1 flex-row">
                  <div className="font-semibold">Số lượng:</div>

                  <div className="flex items-center  justify-center">
                    <Button
                      id={`decrement`}
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-r-none"
                      onClick={() => {
                        setQuantity(quantity - 1);
                      }}
                      // disabled={isPending}
                      disabled={quantity === 1}
                    >
                      {CommonSvg.subtract({ className: 'h-3 w-3' })}
                    </Button>
                    <div>
                      <Input
                        id={`quantity`}
                        type="text"
                        min="0"
                        className="h-8 w-10 rounded-none border-x-0 text-black "
                        value={quantity}
                        disabled
                        // onChange={(e) => {
                        //   startTransition(async () => {
                        //     try {
                        //       await updateCartItemAction({
                        //         productId: cartLineItem.id,
                        //         quantity: Number(e.target.value),
                        //       });
                        //     } catch (err) {
                        //       catchError(err);
                        //     }
                        //   });
                        // }}
                        // disabled={isPending}
                      />
                    </div>

                    <Button
                      id={`increment`}
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-l-none"
                      onClick={() => {
                        setQuantity(quantity + 1);
                      }}
                      // disabled={isPending}
                    >
                      {CommonSvg.add({ className: 'h-3 w-3' })}
                      <span className="sr-only">Add one item</span>
                    </Button>
                  </div>
                </div>
                <div className="flex flex-row gap-x-3">
                  Tổng tiền :{' '}
                  {currencyFormat(
                    MuaLeConst?.find(
                      (item) =>
                        item.value === selectedType?.values().next().value
                    )?.price * quantity
                  )}
                </div>
                <Button onClick={onSubmit}>Thanh toán</Button>
              </>
            )}
          </div>
        )}
      </DialogCustom>
    </div>
  );
};
