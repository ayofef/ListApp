import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import THEME from '../../../../../../constants/theme';

export const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  border-left: 1px solid ${THEME.greyColors.grey5};
  &:first-child {
    border-left: none;
  }
`;

export const StyledContentWrapper = styled(Box)`
  width: 100%;
  display: flex;
  min-height: 630px;
`;

export const StyledContentBox = styled(Box)`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
`;

export const StyledAutomationBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 72px;
  padding: 16px 16px 16px 24px;
  border-radius: 8px;
  margin-bottom: 16px;
  width: 100%;
  &:hover {
    background: ${THEME.greyColors.grey14};
  }
`;
