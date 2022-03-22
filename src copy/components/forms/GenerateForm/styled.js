import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import THEME from '../../../constants/theme';

export const StyledReactMarkdown = styled(ReactMarkdown)`
  ul,
  ol {
    padding-left: 18px;
    font-size: ${({ fontSize }) => fontSize || '14px'};
    color: ${({ color }) => color || 'black'};
    text-align: ${({ textAlign }) => textAlign};
    li {
      list-style-type: decimal;
      padding-left: 8px;

      &:not(:last-child) {
        margin-bottom: 12px;
      }
    }
  }
`;

export const CheckboxWrapper = styled.div`
  position: relative;
  &::before {
    position: absolute;
    top: 12px;
    left: 12px;
    width: 18px;
    height: 18px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.6);
    content: '';
  }
`;

export const DatePickerWrapper = styled.div`
  border: 1px solid ${THEME.greyColors.grey4};
  margin-top: 12px;
  border-radius: 4px;
  padding-left: 12px;
  padding-right: 12px;
  margin-bottom: 12px;

  > div {
    margin-top: 13px;
    margin-bottom: 9px;
  }

  .MuiInput-underline:before {
    display: none;
  }

  .MuiIconButton-root {
    position: relative;
    left: 12px;
  }
`;
