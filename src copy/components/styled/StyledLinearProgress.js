import styled from 'styled-components';
import LinearProgress from '@material-ui/core/LinearProgress';

const StyledLinearProgress = styled(LinearProgress)`
  &.MuiLinearProgress-root {
    width: 100%;
    background-color: #e6e9ec;
    border-radius: 4px;

    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 8px;
      height: 100%;
      background-color: #fff;
      top: 0;
      z-index: 100;
    }

    &::before {
      left: 33.333333%;
    }
    &::after {
      left: 66.666666%;
    }

    .MuiLinearProgress-bar {
      background-color: #4e40ef;
      border-radius: inherit;
    }
  }
`;

export default StyledLinearProgress;
