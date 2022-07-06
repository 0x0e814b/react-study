import styled from 'styled-components';
const CommonButton = styled.button`
  box-sizing: border-box;
  padding: .5rem 1rem;
  background-color: #fff;
  border: 2px solid #000;
  cursor: pointer;
  &:active {
    transform: translateY(3px);
  }
  &:hover {
    background: #000;
    color: #fff;
  }
`
export default CommonButton;