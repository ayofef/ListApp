import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import THEME from '../../../../constants/theme';

export const NewConnectionBox = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  width: 100%;
  height: ${({ $btnHeight }) => $btnHeight || 'auto'};
  margin-top ${({ mt }) => mt || '0'};
  border: ${({ border }) => border || 'none'};
  border-radius: ${({ borderRadius }) => borderRadius || '0'};
`;
export const TextBox = styled(Box)`
  font-weight: 500;
  font-size: ${({ fontSize }) => fontSize || '14px'};
  color: ${THEME.primaryColors.primary};
`;
