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
import { cn, convertPrismaTimeToDateTime, currencyFormat } from '@/lib/utils';
import { CheckIcon } from 'lucide-react';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { MuaLe } from './MuaLe';
import ManageButton from './ManageButton';

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
  const products = await stripe.products.list();

  const subscribedPlan = products.data.find(
    (plan) => plan.id === currentlyPlan?.product
  );
  const sortedProductsData = [...products.data].sort((a, b) => {
    return getPriceForProduct(a.id) - getPriceForProduct(b.id);
  });

  return (
    <div className="w-full h-full">
      <div className="mx-10 mb-10">
        <h1 className="font-bold text-2xl mt-6">Thông tin gói dịch vụ</h1>

        <p className="mt-5 text-slate-800 sm:text-lg mb-1">
          Cho dù bạn chỉ đang thử nghiệm UIT Estate hoặc đang kinh doanh, chúng
          tôi có một gói phù hợp với bạn.
        </p>
        {currentlyPlan?.isSubscribed ? (
          <p className="text-gray-500 mb-3">
            Bạn hiện đang đăng ký gói{' '}
            <span className="font-bold">{subscribedPlan?.name}</span>.
          </p>
        ) : (
          <p className="text-gray-500 mb-3">
            Bạn chưa đăng ký gói nào. Hãy đăng ký ngay để trải nghiệm tất cả các
            tính năng của UIT Estate
          </p>
        )}
        <div className="flex flex-row flex-wrap gap-3 text-slate-800">
          <p>Bạn hiện có </p>
          <div>
            <p>
              <span className="font-bold text-gray-500"> {user?.luot}</span>{' '}
              lượt đăng bài viết.
            </p>
            <p>
              <span className="font-bold text-blue-500">
                {' '}
                {user?.luotChuyenNghiep}
              </span>{' '}
              lượt đăng bài viết <span className="font-bold"> Yêu thích</span>.
            </p>
            <p>
              <span className="font-bold text-red-500"> {user?.luotVip}</span>{' '}
              lượt đăng bài viết <span className="font-bold"> Nổi bật</span>.
            </p>
            <MuaLe />
          </div>
        </div>
        <p className="mt-2">
          {currentlyPlan.isCanceled ? (
            <p>
              Gói đăng ký của bạn đã được hủy và sẽ hết hạn vào{' '}
              <span className="font-semibold">
                {convertPrismaTimeToDateTime(
                  currentlyPlan.stripeCurrentPeriodEnd
                )}
              </span>
            </p>
          ) : currentlyPlan.isSubscribed ? (
            <p>
              Gói đăng ký của bạn sẽ được làm mới vào{' '}
              <span className="font-semibold">
                {convertPrismaTimeToDateTime(
                  currentlyPlan.stripeCurrentPeriodEnd
                )}
              </span>
            </p>
          ) : null}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3 mx-10 ">
        {sortedProductsData?.map((product, i) => {
          const price = plans.data.find(
            (p) => p.product === product.id
          )?.amount;
          return (
            <Card
              key={product.name}
              className={cn(
                'flex flex-col transition ease-in-out hover:scale-[101%]',
                i === products.data.length - 1 && 'border-red-500 shadow-md',
                i === 1 && 'border-blue-500 shadow-md',
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
                        <CheckIcon
                          className="h-4 w-4 text-emerald-500"
                          aria-hidden="true"
                        />
                        <div>{feature.name}</div>
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
                  <ManageButton
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
