import styled from 'styled-components';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Box from '@material-ui/core/Box';
import THEME from '../../../../../../../constants/theme';

export const StyledAccordion = styled(Accordion)`
  &.MuiAccordion-root {
    border: none !important;
    box-shadow: none !important;
    border-radius: 8px !important;
    margin-top: 10px;
    background-color: ${({ $expanded }) =>
      $expanded ? `${THEME.greyColors.grey14}` : `${THEME.primaryColors.primaryLight}`};
    & .MuiCollapse-container {
      & .MuiCollapse-wrapper {
        padding: 0 24px 24px 24px;
      }
    }
  }
`;

export const StyledAccordionSummary = styled(AccordionSummary)`
  &.MuiAccordionSummary-root {
    padding: 0 24px;
    font-weight: 500;
    & .MuiAccordionSummary-content {
      margin: 27px 0;
      color: ${({ $expanded }) =>
        $expanded ? `${THEME.primaryColors.blackMain}` : `${THEME.primaryColors.primaryD20}`};
    }
  }
`;

export const StyledHelperBox = styled(Box)`
  position: relative;
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const StyledContentBox = styled(Box)`
  color: ${THEME.greyColors.grey23};
`;

export const StyledLinkBox = styled(Box)`
  &:not(:last-child) {
    margin-bottom: 2px;
  }
`;

export const StyledSpinnerBox = styled(Box)`
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translate(-50%);
`;
