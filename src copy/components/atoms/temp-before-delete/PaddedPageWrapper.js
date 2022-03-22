import styled from 'styled-components';
import THEME from '../../../constants/theme';

export const PaddedPageWrapper = styled.div`
  padding: ${({ padding }) => padding || '60px 94px 60px 112px'};
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: ${({ background }) => background || 'transparent'};

  @media (max-width: ${THEME.breakPoints.tablet}px) {
    padding: 0;
  }
  @media (max-width: ${THEME.breakPoints.desktop}px) {
    flex-shrink: 0;
  }
  @media (max-width: ${THEME.breakPoints.tablet}px) {
    width: 100%;
    padding: 20px;
  }
`;
