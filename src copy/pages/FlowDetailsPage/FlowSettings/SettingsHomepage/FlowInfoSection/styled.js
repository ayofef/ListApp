import styled from 'styled-components';
import THEME from '../../../../../constants/theme';

const StyledIconButton = styled.button`
  position: relative;
  margin: 0;
  padding: 10px 16px;
  background-color: #f5f6f7;
  border: none;
  outline: none;
  border-radius: 6px;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease-out;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Source Code Pro !important;

  &:hover {
    background-color: #f5f2ff;

    svg {
      path {
        fill: ${THEME.primaryColors.primary};
      }
    }
  }
`;

const StyledDescription = styled.div`
  font-size: 14px;
  color: ${THEME.greyColors.grey1};

  span {
    line-height: 24px;
  }
`;

const StyledLearnMoreLink = styled.span`
  margin-left: 4px;
  color: ${THEME.primaryColors.primary};
  &:hover {
    color: ${THEME.secondaryColors.secondary};
  }
`;

export { StyledIconButton, StyledDescription, StyledLearnMoreLink };
