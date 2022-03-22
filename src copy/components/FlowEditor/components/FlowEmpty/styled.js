import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { DRAWER_WIDTH } from '../NodeLibrary/styled';

const LEFT = `calc(50% + ${DRAWER_WIDTH / 2}px)`;

const StyledFlowEmpty = styled(Box)`
  position: fixed;
  top: 50%;
  left: ${({ open }) => (open ? LEFT : '50%')};
  max-width: 270px;
  transform: translate(-50%, -50%);
  transition: left ease-out 0.3s;
`;

export { StyledFlowEmpty };
