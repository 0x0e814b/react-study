import styled from '@emotion/styled';

const controller = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const controllerInput = styled.input`
  height: 100%;
  box-sizing: border-box;
  border: 2px solid #000;
  padding: 0.2rem;
`;

const listWrapper = styled.section`
  width: 20rem;
  height: 80%;
  max-width: 90%;
  overflow: auto;

  box-sizing: border-box;

  padding: 0.5rem;
  border: 4px solid #000;

  background-color: #ccc;

  &::-webkit-scrollbar {
    width: 0.7rem;
    background-color: #fff;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 1);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export { controller, controllerInput, listWrapper };
