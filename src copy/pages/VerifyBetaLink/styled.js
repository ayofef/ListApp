import styled from 'styled-components';
import { P16, BorderLinearProgress } from '../../components/atoms';
import THEME from '../../constants/theme';

export const Title = styled.h1``;

export const Description = styled(P16)`
  margin: 20px 0 28px 0;
  color: ${THEME.greyColors.grey1};
`;

export const Progress = styled(BorderLinearProgress).attrs({
  height: 8,
})``;
