import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import THEME from '../../../../constants/theme';

export const StyledWrapper = styled(Box)`
  padding: 8px;
  overflow: visible;
  position: relative;
  border: 1px solid ${THEME.greyColors.grey5};
  border-radius: 8px;
  &:after {
    content: '';
    display: ${({ $hideSeparator }) => ($hideSeparator ? 'none' : 'block')};
    height: 1px;
    width: 100%;
    background: ${THEME.greyColors.grey5};
    position: absolute;
    top: 50px;
    left: 0;
  }
`;

export const StyledRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  outline: none;
  border: none;
  box-sizing: border-box;
  text-align: left;
  border-bottom: 0;
  margin-left: -10px;
  padding: 0 10px;
  & > .MuiBox-root {
    margin-left: 20px;
  }
`;

export const StyledAutomationRow = styled(Box)`
  height: 64px;
  border-radius: 8px;
  background: ${({ $hasError }) => $hasError && THEME.secondaryColors.lightRed};
  padding: 0 16px;
  margin-bottom: 4px;
  cursor: pointer;
  &:hover {
    background: ${THEME.greyColors.grey14};
  }
`;
