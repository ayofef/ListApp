import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';

const StyledCheckbox = styled(Checkbox)`
  svg {
    color: ${({ color }) => color || 'black'};
  }
`;

export default StyledCheckbox;
