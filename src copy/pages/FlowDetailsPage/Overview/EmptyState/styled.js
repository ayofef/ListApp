import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import THEME from '../../../../constants/theme';

export const EmptyBackdrop = styled(Box)`
  position: absolute;
  width: calc(100% + 26px);
  height: 100%;
  margin: -20px;
  backdrop-filter: blur(8px);
  padding-top: 110px;
  z-index: 2;
`;

export const ModalWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 384px;
  background: ${THEME.primaryColors.white};
  padding: 40px 32px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  border-radius: 6px;
  border: 1px solid ${THEME.greyColors.grey5};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
