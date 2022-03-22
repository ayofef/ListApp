import styled from 'styled-components';
import THEME from '../../../constants/theme';

export const BoxWrapper = styled.div`
  position: relative;

  &:before {
    position: absolute;
    top: -30px;
    left: -30px;
    width: calc(100% + 60px);
    height: calc(100% + 60px);
    background-size: 100% 100%;
    background-position: center;
    transform: scale(1.2);
    @media (min-width: ${THEME.breakPoints.tablet}px) {
      top: -100px;
      left: -92px;
      width: calc(100% + 164px);
      height: calc(100% + 200px);
      background-size: 100% 100%;
      transform: scale(1);
    }
    content: '';
    z-index: 0;
    background-repeat: no-repeat;
  }
`;

export const Box = styled.div`
  color: black;
  position: relative;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
  border: 0.5px solid ${THEME.greyColors.grey7};
  padding: 32px 24px;
  z-index: 1;
  max-width: 424px;
  width: calc(100vw - 32px);
  box-sizing: border-box;

  @media (min-width: ${THEME.breakPoints.tablet}px) {
    padding: 40px;
  }

  h1 {
    font-size: 32px;
    line-height: 32px;
    margin-bottom: 10px;
    margin-top: 0 !important;
    font-family: HelveticaNow, sans-serif !important;
    font-weight: 700 !important;
    @media (min-width: ${THEME.breakPoints.desktop}px) {
      font-size: 40px;
      line-height: 40px;
      margin-bottom: 14px;
    }
  }
  p {
    font-family: HelveticaNow, sans-serif !important;
  }
`;
