import './itemList.css';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { iItem } from '../../types/components/item.type';
import Item from '../item/item.component';
import { createItem, createItemList } from '../../constant/dummies';

const ItemList = () => {

  const [items, setItems] = useState<iItem[]>(() => {
    return createItemList(5);
  });
  const [text, setText] = useState<string>('');

  // 개수 체크를 위한 ref
  const lastLen = useRef(items.length);
  const scrollList = useRef(null);

  const scrollToBottom = () => {
    const innerScroll = scrollList.current as HTMLElement | null;
    if (innerScroll) {
      innerScroll.scrollTo(0, innerScroll.scrollHeight);
    }
  };

  useEffect(() => {
    // 늘어난 경우에만 스크롤 해줌
    if (scrollList && lastLen.current < items.length) {
      scrollToBottom();
    }
  }, [items]);

  const handleChange = (event: SyntheticEvent) => {
    const { value } = event.target as HTMLInputElement;
    setText(value);
  };

  const addItem = (ev: SyntheticEvent) => {
    if (!text.length) {
      alert("내용을 입력 해 주세요.");
      return false;
    }
    lastLen.current = items.length;
    const lastIdx = items[items.length - 1]?.index;
    const nextIdx = lastIdx >= 0 ? lastIdx + 1 : 0;
    const newItem = createItem(nextIdx);
    newItem.text = text;
    setItems([...items, newItem]);
    setText('');
  };

  const removeItem = (itemId: string) => {
    const copiedItems: iItem[] = Array.from(items);
    lastLen.current = copiedItems.length;
    const removeIndex = copiedItems.findIndex(( item: iItem ) => item.id === itemId);
    if (removeIndex === -1) return;
    copiedItems.splice(removeIndex, 1);
    setItems(copiedItems);
  };

  return ( 
    <>
      <nav className="item-controller">
        <input className="item-controller__input" type="text" value={text} onChange={handleChange}/>
        <button type="button" className="item-controller__button" onClick={addItem}>추가 &#43;</button>
      </nav>

      <section className="item-list" ref={scrollList}>
        {
          items.map( ({id, text, ...rest}) => {
            return <Item key={id} id={id} text={text} {...rest} onRemove={() => removeItem(id)} />
          })
        }
      </section>
    </>
  )
};

export default ItemList;