/* eslint-disable @typescript-eslint/no-namespace */

import React from 'react';
import { getUserSubscriptionPlan, stripe } from '@/lib/stripe';
import UpgradeButton from './upgradeButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn, currencyFormat } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { MuaLe } from './MuaLe';

const page = async () => {
  const currentlyPlan = await getUserSubscriptionPlan();
  const session = await getSession();
  const plans = await stripe.plans.list();
  const getPriceForProduct = (productId) => {
    const plan = plans.data.find((plan) => plan.product === productId);
    return plan ? plan.amount : Infinity; // Return Infinity if no price is found so that product goes to the end of the sorted array
  };

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  });
  console.log(user);
  const products = await stripe.products.list();
  // console.log('plannnnnnnnnnnnnnnn', currentlyPlan);
  // console.log('products', products);
  // console.log('plans', plans);

  const subscribedPlan = products.data.find(
    (plan) => plan.id === currentlyPlan?.product
  );
  const sortedProductsData = [...products.data].sort((a, b) => {
    return getPriceForProduct(a.id) - getPriceForProduct(b.id);
  });

  console.log('subscribedPlan', subscribedPlan);
  return (
    <div className="w-full h-full">
      <div className="mx-auto mb-10 sm:max-w-lg ">
        <h1 className="text-6xl font-bold sm:text-7xl ">Pricing</h1>

        <p className="mt-5 text-gray-600 sm:text-lg">
          Cho dù bạn chỉ đang thử nghiệm UIT Estate hoặc đang kinh doanh, chúng
          tôi có một gói phù hợp với bạn.
        </p>
        {currentlyPlan?.isSubscribed ? (
          <p>
            Bạn hiện đang đăng ký gói{' '}
            <span className="font-bold">{subscribedPlan?.name}</span>.
          </p>
        ) : (
          <p>
            Bạn chưa đăng ký gói nào. Hãy đăng ký ngay để trải nghiệm tất cả các
            tính năng của UIT Estate
          </p>
        )}
        <p>
          Bạn hiện có <span className="font-bold"> {user?.luot}</span> lượt đăng
          bài viết.
        </p>
        <p>
          Bạn hiện có{' '}
          <span className="font-bold"> {user?.luotChuyenNghiep}</span> lượt đăng
          bài viết <span className="font-bold"> Nổi bật</span>.
        </p>
        <p>
          Bạn hiện có <span className="font-bold"> {user?.luotVip}</span> lượt
          đăng bài viết <span className="font-bold"> Yêu thích</span>.
        </p>
        <MuaLe />
        <p>
          {currentlyPlan.isCanceled
            ? `Gói đăng ký của bạn đã được hủy và sẽ hết hạn vào ${new Date(
                currentlyPlan.stripeCurrentPeriodEnd
              ).toLocaleDateString()}`
            : currentlyPlan.isSubscribed
            ? `Gói đăng ký của bạn sẽ được làm mới vào ${new Date(
                currentlyPlan.stripeCurrentPeriodEnd
              ).toLocaleDateString()} `
            : null}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {sortedProductsData?.map((product, i) => {
          const price = plans.data.find(
            (p) => p.product === product.id
          )?.amount;
          return (
            <Card
              key={product.name}
              className={cn(
                'flex flex-col',
                i === products.data.length - 1 &&
                  'border-destructive shadow-md',
                i === 1 && 'border-primary shadow-md',
                i === 0 && 'border-muted shadow-md'
              )}
            >
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid flex-1 place-items-start gap-6">
                <div className="text-3xl font-bold">
                  {currencyFormat(price)}
                  <span className="text-sm font-normal text-muted-foreground">
                    /tháng
                  </span>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {product.features.map((feature) => {
                    return (
                      <div
                        key={feature.name}
                        className="flex items-center gap-2"
                      >
                        <CheckIcon className="h-4 w-4" aria-hidden="true" />
                        <span>{feature.name}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
              <CardFooter className="pt-4">
                {!subscribedPlan ? (
                  <UpgradeButton
                    product={plans.data.find((p) => p.product === product.id)}
                  />
                ) : null}
                {product.id === subscribedPlan?.id ? (
                  <UpgradeButton
                    product={plans.data.find((p) => p.product === product.id)}
                  />
                ) : null}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
export default page;
