import styled from 'styled-components';

export const StyledWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: 20px;

  & > :not(:last-child) {
    margin-right: 16px;
  }
`;
