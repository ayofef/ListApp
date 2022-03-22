import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import THEME from '../../../../../../../constants/theme';

export const StyledWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: ${({ $margin }) => $margin || '40px 0 0 0'};
  min-height: ${({ $noMinHeight }) => ($noMinHeight ? '0' : '180px')};
  min-width: 336px;

  @media (max-width: ${THEME.breakPoints.tabletLarge}px) {
    margin: 30px 0 0 0;
    min-height: auto;
  }
`;

export const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  &:not(:last-child) {
    border-bottom: 1px solid ${THEME.greyColors.grey200};
  }
`;
