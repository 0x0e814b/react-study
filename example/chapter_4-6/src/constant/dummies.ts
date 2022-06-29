const createItem = (itemIndex: number) => {
  return {
    index: itemIndex,
    id: `item-index-${itemIndex}`,
    text: `item ${itemIndex + 1}`,
  };
};

const createItemList = (length: number = 5) => {
  return Array.from({ length }, (_, idx) => createItem(idx));
};

export { createItem, createItemList };
