import { getRequest } from '@/lib/fetch';

export const useStripe = () => {
  getCheckoutUrl = async () => {
    const res = await getRequest({ endPoint: '/api/stripe/checkout-session' });
    console.log(res);
  };

  return {};
};
