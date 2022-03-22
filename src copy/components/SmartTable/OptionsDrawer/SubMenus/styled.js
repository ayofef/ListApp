import styled from 'styled-components';
import { RESET_BUTTON } from '../AllOptions/styled';
import THEME from '../../../../constants/theme';

const StyledHeaderButton = styled.button`
  ${RESET_BUTTON};
  margin-top: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  transform: translateX(-12px);

  svg {
    transform: translateY(-2.5px);
  }

  &:hover {
    p {
      color: ${THEME.primaryColors.primary};
    }
    svg {
      fill: ${THEME.primaryColors.primary};
    }
  }
`;

export { StyledHeaderButton };
