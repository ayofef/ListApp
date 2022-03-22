import styled from 'styled-components';
import THEME from '../../../constants/theme';

const CircleImage = styled.img`
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
  background: ${THEME.secondaryColors.inputBg};
  border-radius: 50%;
  flex-shrink: 0;
  margin: ${({ margin }) => margin || '0px'};
`;

export default CircleImage;
