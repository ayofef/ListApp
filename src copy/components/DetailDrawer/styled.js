import styled from 'styled-components';
import withStyles from '@material-ui/core/styles/withStyles';
import Box from '@material-ui/core/Box';
import THEME from '../../constants/theme';

export const StyledDetailsTitle = withStyles({
  root: {
    maxWidth: '90%',
    textOverflow: 'ellipsis',
    wordBreak: 'break-all',
  },
})(Box);

export const StyledButton = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-right: 24px;
  border-radius: 8px;
  &:hover {
    background: ${THEME.greyColors.grey12};
  }
`;
