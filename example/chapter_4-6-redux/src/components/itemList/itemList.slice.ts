import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/global.store';
import type { iItem } from '../../types/components/item.type';

interface itemListSliceState {
  items: iItem[];
}

const initialState: itemListSliceState = {
  items: [],
};

const createItem = (itemIndex: number, text: string) => {
  return {
    index: itemIndex,
    id: `item-index-${itemIndex}`,
    text,
  };
};

export const itemListSlice = createSlice({
  name: 'itemList',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      const items = state.items;
      const lastIdx = items[items.length - 1]?.index;
      const nextIdx = lastIdx >= 0 ? lastIdx + 1 : 0;
      const newItem = createItem(nextIdx, action.payload);
      state.items = [...items, newItem];
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addItem, removeItem } = itemListSlice.actions;
export const selectItems = (state: RootState) => state.itemList?.items;
export default itemListSlice.reducer;
