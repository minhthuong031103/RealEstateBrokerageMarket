'use client';

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, deleteFavorite } from '../redux/favorite/favorite';

export const useFavorite = () => {
  const dispatch = useDispatch();
  const favorite = useSelector((state: any) => state.favorite) || null;

  const onAddFavorite = useCallback(({ data }) => {
    dispatch(addFavorite({ data }));
  }, []);

  const onDeleteFavorite = useCallback(({ data }) => {
    dispatch(deleteFavorite({ data }));
  }, []);
  return { onAddFavorite, onDeleteFavorite, favorite };
};
