interface iItem {
  index: number;
  id: string;
  text: string;
  onRemove?: () => void;
}

interface iItemBtn {
  key?: any;
  text: string;
  onClick?: () => void;
}

export type { iItem, iItemBtn };
