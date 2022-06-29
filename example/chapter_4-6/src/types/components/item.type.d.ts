interface iItem {
  index: number;
  id: string;
  text: string;
  onRemove?: () => void;
}

export type { iItem };
