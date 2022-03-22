import styled from 'styled-components';
import { IconButton } from '@material-ui/core';

const CustomIconButton = styled(IconButton)`
  svg {
    color: ${({ fill }) => fill || 'inherit'};
  }
`;

export default CustomIconButton;
