import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { BORDER_COLOR } from '../constant';
import THEME from '../../../constants/theme';

const HeaderWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  position: fixed;
  padding: 0 16px;
  box-sizing: border-box;
  width: 100%;
  height: 65px;
  left: 0;
  top: 0;
  z-index: 999;
  border-bottom: 1px solid ${BORDER_COLOR};
`;

const StyledBox = styled(Box)`
  display: flex;
  align-items: center;
  margin-right: ${({ mr }) => mr || 0};
`;

const StyledIconButton = styled.button`
  margin: 0;
  padding: 0;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ backgroundColor }) => backgroundColor || '#fff'};
  width: ${({ $width }) => $width || '40px'};
  height: ${({ $height }) => $height || '40px'};
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease-out;
  cursor: pointer;

  svg {
    color: ${({ $color }) => $color || THEME.greyColors.grey1};
    font-size: ${({ $fontSize }) => $fontSize || '20px'};
    stroke: ${THEME.greyColors.grey1};
    stroke-width: ${({ $strokeWidth }) => $strokeWidth || '2px'};
  }

  &:hover {
    background-color: ${({ activeColor }) => activeColor || THEME.greyColors.grey12};
  }
`;
export { HeaderWrapper, StyledBox, StyledIconButton };
