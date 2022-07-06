import styled from 'styled-components';

const content = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  background-color: #fff;
  cursor: pointer;
  border: 0.2rem solid #000;
  z-index: 1;
  transition: backgroundColor 0.25s ease-out, transform 0.25s ease-out;
`;

const dim = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: black;
  z-index: 0;
`;

export { content, dim };
