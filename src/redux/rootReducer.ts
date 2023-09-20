import { combineReducers } from 'redux';
import cart from './cart/cart';
import favorite from './favorite/favorite';

export default combineReducers({ cart, favorite });
