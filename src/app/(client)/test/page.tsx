'use client';

import { Button } from '@/components/ui/button';
import { useTest } from '@/hooks/useTest';
import React from 'react';

function page() {
  const onClickAddtoCart = () => {
    onAddtoCart({
      data: { id: '1', name: 'test', price: 100, quantity: 1 },
      selectedSize: 'US 39',
    });
  };
  const { onAddtoCart } = useTest();
  return (
    <div>
      <Button onClick={onClickAddtoCart}>add to cart</Button>
    </div>
  );
}

export default page;
