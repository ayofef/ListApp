import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import THEME from '../../constants/theme';

const StyledBox = styled(Box)`
  border: 1px solid ${THEME.greyColors.grey5};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.04);
`;

export { StyledBox };
