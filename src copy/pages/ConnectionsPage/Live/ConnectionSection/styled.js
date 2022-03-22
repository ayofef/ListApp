import styled from 'styled-components';

export const StyledButton = styled.button`
  padding: 0;
  margin: 0;
  background: #fff;
  color: red;
  border: none;
  height: 26px;
  outline: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #787f88;
  cursor: pointer;

  & > :not(:last-child) {
    margin-right: 10px;
  }

  p {
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }

  &:hover {
    color: #4e40ef;
    svg {
      path {
        fill: #4e40ef;
      }
    }
  }
`;

export const StyledConnectionsWrapper = styled.div`
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  flex-direction: column;
  display: flex;
  flex-wrap: wrap;
`;
