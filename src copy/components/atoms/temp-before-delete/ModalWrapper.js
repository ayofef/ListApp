import styled from 'styled-components';
import THEME from '../../../constants/theme';

export const ModalWrapper = styled.div`
  min-height: ${({ minHeight }) => minHeight || '100vh'};
  height: 100%;
  padding: ${({ noPadding, padding }) => (noPadding ? '0' : padding || '32px 32px 60px 110px')};
  min-width: 100%;
  background-color: ${THEME.primaryColors.white};
  overflow-y: auto;
  z-index: 2000;
  &.pageModal {
    position: fixed;
    overflow: auto;
    height: 100%;
    padding: 0;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    overflow-x: hidden;
  }
`;
