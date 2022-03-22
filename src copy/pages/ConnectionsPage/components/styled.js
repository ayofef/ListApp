import styled from 'styled-components';
import { ListItem, withStyles } from '@material-ui/core';
import { FlexContainer } from '../../../components/atoms/flex/FlexContainer';

export const StyledFlexContainer = styled(FlexContainer)`
  & .Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #3023c8 !important;
    border-width: 1px;
    outline: none !important;
    box-shadow: 0 0 2px 2px rgba(151, 127, 255, 0.23) !important;
  }
  & .MuiOutlinedInput-root:hover fieldset {
    border-color: #3023c8 !important;
  }
  & .MuiOutlinedInput-root {
    border-radius: 6px !important;
    overflow: hidden;

    & fieldset {
      border-color: #fff;
      border-radius: 6px !important;
    }
  }
`;

export const StyledListItem = withStyles({
  root: {
    paddingTop: '2px',
    paddingBottom: '2px',
  },
})(ListItem);
