import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import THEME from '../../../../constants/theme';

const BackButtonContainer = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;

  .arrowBack {
    margin-right: 8px;
  }

  &:hover .arrowBack path {
    stroke: ${THEME.primaryColors.blue};
  }
`;

export { BackButtonContainer };
