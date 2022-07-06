import styled from '@emotion/styled';
import type { iItem } from '../../types/components/item.type';
import commonButton from '../commonButton/commonButton.component';
import * as ItemStyle from './item.styled';

const ItemContainer = styled.article`
  position: relative;
  margin-bottom: .5rem;
  &:hover {
    ${ItemStyle.content} {
      background-color: #fff;
      transform: translate3d(-.15rem, -.15rem, 0);
    }
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

const DeleteButton = styled(commonButton)`
  margin-left: auto;
`;

const Item = ({ text, onRemove }: iItem) => {
  return (
    <ItemContainer>
      <ItemStyle.content>
        { text }
        <DeleteButton onClick={onRemove}>삭제</DeleteButton>
      </ItemStyle.content>
      <ItemStyle.dim />
    </ItemContainer>
  );
};

export default Item;