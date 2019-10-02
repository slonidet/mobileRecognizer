import { createStore } from 'redux';


const initialState = {
  isAuthenticated: false,
  currentUser: 'default user',
  isShown: false,
  price: 0,
  currentCart: NaN,
  cartCost: 0,
};

const ACTION_CHANGE_SHOWN = 'ACTION_CHANGE_SHOWN';
const ACTION_CHANGE_PRICE = 'ACTION_CHANGE_PRICE';
const ACTION_CHANGE_USER = 'ACTION_CHANGE_USER';
const ACTION_CHANGE_ISAUTHENTICATED = 'ACTION_CHANGE_ISAUTHENTICATED';
const ACTION_CHANGE_CURRENT_CART = 'ACTION_CHANGE_CURRENT_CART';
const ACTION_CHANGE_CART_COST = 'ACTION_CHANGE_CART_COST';

export const changeCartCost = (cartCost) => {
  return {
    type: ACTION_CHANGE_CART_COST,
    payload: cartCost
  }
}

export const changeCurrentCart = (cartNum) => {
  return {
    type: ACTION_CHANGE_CURRENT_CART,
    payload: cartNum
  }
};

export const changeShownModal = (isShown) => {
  return {
    type: ACTION_CHANGE_SHOWN,
    payload: isShown
  }
};

export const changePrice = (price) => {
  return {
    type: ACTION_CHANGE_PRICE,
    payload: price
  }
};

export const changeUser = (user) => {
  return {
    type: ACTION_CHANGE_USER,
    payload: user,
  }
}

export const changeIsAuthenticated = (isAuthenticated) => {
  return {
    type: ACTION_CHANGE_ISAUTHENTICATED,
    payload: isAuthenticated,
  }
}

const rootReducer = (state=initialState, action) => {
  switch (action.type) {
    case ACTION_CHANGE_SHOWN:
      return { ...state, isShown: action.payload };
    case ACTION_CHANGE_PRICE:
      return { ...state, price: action.payload };
    case ACTION_CHANGE_ISAUTHENTICATED:
      return { ...state, isAuthenticated: action.payload };
    case ACTION_CHANGE_CURRENT_CART:
      return { ...state, currentCart: action.payload };
    case ACTION_CHANGE_CART_COST:
      return { ...state, cartCost: action.payload };
    default:
      return state;
  }
};

export default createStore(rootReducer);
