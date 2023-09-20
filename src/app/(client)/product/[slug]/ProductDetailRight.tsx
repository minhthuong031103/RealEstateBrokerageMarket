'use client';

import { Button } from '@/components/new-york/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/new-york/sheet';
import { currencyFormat, parseJSON } from '@/lib/utils';
import React, { useState } from 'react';
import { IoMdHeartEmpty } from 'react-icons/io';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';

function ProductDetailRight({ data }) {
  const [selectedSize, setSizeSelected] = useState(null);
  const [showError, setShowError] = useState(false);
  const { onAddToCart, cart } = useCart();

  console.log(cart);
  return (
    <div className="flex-[1] py-3">
      {/* Product Title */}
      <div className="text-[34px] font-semibold mb-2 leading-tight">
        {data.name}
      </div>

      {/* Product Subtitle */}
      <div className="text-lg font-semibold mb-5">{data.subtitle}</div>

      {/* Product Price */}
      <div className="text-lg font-semibold ">{currencyFormat(data.price)}</div>

      {data.original_price && (
        <div>
          <p className="text-base font-medium line-through ">
            {currencyFormat(data.original_price)}
          </p>
          <p className="ml-auto text-base font-medium text-green-500">
            {' '}
            17% off
          </p>
        </div>
      )}

      {/* Product size */}

      <div className="mb-10">
        {/* Heading */}
        <div className="flex justify-between mb-2">
          <div className="text-md font-semibold">Select size</div>
          <div className="text-md font-medium text-black/[0.5] cursor pointer">
            Select guide
          </div>
        </div>
        {/* Heading */}

        {/* Size start */}
        <div id="sizesGrid" className="grid grid-cols-3 gap-2">
          {parseJSON(data.sizes)?.map((size, index) => (
            <div
              onClick={
                size.number > 0
                  ? () => {
                      setSizeSelected(size.size);
                      setShowError(false);
                    }
                  : () => {}
              }
              key={index}
              className={`border-2 rounded-md text-center py-2.5 font-medium
    hover:bg-slate-300 
      cursor-pointer ${
        size.number > 0
          ? 'hover:border-black cursor-pointer'
          : 'cursor-not-allowed disabled bg-black/[0.1] opacity-50'
      } ${selectedSize === size.size ? 'border-black' : ''} `}
            >
              {size.size}
            </div>
          ))}
        </div>
        {/* Size end */}

        {/* Show error */}
        {showError && (
          <div className="text-red-600 mt-1">Size selection is required</div>
        )}
        {/* Show error */}
      </div>
      <div className="flex flex-col gap-2 w-full items-center justify-center">
        {/* Product size */}
        {selectedSize ? (
          <Sheet>
            <SheetTrigger className="w-full mx-0 flex items-center justify-center  ">
              <Button
                className="w-full py-4 rounded-full bg-black text-white text-lg
                  font-medium transition-transform active:scale-95 mb-3 hover:opacity-75
                  "
                onClick={() => {
                  onAddToCart({ data, selectedSize });
                }}
              >
                Add to cart
              </Button>
            </SheetTrigger>
            <SheetContent side={'topRight'} className="w-[400px]">
              <SheetHeader>
                <div className="flex flex-row gap-3 items-center">
                  <BsFillCheckCircleFill
                    className="text-green-500 mr-2"
                    size={20}
                  />
                  <SheetTitle>Added to Cart</SheetTitle>
                </div>
                <div className=" flex flex-row gap-4 w-full">
                  <div className="relative aspect-square h-24 w-16 min-w-fit overflow-hidden rounded">
                    <Image
                      alt="add to cart"
                      src={
                        parseJSON(data?.thumbnail)?.url ||
                        '/assets/placeholder.png'
                      }
                      sizes="(max-width: '768px') 100vw, (max-width: 1200px) 50vw, 33vw"
                      fill
                      className="absolute object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span
                      className="text-black text-sm
        font-medium"
                    >
                      {data.name}
                    </span>
                    <span
                      className="text-black text-sm
        font-normal"
                    >
                      Men's shoes
                    </span>
                    <span
                      className="text-black text-sm
        font-normal"
                    >
                      {selectedSize}
                    </span>

                    <span
                      className="text-black text-sm
        font-medium"
                    >
                      {currencyFormat(data.price)}
                    </span>
                  </div>
                </div>
                <div className="flex-row flex w-full py-3">
                  <Button variant={'outline'} className="w-full ">
                    View Cart ({cart?.listItem.length})
                  </Button>

                  <Button className="w-full">Check out</Button>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="w-full flex ">
            <Button
              className="w-full py-4  rounded-full bg-black text-white text-lg
        font-medium transition-transform active:scale-95 mb-3 hover:opacity-75
        "
              onClick={() => {
                if (!selectedSize) {
                  setShowError(true);
                  document.getElementById('sizesGrid')?.scrollIntoView({
                    block: 'center',
                    behavior: 'smooth',
                  });
                }
              }}
            >
              Add to cart
            </Button>
          </div>
        )}
        <div className="w-full flex ">
          <Button
            variant={'outline'}
            className="w-full py-4 rounded-full border border-black
        text-lg font-medium transition-transform active:scale-95 flex items-center
        justify-center gap-2 hover:opacity-75 mb-10
                "
          >
            Wish List
            <IoMdHeartEmpty size={20} />
          </Button>
        </div>
      </div>

      <div>
        <div className="text-lg font-bold mb-5">Product Details</div>
        <div className="markdown text-md mb-5">{data.description}</div>
      </div>
    </div>
  );
}

export default ProductDetailRight;
