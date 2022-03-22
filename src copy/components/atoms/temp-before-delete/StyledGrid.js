import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

export const StyledGrid = styled(Grid)`
  margin: ${({ margin }) => margin || '0px'};
  align-self: ${({ alignSelf }) => alignSelf || 'auto'};
`;
