import styled from 'styled-components';

export const StyledTableWrapper = styled.div`
  margin-top: 54px;

  & table {
    tbody {
      tr {
        & > :not(:nth-child(2), :nth-child(5)) {
          color: #787f88 !important;
        }
      }
    }
  }
`;
