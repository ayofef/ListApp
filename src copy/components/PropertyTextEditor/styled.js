import { makeStyles } from '@material-ui/core';
import styled, { css } from 'styled-components';
import Box from '@material-ui/core/Box';

export const useMentionContainerStyles = makeStyles({
  root: {
    minWidth: '376px',
    border: '1px solid #f0f0f0',
    backgroundColor: '#ffffff',
    zIndex: 100,
    boxSizing: 'border-box',
    boxShadow: ' 0px 2px 4px rgba(155, 159, 171, 0.11)',
    borderRadius: '6px',
    position: 'absolute',
    left: '100% !important',
    transform: 'translate(-100%, 0)',
    overflow: 'hidden',

    '& .ql-mention-list': {
      margin: '0',
      padding: '0 0 8px 0',
      maxHeight: '300px',
      overflowX: 'auto',
    },
    '& .ql-mention-list-item': {
      listStyle: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      lineHeight: '20px',
      padding: '6px 16px',
      verticalAlign: 'middle',
      boxSizing: 'border-box',
      transition: 'all 0.2s ease-out',
    },
    '& .ql-mention-list-item.disabled': {
      fontWeight: 'bold',
      backgroundColor: '#F5F6F7',
      color: '#787F88',
      cursor: 'not-allowed',
      borderTop: '1px solid #E6E9EC',
      borderBottom: '1px solid #E6E9EC',
    },
    '& .ql-mention-list-item.disabled:hover': { color: '#787F88' },
    '& .ql-mention-list-item:hover': { color: '#2346f2', backgroundColor: '#F5F2FF' },
  },
});

export const StyledContainer = styled.div`
  min-height: ${({ minHeight }) => minHeight};
  height: ${({ readOnly }) => (readOnly ? '100px' : 'min-content')};

  .ql-tooltip {
    z-index: 500;
  }

  .mention {
    height: 24px;
    width: 65px;
    border-radius: 6px;
    background-color: #e6e9ec !important;
    padding: 3px 0;
    margin-right: 2px;
    user-select: all;
    color: #2346f2;
  }

  .mention > span {
    margin: 0 3px;
  }
  .mention[data-invalid='true'] {
    background-color: red;
  }

  .ql-editor {
    padding: ${({ padding }) => padding || '8px 16px !important'};
    overflow: ${({ readOnly }) => (readOnly ? 'hidden' : 'auto')};
    ${({ maxHeight }) =>
      maxHeight &&
      css`
        max-height: ${maxHeight};
        height: 100%;
      `};
  }
  .ql-editor p {
    font-size: ${({ isFooter }) => (isFooter ? '12px' : '14px')};
    line-height: ${({ isFooter }) => (isFooter ? 'unset' : '24px')};
    ${({ isFooter }) => (isFooter ? 'text-align: center; color: #787F88' : '')};
  }

  .ql-emojiblot {
    margin: -5px 2px 0 2px;
  }
`;

export const StyledBox = styled(Box)`
  cursor: pointer;
`;
