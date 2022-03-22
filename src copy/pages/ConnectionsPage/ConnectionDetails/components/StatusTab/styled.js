import styled from 'styled-components';

export const StyledWrapper = styled.div`
  width: 100%;
  min-width: 436px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  border: 1px solid #e6e9ec;
  box-sizing: border-box;
  margin-bottom: 32px;
`;

export const StyledTitleWrapper = styled.div`
  border-bottom: 1px solid #e6e9ec;
  padding: ${({ p }) => p ?? '24px'};
`;

export const StyledStatusWrapper = styled.div`
  width: 100%;
  margin-top: 32px;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 1305px) {
    flex-direction: row;

    & > :first-child {
      margin-right: 32px;
    }
  }
`;
