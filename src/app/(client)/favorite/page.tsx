'use client';

import ProductCard from '@/components/ProductCard';
import { useCart } from '@/hooks/useCart';
import React from 'react';

function page() {
  const { cart } = useCart();
  console.log(cart);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <ProductCard product={cart?.listItem[0]?.data} />
      </div>
    </div>
  );
}

export default page;
