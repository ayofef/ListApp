import styled from 'styled-components';
import { withStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import { FlexContainer } from '../../../components/atoms/flex/FlexContainer';

const StyledList = withStyles({
  root: {
    // padding: '0 4px',
    '& li': {
      // padding: '2px 16px',
      paddingTop: '0',
      paddingBottom: '8px',
    },
  },
})(List);

const StyledTimeContainer = styled(FlexContainer)`
  cursor: pointer;

  &:hover {
    border-color: #9ca0ff;
    transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 0 2px 1px rgba(150, 160, 255, 0.2);
  }
  &:focus {
    border-color: #4e40ef;
    box-shadow: 0 0 2px 1px rgba(150, 160, 255, 0.2);
  }
`;

export { StyledTimeContainer, StyledList };
