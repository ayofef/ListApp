import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import THEME from '../../../../../../constants/theme';

export const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
`;

export const StyledWrapper = styled(StyledBox)`
  flex: 1;

  a {
    width: 100%;
    display: flex;
    margin-left: 24px;
    justify-content: space-between;
    align-items: center;

    &:hover {
      svg {
        path {
          stroke: ${THEME.primaryColors.primary};
        }
      }
    }
  }
`;
