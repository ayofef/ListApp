import styled from 'styled-components';
import { withStyles, Box, Button } from '@material-ui/core';

export const StyledLabel = styled.label`
  padding: 16px 20px 16px 10px;

  input {
    border: none;
    width: 300px;
    background-color: transparent;

    &:hover,
    &:focus {
      outline: none;
    }
  }
`;

export const StyledIcon = withStyles({
  root: {
    width: '24px',
    boxSizing: 'border-box',
    display: 'block',

    '&>img': {
      width: '100%',
      marginTop: '5px',
      borderRadius: '4px',
    },
    '&>svg': {
      width: '100%',
      marginTop: '5px',
    },
  },
})(Box);

export const StyledButton = withStyles({
  root: {
    minWidth: '10px',
    overflow: 'hidden',
    color: '#787F88',
    fontWeight: 'normal',

    '&:hover': {
      backgroundColor: '#fff !important',
      color: '#4E40EF',
    },
  },
})(Button);
