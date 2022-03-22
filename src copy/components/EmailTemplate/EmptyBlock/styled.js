import styled from 'styled-components';
import { Box, withStyles, Button } from '@material-ui/core';

const reuseableStyle = {
  borderRadius: '8px',
  boxShadow: '0px 0px 0px 2px rgba(155, 159, 171, 0.11)',
  backgroundColor: '#fff',
};

export const StyledBox = withStyles({
  root: {
    display: ({ show }) => (show ? 'block' : 'none'),
    transform: 'translate(-100%, -50%)',
    cursor: 'pointer',
    padding: '0',
    '&:focus': {
      outline: 'none',
    },
    '&>ul': {
      position: 'relative',
      top: '16px',
      listStyleType: 'none',
      padding: '10px',

      ...reuseableStyle,
    },
    '&>div': {
      ...reuseableStyle,
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      '&>:not(:last-child)': {
        marginBottom: '10px',
      },
      '&>input': {
        display: 'inline-block',
        padding: '10px 16px',
        backgroundColor: ' #F0F2F4',
        border: 'none',
        borderRadius: '8px',
        width: '200px',

        '&:focus': {
          outline: 'none',
        },
      },
    },
  },
})(Box);

export const StyledButton = withStyles({
  root: {
    textTransform: 'capitalize',
    '&:hover': {
      color: '#3023C8',
    },
  },
})(Button);

export const StyledActionButton = styled.a`
  background-color: ${({ brandcolor, type }) => (type === 'SOLID' || type === 'SOLID_ROUND' ? brandcolor : '#fff')};
  color: ${({ brandcolor, type }) => (type === 'THIN' || type === 'THIN_ROUND' ? brandcolor : '#fff ')};
  text-align: center;
  border: 1.1px solid ${({ brandcolor }) => brandcolor || '#787F88'};
  border-radius: ${({ type }) => (type === 'SOLID_ROUND' || type === 'THIN_ROUND' ? '315px' : '5px')};
  transition: all 0.3s ease-out;
  position: relative;
  backface-visibility: hidden;
  padding: 10px 20px;
  display: inline-block;
  margin: 20px 0;
  a {
    cursor: ${({ preview }) => (preview ? 'default' : 'pointer')};
  }

  &:hover,
  &:active {
    outline: none;
  }
`;
