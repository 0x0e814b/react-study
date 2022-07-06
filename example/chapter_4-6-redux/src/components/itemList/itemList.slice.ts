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
      state.items = items.concat(newItem);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const copiedItems: iItem[] = Array.from(state.items);
      const removeIndex = copiedItems.findIndex(
        (item: iItem) => item.id === action.payload
      );
      if (removeIndex === -1) return;
      copiedItems.splice(removeIndex, 1);
      state.items = copiedItems;
    },
  },
});

export const { addItem, removeItem } = itemListSlice.actions;
export const selectItems = (state: RootState) => state.itemList?.items;
export default itemListSlice.reducer;
