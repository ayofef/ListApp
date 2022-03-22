import styled from 'styled-components';
import { withStyles, Box } from '@material-ui/core';
import { ButtonRounded } from '../../atoms';

export const StyledBox = withStyles({
  root: {
    minWidth: 'min-content',
    margin: '0 auto',
    position: 'absolute',
    backgroundColor: '#fff',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    outline: 'none',
    padding: '32px',
    borderRadius: '24px',
    boxShadow: '0px 0px 0px 2px rgba(155, 159, 171, 0.17)',
  },
})(Box);

export const StyledActions = withStyles({
  root: {
    '&>:not(:last-child)': {
      marginRight: '10px',
    },
  },
})(Box);

export const StyledButton = styled(ButtonRounded)`
  margin: 24px;
  span {
    padding: 0 10px;
  }
`;
