import styled, { css } from 'styled-components';
import THEME from '../../../constants/theme';

const StyledJsonContainer = styled.div`
  .react-json-view {
    background-color: rgba(255, 255, 255, 0) !important;

    & span {
        font-family: Source Code Pro, Menlo, Monaco, Consolas, 'Courier New', monospace !important;
    }
  }

  .object-container {
    width: max-content;

    
  }

  ${({ $theme }) =>
    !$theme &&
    css`
      .object-key {
        color: ${THEME.primaryColors.primary} !important;
      }
    `};

 
  .string-value {
    display: inline-block;
    max-width: 500px;
  }

  .icon-container {
    margin-right: 4px;
    transform: translateY(-2px) !important;


    ${({ $theme }) =>
      !$theme &&
      css`
        .collapsed-icon,
        .expanded-icon {
          svg {
            color: ${THEME.primaryColors.primary} !important;
          }
        }
      `};
`;

export { StyledJsonContainer };
