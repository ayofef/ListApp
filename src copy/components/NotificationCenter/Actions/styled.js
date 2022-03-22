import styled from 'styled-components';
import { ButtonRounded } from '../../atoms';
import THEME from '../../../constants/theme';

const StyledButton = styled(ButtonRounded)`
  &.MuiButtonBase-root {
    font-weight: 500;
    width: 100%;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    background-color: transparent;
    color: ${THEME.primaryColors.blue};

    &:hover {
      background-color: ${THEME.primaryColors.primaryLightDark};
    }
  }
`;

export { StyledButton };
