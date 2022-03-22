import styled from 'styled-components';

export const StyledPaper = styled.div`
  background-color: #fff;
  width: 350px;
  margin: 16px auto;
  padding: 6px 6px 24px 6px;
  overflow: hidden;

  & div[class*='MuiPickersCalendarHeader-switchHeader-'] {
    padding: 0 34px;
  }

  //disabled touch ripple
  & span[class*='MuiTouchRipple-root-'] {
    display: none;
  }
`;
