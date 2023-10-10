/* eslint-disable @typescript-eslint/no-namespace */

import React from 'react';
import { getUserSubscriptionPlan } from '@/lib/stripe';
import UpgradeButton from './upgradeButton';

const page = async () => {
  const plan = await getUserSubscriptionPlan();
  console.log('plannnnnnnnnnnnnnnn', plan);
  return (
    <div className="w-full h-full">
      <div className="mx-auto mb-10 sm:max-w-lg ">
        <h1 className="text-6xl font-bold sm:text-7xl ">Pricing</h1>

        <p className="mt-5 text-gray-600 sm:text-lg">
          Cho dù bạn chỉ đang thử nghiệm UIT Estate hoặc đang kinh doanh, chúng
          tôi có một gói phù hợp với bạn.
        </p>
        <p>
          Bạn hiện đang đăng ký gói{' '}
          <span className="font-bold">{plan.name}</span>.
        </p>
        <p>
          {plan.isCanceled
            ? `Gói đăng ký của bạn đã được hủy và sẽ hết hạn vào ${new Date(
                plan.stripeCurrentPeriodEnd
              ).toLocaleDateString()}`
            : `Gói đăng ký của bạn sẽ được làm mới vào ${new Date(
                plan.stripeCurrentPeriodEnd
              ).toLocaleDateString()} `}
        </p>

        {plan.isSubscribed ? <UpgradeButton /> : null}
      </div>
      {/* <div className="pt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <TooltipProvider>
          {pricingItems.map(({ plan, tagline, quota, features }) => {
            const price =
              PLANS.find((p) => p.slug === plan.toLowerCase())?.price.amount ||
              0;

            return (
              <PlanCard
                plan={plan}
                tagline={tagline}
                quota={quota}
                features={features}
                price={price}
              />
            );
          })}
        </TooltipProvider>
      </div> */}
      <stripe-pricing-table
        pricing-table-id="prctbl_1NziOrDkCoGJKtINq7uukJNQ"
        publishable-key="pk_test_51NyrvcDkCoGJKtINwzURZ4TLs1w3a37Cd5QyadhXTBpi1BA566iqEmLcWc7BuUDZ6zN9E63jcvp8QyZCpwxBNgyO00wY4yPQdr"
        client-reference-id="cus_On9rYDCPm58kfc"
      ></stripe-pricing-table>
    </div>
  );
};
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'stripe-pricing-table': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
export default page;
