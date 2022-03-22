import styled from 'styled-components';
import THEME from '../../constants/theme';

export const StyledPlayButton = styled.button`
  position: absolute;
  top: calc(50% + 20px);
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;

  & svg circle {
    transition: all 0.3s ease-out;
  }

  &:hover {
    svg circle {
      fill: ${THEME.secondaryColors.secondary};
    }
  }
`;
