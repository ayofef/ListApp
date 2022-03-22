import styled from 'styled-components';

export const StyledIconWrapper = styled.div`
  margin-right: 16px;
  width: 42px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  overflow: hidden;

  & svg {
    transform: scale(1.2);
  }
`;
