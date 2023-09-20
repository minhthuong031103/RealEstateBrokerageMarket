'use client';

import { CartLineItems } from '@/components/CartLineItems';
import { useCart } from '@/hooks/useCart';
import React from 'react';

function LeftCart() {
  const { cart } = useCart();
  const itemCount = cart.listItem.length;
  const cartLineItems = cart.listItem;
  return (
    <div>
      <h2 className="text-lg font-semibold">Your Items ({itemCount})</h2>
      <CartLineItems items={cartLineItems} />
    </div>
  );
}

export default LeftCart;
