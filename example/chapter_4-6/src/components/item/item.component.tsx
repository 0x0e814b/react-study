import type { CSSProperties } from 'react';
import type { iItem } from '../../types/components/item.type';

const ItemStyles: {[key: string]: CSSProperties} = {
  content: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '1rem',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    cursor: 'pointer',
    border: '.2rem solid #000',
    zIndex: 1,
  },
  dim: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    background: 'black',
    zIndex: 0
  },
  removeButton: {
    marginLeft: 'auto'
  }
}

const Item = ({ text, onRemove }: iItem) => {
  return (
    <article className="item">
      <div className="item__content" style={ItemStyles.content}>
        { text }
        <button 
          className="item-controller__button" 
          style={ItemStyles.removeButton} onClick={onRemove}>
          삭제
        </button>
      </div>
      <div className="item__dim"  style={ItemStyles.dim}></div>
    </article>
  );
};

export default Item;