import styled from 'styled-components';
import { Accordion, AccordionSummary, Box } from '@material-ui/core';
import THEME from '../../../../constants/theme';

export const StyledWrapper = styled(Box)`
  position: absolute;
  overflow: hidden;
  border: 1px solid ${THEME.greyColors.grey16};
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.05);
`;

export const StyledAccordion = styled(Accordion)`
  &.MuiAccordion-root.Mui-expanded {
    margin: 0;
  }
  & .MuiAccordionDetails-root {
    padding: 0 24px 24px;
  }
  &:before {
    display: none;
  }
  border-bottom: 1px solid ${THEME.greyColors.grey16};
`;

export const StyledAccordionSummary = styled(AccordionSummary)`
  &.MuiAccordionSummary-root {
    padding: 0 24px;
    min-height: 74px;
    &.Mui-expanded {
      min-height: 74px;
    }
  }
  & .MuiAccordionSummary-content {
    margin: 0;
  }
`;

export const HighlightedText = styled.span`
  color: ${THEME.primaryColors.black};
  font-weight: ${({ $fontWeight }) => $fontWeight || '400'};
`;

export const StyledIconButton = styled.button`
  margin: 0;
  padding: 0;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor || '#fff'};
  width: ${({ $width }) => $width || '40px'};
  height: ${({ $height }) => $height || '40px'};
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease-out;
  cursor: pointer;

  svg {
    color: ${({ $color }) => $color || THEME.greyColors.grey17};
    font-size: ${({ $fontSize }) => $fontSize || '20px'};
  }

  &:hover {
    background-color: ${({ $activeColor }) => $activeColor || THEME.greyColors.grey12};
  }
`;
