import styled from 'styled-components';

export const StyledWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div {
    padding-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > :first-child {
      margin-right: 16px;
    }
  }
`;
