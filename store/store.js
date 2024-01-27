// import { configureStore } from "@reduxjs/toolkit";
// import { authSlice, modalSlice, searchSlice } from "./auth/slice";

// const store = configureStore({
//   reducer: {
//     auth: authSlice.reducer,
//     modal: modalSlice.reducer,
//     search: searchSlice.reducer
//   },
// });



// export default store;

import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
// import flightSlice from './flight'; //Your Slice
// import ticketSlice from './ticket';//Your Slice
// import scheduleSlice from './schedule';//Your Slice
// import airportSlice from './airport';//Your Slice
// import passengerSlice from './passenger';//Your Slice
// import historySlice from './history';//Your Slice
// import testSlice from './test';//Your Slice
// import { configureStore } from "@reduxjs/toolkit";
import { authSlice, modalSlice, searchSlice } from "./auth/slice";
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

//wajib
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

//storage configure
const storage = typeof window !== 'undefined' ? createWebStorage('session') : createNoopStorage();

//name
const persistConfig = {
  key: 'ticketGo',
  storage,
  blacklist: ['auth'],
};

// ngide 1 jam :'(
// const combineSlices = {
//     flight: flightSlice,
//     passenger: passengerSlice,
// };

// yg bener
const rootReducer = combineReducers({
  // flight: flightSlice,
  // passenger: passengerSlice,
  // airport: airportSlice,
  // schedule: scheduleSlice,
  // ticket: ticketSlice,
  // test: testSlice,
  // history: historySlice,
  auth: authSlice.reducer,
  modal: modalSlice.reducer,
  search: searchSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);