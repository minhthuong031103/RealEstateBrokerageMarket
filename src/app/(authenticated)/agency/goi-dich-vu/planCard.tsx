import { buttonVariants } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { ArrowRight, Check, HelpCircle, Minus } from 'lucide-react';
import Link from 'next/link';
import UpgradeButton from './upgradeButton';
const PlanCard = ({ plan, tagline, quota, features, price }) => {
  return (
    <div
      key={plan}
      className={cn('relative rounded-2xl bg-white shadow-lg', {
        'border-2 border-blue-600 shadow-blue-200 ': plan === 'Pro',
        'border border-gray-200': plan === 'Free',
      })}
    >
      {plan === 'Pro' && (
        <div
          className={`absolute -top-5 left-0 right-0 mx-auto 
      w-32 rounded-full bg-gradient-to-r from-blue-600
       to-cyan-600 
      px-3 py-2 text-sm font-medium text-white`}
        >
          Upgrade now
        </div>
      )}

      <div className="p-5 ">
        <h3 className="my-3 text-center font-display text-3xl font-bold">
          {plan}
        </h3>
        <p className="text-gray-500">{tagline}</p>

        <p className="my-5 font-display text-6xl font-semibold">{price} VND</p>
        <p className="text-gray-500">/Tháng</p>
      </div>
      <div className="flex h-20 items-center justify-center border-b border-t border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-1 ">
          <p>{quota.toLocaleString()} Bài đăng/tháng</p>
          <Tooltip delayDuration={300}>
            <TooltipTrigger className="cursor-default ml-1.5">
              <HelpCircle className="w-4 h-4 text-zinc-500" />
            </TooltipTrigger>
            <TooltipContent className="w-80 p-2">
              Bạn có thể tạo tối da {quota.toLocaleString()} bài đăng mỗi tháng
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <ul className="my-10 space-y-5 px-0">
        {features.map(({ text, footnote, negative }) => {
          return (
            <li key={text} className="flex space-x-5">
              <div className="flex-shrink-0">
                {negative ? (
                  <Minus className="w-6 h-6 text-gray-300" />
                ) : (
                  <Check className="w-6 h-6 text-blue-500" />
                )}
              </div>
              {footnote ? (
                <div className="flex items-center space-x-1">
                  <p
                    className={cn('text-gray-400', {
                      'text-gray-600': negative,
                    })}
                  >
                    {text}
                  </p>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger className="cursor-default ml-1.5">
                      <HelpCircle className="h-4 w-4 text-zinc-500" />
                    </TooltipTrigger>
                    <TooltipContent className="w-80 p-2">
                      {footnote}
                    </TooltipContent>
                  </Tooltip>
                </div>
              ) : (
                <p
                  className={cn('text-gray-400', {
                    'text-gray-600': negative,
                  })}
                >
                  {text}
                </p>
              )}
            </li>
          );
        })}
      </ul>
      <div className="border-t border-gray-200 "></div>
      <div className="p-5">
        {plan === 'Free' ? (
          <Link
            href={'/auth/login'}
            className={buttonVariants({
              className: 'w-full',
              variant: 'secondary',
            })}
          >
            Upgrade now {<ArrowRight className="w-5 h-5 ml-1.5" />}
          </Link>
        ) : (
          <UpgradeButton />
        )}
      </div>
    </div>
  );
};

export default PlanCard;
