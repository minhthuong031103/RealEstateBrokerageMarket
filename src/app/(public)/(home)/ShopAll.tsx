import { Button } from '@/components/ui/button';
import React from 'react';
import { Balancer } from 'react-wrap-balancer';

function ShopAll() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-28"
    >
      <h1 className="px-1 text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
        FLIGHT HERITAGE
      </h1>
      <Balancer className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
        A new era is not an ending—it’s an evolution. Join us in the next
        chapter with staple wardrobe pieces that bring Jordan heritage into the
        cutting-edge of future fashion.
      </Balancer>
      <Button>Shop all</Button>
    </section>
  );
}

export default ShopAll;
