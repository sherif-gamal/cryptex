import * as types from '../constants/ActionTypes';

export function addItem(crypto) {
  return { type: types.ADD_PORTFILIO_ITEM, crypto };
}

export function deleteItem(crypto) {
  return { type: types.DELETE_PORTFILIO_ITEM, crypto };
}

export function buy(crypto) {
  return { type: types.BUY_CRYPTO, crypto };
}

export function sell(crypto) {
  return { type: types.SELL_CRYPTO, crypto };
}
