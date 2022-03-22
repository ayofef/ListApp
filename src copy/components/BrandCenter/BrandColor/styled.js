import styled from 'styled-components';
import { withStyles, RadioGroup } from '@material-ui/core';

export const StyledRadioGroup = withStyles({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    margin: '0 0 0 24px',
    width: '720px',

    '&>:not(:last-child)': {
      marginRight: '10px',
    },
    '& > *': {
      margin: '0',
    },
  },
})(RadioGroup);

export const StyledLabel = styled.label`
  display: flex;
  input {
    text-transform: uppercase;
    border: none;
    display: inline-block;
    width: 100%;
    text-align: center;
    background-color: #fff;
    font-weight: 600;
    font-size: 14px;
    color: #000000;

    &:focus {
      outline: none;
      border-bottom: 1px solid currentColor;
    }
  }
`;
