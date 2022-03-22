import styled from 'styled-components';
import THEME from '../../../constants/theme';

const CircleButton = styled.span`
  width: 32px;
  min-width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ backgroundColor }) => backgroundColor || THEME.greyColors.grey3};
  color: ${({ color }) => color || THEME.primaryColors.black};
  margin: ${({ margin }) => margin || '0'};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    max-width: 18px;
  }
`;

export default CircleButton;
