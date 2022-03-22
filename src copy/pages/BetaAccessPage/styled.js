import styled from 'styled-components';
import THEME from '../../constants/theme';

export const JoinComunityBlock = styled.div`
  position: relative;
  border-top: 1px solid #e6e9ec;
  margin-top: 24px;
  padding-top: 24px;
  display: flex;
  justify-content: space-around;

  div {
    text-decoration: none;
    display: flex;
    color: ${THEME.primaryColors.primary};
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    width: 100%;
    justify-content: center;

    img {
      position: relative;
      display: block;
      margin-left: 14px;
      transform: translateY(2px);
    }
  }
`;

export const AnimatedWrapper = styled.div`
  height: ${({ showBeta }) => (showBeta ? '404px' : '346px')};
  position: relative;
  overflow: hidden;

  > div {
    position: absolute;
    transition: all 400ms cubic-bezier(0, 0.84, 0.61, 1.01);

    &:first-child {
      transform: ${({ showBeta }) => (showBeta ? 'translateX(-120%)' : 'translateX(0)')};
      opacity: ${({ showBeta }) => (showBeta ? '0' : '1')};
    }
    &:last-child {
      transform: ${({ showBeta }) => (showBeta ? 'translateX(0)' : 'translateX(120%)')};
      opacity: ${({ showBeta }) => (showBeta ? '1' : '0')};
    }
  }
`;
