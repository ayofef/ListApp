import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import THEME from '../../../../../constants/theme';

export const StyledAvatar = styled(Avatar)`
  &.MuiAvatar-root {
    background-color: ${THEME.primaryColors.primary} !important;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;

    width: 36px;
    height: 36px;
    border: 1px solid #fff;

    &:hover {
      background-color: ${THEME.primaryColors.primaryLight};
      border-color: rgba(0, 0, 0, 0);
    }
  }
`;
