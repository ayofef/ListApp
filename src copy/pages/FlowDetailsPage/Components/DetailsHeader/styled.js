import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import THEME from '../../../../constants/theme';
import { SIDEBAR_WIDTH } from '../../constant';

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  p {
    color: ${THEME.primaryColors.primary};
  }
`;
const SubPageBox = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const StyledBox = styled(Box)`
  ${({ $skipMediaQuery }) =>
    !$skipMediaQuery &&
    css`
      @media screen and (min-width: 1600px) {
        max-width: calc(1600px - ${SIDEBAR_WIDTH});
        margin-right: auto;
        margin-left: auto;
      }
    `}
`;

export { StyledBox, SubPageBox, StyledLink };
