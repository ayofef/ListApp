import styled from 'styled-components';
import { Box, withStyles } from '@material-ui/core';
import THEME from '../../../constants/theme';
import { P16M, ButtonRounded } from '../../../components/atoms';

export const StyledEmptyStateIconWrapper = styled.div`
  margin-bottom: 30px;
  transform: scale(1.2);
`;

export const BlueLink = styled(Box)`
  display: flex;
  cursor: pointer;
  color: ${THEME.primaryColors.primary};
  justify-content: space-between;
  align-items: center;
`;

export const EngageDescription = styled(P16M)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const ExploreButton = styled(Box)`
  cursor: pointer;
  display: flex;
  justify-content: center;
  border-radius: 8px;
  background: ${THEME.primaryColors.white};
  padding: 10px;
`;

export const StyledButton = withStyles({
  containedPrimary: {
    backgroundColor: ({ backgroundColor }) => backgroundColor || 'transparent',
    color: THEME.primaryColors.black,
    '&:hover': {
      backgroundColor: ({ hoverColor }) => hoverColor || 'transparent',
    },
  },
})(ButtonRounded);
