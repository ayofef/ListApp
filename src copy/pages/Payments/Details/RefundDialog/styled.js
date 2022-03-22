import styled, { css, keyframes } from 'styled-components';
import Box from '@material-ui/core/Box';
import { bool } from 'prop-types';

const check = keyframes`
  from {
    stroke-dashoffset: 37.87860107421875px;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

const checkAnimation = css`
  animation: ${check} 0.3s ease;
  animation-delay: 0.21s;
  animation-fill-mode: backwards;
`;

const StyledCheck = styled.div`
  svg .check-path {
    stroke-dasharray: 37.87860107421875px;
    ${checkAnimation};
  }
`;

const StyledChecks = styled(StyledCheck)`
  width: 49px;
  height: 49px;
  background-color: #1cce6a;
  margin: 0 auto;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 35px;
  svg {
    width: 20px;
    path {
      stroke: #fff;
      stroke-width: 3px;
    }
  }
`;

const StyledSuccessWrapper = styled(Box)`
  &.MuiBox-root {
    opacity: ${({ $isOpen: isOpen }) => (isOpen ? 1 : 0)};
    visibility: ${({ $isOpen: isOpen }) => (isOpen ? 'visible' : 'hidden')};
    transition: all 0.3s ease-out;
  }
`;

StyledSuccessWrapper.propTypes = {
  $isOpen: bool,
};

StyledSuccessWrapper.defaultProps = {
  $isOpen: false,
};

export { StyledCheck, StyledChecks, StyledSuccessWrapper };
