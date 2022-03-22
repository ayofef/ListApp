import styled from 'styled-components';
import THEME from '../../../../../../constants/theme';

const StyledPresetList = styled.ul`
  width: 1200px;
  padding: 16px;
  margin: 0;
  border-left: 1px solid rgba(193, 195, 198, 0.3);
  z-index: 999;

  li {
    list-style: none;
  }
`;

const StyledButton = styled.button`
  width: 100%;

  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  padding: 10px 16px;
  border-radius: 6px;
  background-color: #fff;
  border: none;
  outline: none;
  margin-bottom: 2px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:hover {
    color: ${THEME.primaryColors.primary};
    background-color: ${THEME.primaryColors.primaryLight};
  }
`;

export { StyledPresetList, StyledButton };
