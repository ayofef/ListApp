import styled from 'styled-components';

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 8px 16px 8px 16px;

  & .wt-date-range-picker {
    & div[class*='materialui-daterange-picker-makeStyles-dateRangeBackdrop'] {
      display: none !important;
    }

    //wrapper
    & div[class*='MuiPaper-root MuiPaper-elevation5'] {
      box-shadow: none !important;
      overflow: hidden;
      border: none !important;
    }
  }
`;

export { StyledWrapper };
