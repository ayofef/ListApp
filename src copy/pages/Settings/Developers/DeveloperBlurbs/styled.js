import styled from 'styled-components';

export const StyledWrapper = styled.div`
  display: flex;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(193, 195, 198, 0.3);
  width: 100%;

  & > :not(:last-child) {
    margin-right: 16px;
  }
`;
