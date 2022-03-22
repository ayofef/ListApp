import styled from 'styled-components';
import { Box, withStyles } from '@material-ui/core';

export const StyledSocials = withStyles({
  root: {
    '&>:not(:last-child)': {
      marginRight: '16px',
    },
    '&>a>img': {
      width: '20px',
      borderRadius: '4px',
    },
  },
})(Box);

export const StyledOptionBlock = withStyles({
  root: {
    '&>label': {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      color: '#787F88',
    },

    '&>label>input': {
      marginLeft: '16px',
      backgroundColor: 'transparent',
      width: '100%',
      border: 'none',
      fontWeight: 'bold',
    },
    '&>label>input:focus, &>div>input:focus': {
      outline: 'none',
    },
    '&>label>input:hover,  &>div>input:hover': {
      outline: 'none',
    },
  },
})(Box);

export const StyledImage = styled.img`
  display: block;
  height: ${(height) => height};
`;

export const StyledMultiEmail = withStyles({
  root: {
    '&>p': {
      color: '#787F88',
      margin: '0',
      padding: '20px 0 20px 24px',
    },
    '&>:first-child': {
      marginRight: '16px',
      alignSelf: 'flex-start',
    },
    '&>div>input,&>div>.labeledEmail': {
      boxSizing: 'border-box',
      fontSize: '12px',
      backgroundColor: 'transparent',
      minWidth: '120px',
      border: 'none',
      fontWeight: 'bold',
    },
    '&>.react-multi-email': {
      width: '100%',
      display: 'flex',
      flexFlow: 'row wrap',
      padding: '20px 0',
      '&>.labeledEmail': {
        backgroundColor: '#fff',
        padding: '8px',
        borderRadius: '8px',
        margin: '0 8px 8px 8px',
        '&>span': {
          marginLeft: '8px',
          cursor: 'pointer',
        },
      },
    },
  },
})(StyledOptionBlock);
