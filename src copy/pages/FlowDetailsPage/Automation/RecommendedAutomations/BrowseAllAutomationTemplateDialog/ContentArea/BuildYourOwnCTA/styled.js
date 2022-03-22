import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { BORDER_COLOR } from '../../../../../constant';

export const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${({ $padding }) => $padding || '28px'};
  border: ${({ $border }) => $border || `1px solid ${BORDER_COLOR}`};
  border-radius: ${({ $borderRadius }) => $borderRadius || '8px'};
  margin-bottom: ${({ $mb }) => $mb || '16px'};
  overflow: hidden;
  box-sizing: border-box;
`;
