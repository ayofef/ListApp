import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';

export const StyledFormControl = styled(FormControl)`
  &.MuiFormControl-root {
    padding: 5px 16px;
    background-color: #f5f6f7;
    box-sizing: border-box;
    border-radius: 6px;
    & .MuiInputBase-root {
      margin-top: 2px;
      color: #787f88;
      &:before,
      &:after {
        display: none;
      }
    }
  }
`;

export const StyledSummaryItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 16px 0;

  & > * {
    font-size: 14px !important;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #e6e9ec;
  }
`;
