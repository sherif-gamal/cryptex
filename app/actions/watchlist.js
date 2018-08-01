import * as types from '../constants/ActionTypes';

export function addItem(crypto) {
  return { type: types.ADD_WATCHLIST_ITEM, crypto };
}

export function deleteItem(crypto) {
  return { type: types.DELETE_WATCHLIST_ITEM, crypto };
}
