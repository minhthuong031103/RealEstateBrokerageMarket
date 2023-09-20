'use client';

import Link from 'next/link';

import { cn, currencyFormat } from '@/lib/utils';
import { Badge } from './new-york/badge';
import { Button, buttonVariants } from '@/components/new-york/button';
import { Separator } from '@/components/new-york/separator';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/new-york/sheet';
// import { CartLineItems } from '@/components/checkout/cart-line-items';

import { useCart } from '@/hooks/useCart';
import { CommonSvg } from '@/assets/CommonSvg';
import { CartLineItems } from './CartLineItems';

export function CartSheet() {
  const { cart } = useCart();
  const itemCount = cart.listItem.length;
  const cartLineItems = cart.listItem;
  const cartTotal = cart.total ?? 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Open cart"
          variant="outline"
          size="icon"
          className="relative"
        >
          {itemCount > 0 && (
            <Badge
              variant="secondary"
              className="absolute -right-2 -top-2 h-6 w-6 justify-center rounded-full p-2.5"
            >
              {itemCount}
            </Badge>
          )}
          {CommonSvg.cart({ className: 'h-4 w-4' })}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle>Cart {itemCount > 0 && `(${itemCount})`}</SheetTitle>
        </SheetHeader>
        <div className="pr-6">
          <Separator />
        </div>
        {itemCount > 0 ? (
          <>
            <div className="flex flex-1 flex-col gap-5 overflow-hidden">
              <CartLineItems items={cartLineItems} />
            </div>
            <div className="grid gap-1.5 pr-6 text-sm">
              <Separator className="mb-2" />
              <div className="flex">
                <span className="flex-1">Subtotal</span>
                <span>{currencyFormat(cartTotal)}</span>
              </div>
              <div className="flex">
                <span className="flex-1">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex">
                <span className="flex-1">Taxes</span>
                <span>Calculated at checkout</span>
              </div>
              <Separator className="mt-2" />
              <div className="flex">
                <span className="flex-1">Total</span>
                <span>{currencyFormat(cartTotal)}</span>
              </div>
              <SheetFooter className="mt-1.5">
                <SheetTrigger asChild>
                  <Link
                    aria-label="View your cart"
                    href="/cart"
                    className={buttonVariants({
                      size: 'sm',
                      className: 'w-full',
                    })}
                  >
                    View your cart
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            {CommonSvg.cart({
              className: 'mb-4 h-16 w-16 text-muted-foreground',
            })}

            <div className="text-xl font-medium text-muted-foreground">
              Your cart is empty
            </div>
            <SheetTrigger asChild>
              <Link
                aria-label="Add items to your cart to checkout"
                href="/products"
                className={cn(
                  buttonVariants({
                    variant: 'link',
                    size: 'sm',
                    className: 'text-sm text-muted-foreground',
                  })
                )}
              >
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
