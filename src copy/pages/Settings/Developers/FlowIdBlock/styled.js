import styled from 'styled-components';
import THEME from '../../../../constants/theme';

const StyledCopyButton = styled.button`
  position: relative;
  height: 48px;
  margin: 0;
  padding: 10px 16px;
  background-color: #f5f6f7;
  border: none;
  outline: none;
  border-radius: 6px;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s ease-out;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Source Code Pro !important;
  margin-top: 32px;

  &:hover {
    background-color: #f5f2ff;

    svg {
      path {
        fill: ${THEME.primaryColors.primary};
      }
    }
  }
`;

export { StyledCopyButton };
