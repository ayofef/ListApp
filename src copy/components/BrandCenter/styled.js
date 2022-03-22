import styled from 'styled-components';

export const StyledWrapper = styled.div`
  & > :not(:last-child) {
    border-bottom: 1px solid #e6e9ec;
  }
`;
