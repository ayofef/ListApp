import styled from 'styled-components';
import { Box } from '@material-ui/core';
import THEME from '../../../../../../../constants/theme';

export const StyledSetupIntegrationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 32px;
  min-height: 180px;

  @media (min-width: ${THEME.breakPoints.tabletLarge}px) {
    margin-top: 0;
    min-height: auto;
  }
`;

export const SetupItemsStyledBox = styled(Box)`
  width: 424px;
  border: 1px solid ${THEME.greyColors.grey5};
  border-radius: 8px;
`;
