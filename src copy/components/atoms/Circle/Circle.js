import styled from 'styled-components';
import THEME from '../../../constants/theme';

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => size || '6px'};
  height: ${({ size }) => size || '6px'};
  border-radius: 50%;
  margin: 2px;
  background: ${({ color }) => color || THEME.greyColors.grey5};
`;

export default Circle;
