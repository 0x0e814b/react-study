import { SyntheticEvent, useState } from 'react';
import Item from '../item/item.component';
import CommonButton from '../commonButton/commonButton.component';
import { useDispatch, useSelector } from 'react-redux';
import { selectItems, addItem, removeItem } from './itemList.slice';
import * as ListStyle from './itemList.styled';
import { useAutoScroll } from '../../hooks/useAutoScroll';

const ItemList = () => {
  const items = useSelector(selectItems);
  const scrollList = useAutoScroll(items.length);
  const dispatch = useDispatch();
  const [text, setText] = useState<string>('');

  const handleChange = (event: SyntheticEvent) => {
    const { value } = event.target as HTMLInputElement;
    setText(value);
  };

  const addListItem = (ev: SyntheticEvent) => {
    if (!text.length) {
      alert("내용을 입력 해 주세요.");
      return false;
    }
    dispatch(addItem(text));
    setText('');
  };

  return ( 
    <>
      <ListStyle.controller>
        <ListStyle.controllerInput type="text" value={text} onChange={handleChange} />
        <CommonButton onClick={addListItem}>추가 &#43;</CommonButton>
      </ListStyle.controller>
      <ListStyle.listWrapper ref={scrollList}>
        {
          items.map( ({id, text, ...rest}) => {
            return <Item key={id} id={id} text={text} {...rest} onRemove={() => dispatch(removeItem(id))} />
          })
        }
      </ListStyle.listWrapper>
    </>
  )
};

export default ItemList;