import styled from 'styled-components';
import THEME from '../../../constants/theme';
import { FlexContainer } from '../flex/FlexContainer';

const CircleWrapper = styled(FlexContainer)`
  ${({ size }) => {
    if (size === 'avatar-table') {
      return `
        width: 32px;
        height: 32px;
        @media (min-width: ${THEME.breakPoints.tablet}px) {
          width: 40px;
          height: 40px;
        }`;
    }
    if (size) {
      return `
        width: ${size}px;
        height: ${size}px;
      `;
    }
    return `
      width: 32px;
      height: 32px;
    `;
  }};
  flex-shrink: 0;
  color: ${({ color }) => color || THEME.primaryColors.main};
  border-radius: 50%;
  border: 1px solid ${({ borderColor }) => borderColor || THEME.primaryColors.main};
  background: ${({ background }) => background || 'inherit'};
  margin: ${({ margin }) => margin || '0px'};
  position: ${({ position }) => position || 'relative'};
  overflow: hidden;
`;

export default CircleWrapper;
