import { TooltipProvider } from '@/components/ui/tooltip';
import { PLANS } from '@/config/stripe';

import React from 'react';
import PlanCard from './planCard';

const pricingItems = [
  {
    plan: 'Free',
    tagline: 'For small side projects.',
    quota: 10,
    features: [
      {
        text: '5 pages per PDF',
        footnote: 'The maximum amount of pages per PDF-file.',
      },
      {
        text: '4MB file size limit',
        footnote: 'The maximum file size of a single PDF file.',
      },
      {
        text: 'Mobile-friendly interface',
      },
      {
        text: 'Higher-quality responses',
        footnote: 'Better algorithmic responses for enhanced content quality',
        negative: true,
      },
      {
        text: 'Priority support',
        negative: true,
      },
    ],
  },
  {
    plan: 'Pro',
    tagline: 'For larger projects with higher needs.',
    quota: PLANS.find((p) => p.slug === 'pro')!.time,
    features: [
      {
        text: '25 pages per PDF',
        footnote: 'The maximum amount of pages per PDF-file.',
      },
      {
        text: '16MB file size limit',
        footnote: 'The maximum file size of a single PDF file.',
      },
      {
        text: 'Mobile-friendly interface',
      },
      {
        text: 'Higher-quality responses',
        footnote: 'Better algorithmic responses for enhanced content quality',
      },
      {
        text: 'Priority support',
      },
    ],
  },
];
const page = async () => {
  return (
    <div className="w-full h-full">
      <div className="mx-auto mb-10 sm:max-w-lg ">
        <h1 className="text-6xl font-bold sm:text-7xl ">Pricing</h1>

        <p className="mt-5 text-gray-600 sm:text-lg">
          Whether you&apos;re just trying out UIT Estate or running a business,
          we have a plan that&apos;s right for you.
        </p>
      </div>
      <div className="pt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
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
      </div>
    </div>
  );
};

export default page;
