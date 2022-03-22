import styled from 'styled-components';
import THEME from '../../../constants/theme';

const UnderlinedButton = styled.button`
  background-color: #fff;
  color: ${THEME.primaryColors.primary};
  outline: none;
  border: none;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  margin-top: 8px;
  padding: 2px 0 8px 0;
  cursor: pointer;

  &::after {
    content: '';
    display: block;
    position: relative;
    width: auto;
    height: 2px;
    background-color: ${THEME.primaryColors.primary};
  }

  &:hover {
    color: ${THEME.secondaryColors.secondary};
    &::after {
      height: 2px;
      background-color: ${THEME.secondaryColors.secondary};
    }
  }
`;

export default UnderlinedButton;
