'use client';

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//disptach, seclector
import {
  addToCart,
  increaseItemFromCart,
  decreaseItemFromCart,
  deleteItemFromCart,
} from '@/redux/cart/cart';
export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart) || null;

  const onAddToCart = useCallback(({ data, selectedSize }) => {
    dispatch(addToCart({ data, selectedSize }));
  }, []);

  const onIncreaseItemFromCart = useCallback(({ data, selectedSize }) => {
    dispatch(increaseItemFromCart({ data, selectedSize }));
  }, []);

  const onDecreaseItemFromCart = useCallback(({ data, selectedSize }) => {
    dispatch(decreaseItemFromCart({ data, selectedSize }));
  }, []);

  const onDeleteItemFromCart = useCallback(
    ({ data, selectedSize, quantity }) => {
      dispatch(deleteItemFromCart({ data, selectedSize, quantity }));
    },
    []
  );
  return {
    onAddToCart,
    onIncreaseItemFromCart,
    onDecreaseItemFromCart,
    onDeleteItemFromCart,
    cart,
  };
};

//trong hook se return functions va state global
