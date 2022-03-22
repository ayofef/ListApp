import styled from 'styled-components';

const StyledRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  outline: none;
  border: none;
  box-sizing: border-box;
  cursor: pointer;
  text-align: left;

  & > :first-child {
    max-width: 400px;
  }

  & > div {
    flex: 1;
  }

  & > :nth-child(2) {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    & > :not(:last-child) {
      margin-right: 12px;
    }
  }

  & > :last-child {
    flex: 0 0 52px;
  }

  &:disabled {
    cursor: unset;
  }
`;

export { StyledRow };
