import styled from 'styled-components';
import THEME from '../../../constants/theme';

const DotTag = styled.p`
  font-weight: ${({ fontWeight }) => fontWeight || '500'};
  font-size: ${({ fontSize }) => fontSize || '14px'};
  color: ${({ color }) => color || THEME.primaryColors.black};
  margin: ${({ margin }) => margin || 0};

  transition: all 0.3s ease-out;
  position: relative;
  line-height: 20px;
  display: block;
`;

export default DotTag;
