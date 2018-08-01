import * as ActionTypes from '../constants/ActionTypes';

const initialState = [{
  from: 'BTC',
  to: 'AUD',
  amount: 0,
  price: 0,
  avg: 0
},
{
  from: 'ETH',
  to: 'AUD',
  amount: 0,
  price: 0,
  avg: 0
},
{
  from: 'CHC',
  to: 'AUD',
  amount: 0,
  price: 0,
  avg: 0
},
{
  from: 'STEEM',
  to: 'AUD',
  amount: 0,
  price: 0,
  avg: 0
}];

const actionsMap = {
  [ActionTypes.ADD_PORTFILIO_ITEM](state, action) {
    debugger;
    return [{
      from: action.from,
      to: action.to,
      amout: 0,
      price: 0,
      avg: 0
    }, ...state];
  },
  [ActionTypes.DELETE_PORTFILIO_ITEM](state, action) {
    return state.filter(item =>
      item.from !== action.from || item.to !== action.to
    );
  },
  [ActionTypes.BUY_CRYPTO](state, action) {
    let done = false;
    const newState = state.map((item) => {
      if (item.from === action.from && item.to === action.to) {
        done = true;
        const amount = item.amount + action.amount;
        const price = item.price + action.price;
        const avg = price / amount;
        return Object.assign({}, item, { amount, price, avg });
      }
      return item;
    });
    if (!done) {
      return [{
        from: action.from,
        to: action.to,
        amount: action.amount,
        price: action.price,
        avg: action.price / action.amount
      }, ...newState];
    }
    return newState;
  },
  [ActionTypes.SELL_CRYPTO](state, action) {
    const newState = state.map((item) => {
      if (item.from === action.from && item.to === action.to && item.amount >= action.amount) {
        const amount = item.amount - action.amount;
        if (amount === 0) return null;
        return Object.assign({}, item, { amount });
      }
      return item;
    });
    return newState;
  }
};

export default function portfolio(state = initialState, action) {
  const reduceFn = actionsMap[action.type];
  if (!reduceFn) return state;
  return reduceFn(state, action);
}
