import { createStore } from 'redux';


const initialState = {
  isShown: false,
  price: 0,
  isAuthenticated: false,
  currentUser: 'default user',
};

const ACTION_CHANGE_SHOWN = 'ACTION_CHANGE_SHOWN';
const ACTION_CHANGE_PRICE = 'ACTION_CHANGE_PRICE';
const ACTION_CHANGE_USER = 'ACTION_CHANGE_USER';
const ACTION_CHANGE_ISAUTHENTICATED = 'ACTION_CHANGE_ISAUTHENTICATED';

const changeShownModal = (isShown) => {
  return {
    type: ACTION_CHANGE_SHOWN,
    payload: isShown
  }
};

const changePrice = (price) => {
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
    default:
      return state;
  }
};

export default createStore(rootReducer);
