import styled from 'styled-components';
import { transformProgressValue } from './constant';

export const StyledProgressBar = styled.div`
  width: 100px;
  height: 8px;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${({ color }) => color};
  &::before,
  &::after {
    content: '';
    position: relative;
    display: block;
    height: 8px;
  }

  &::before {
    width: ${({ progress }) => `${transformProgressValue(progress) || 0}%`};
    background-color: ${({ pseudoColor }) => pseudoColor};
    border-radius: 8px;
  }
`;
