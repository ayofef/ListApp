import styled, { css, keyframes } from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import THEME from '../../../constants/theme';
import { StyledIconButton } from '../../../components/atoms/Buttons/StyledIconButton';

const scaleUp = keyframes`
  from{
    opacity: 0;
    transform: scale(0.9);
  }to {
    opacity: 1;
    transform: scale(1);
  }
`;

const animateScale = css`
  animation: ${scaleUp} 0.2s ease-out;
  animation-fill-mode: backwards;
`;

const StyledWrapper = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f5f6f7;
  z-index: 1300;
  ${animateScale};
`;

const StyledSliderWrapper = styled.div`
  position: absolute;
  display: flex;
  top: 10%;
  & > :not(:last-child) {
    margin-right: 10px;
  }
`;

const StyledProgress = styled.div`
  width: 32px;
  height: 4px;
  background-color: #e6e9ec;
  border-radius: 6px;
  overflow: hidden;

  &::before {
    content: '';
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    background-color: ${THEME.primaryColors.blue};
    transition: transform 0.4s ease-out;
    transform-origin: left;
    transform: ${({ isActive }) => (isActive ? 'scaleX(1)' : 'scaleX(0)')};
  }
`;

const StyledCloseButton = withStyles({
  root: {
    backgroundColor: '#f5f6f7',
    position: 'absolute',
    right: '16px',
    top: '16px',
    zIndex: '1300',
  },
})(StyledIconButton);

export { StyledWrapper, StyledSliderWrapper, StyledProgress, StyledCloseButton, animateScale };
