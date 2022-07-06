import itemListReducer from './../components/itemList/itemList.slice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    itemList: itemListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
