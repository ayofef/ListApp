import styled, { css, keyframes } from 'styled-components';
import { AbsoluteBlock } from '../../../components/atoms';
import { FlexContainer } from '../../../components/atoms/flex/FlexContainer';

const rotate = keyframes`
    from {
        transform: rotate(0deg);

    }
    to{
      transform: rotate(360deg);
    }
`;

const spinner = css`
  animation: ${rotate} 1s linear infinite;
`;

export const StyledImage = styled.img`
  ${spinner}
`;

export const StyledAbsoluteBlock = styled(AbsoluteBlock)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  transform: translateX(50%);
  * {
    transition: 1s;
  }
  .buttonsCover {
    box-sizing: border-box;
    background-color: white;
    box-shadow: 0 2px 4px rgba(155, 159, 171, 0.11);
    border-radius: 6px;
    overflow: hidden;

    .left {
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    }
    .right {
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }
  }
  button {
    border: 1px solid rgba(0, 0, 0, 0.07);
    border-radius: 6px;
    justify-content: center;

    &:hover {
      border: 1px solid rgba(0, 0, 0, 0.07);
      background: rgba(78, 64, 239, 0.1);
      color: #4e40ef;
      .buttonsInnerCover {
        color: #4e40ef;
      }

      p {
        color: #4e40ef;
      }
    }
  }
`;
export const ChartContainer = styled(FlexContainer)`
  & .recharts-surface {
    overflow: visible !important;
  }
  & .recharts-cartesian-axis-tick {
    transform: translateY(6px);

    & .recharts-cartesian-axis-tick-line {
      opacity: 0;
    }
    & .recharts-text {
      margin-top: 20px !important;
    }
  }
  .scrollbar {
    & > :first-child {
      margin-bottom: 0 !important;
      ::-webkit-scrollbar {
        display: none;
      }

      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
  }
  .forced-horizontal-scrollbar {
    & > :first-child {
      margin-bottom: 0 !important;
      ::-webkit-scrollbar {
        -webkit-appearance: none;
        width: 3px;
        height: 6px;
      }

      ::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }
  circle {
    z-index: -1;
    ${({ isMockData }) => isMockData && 'display: none;'};
  }
  .customDot {
    background-color: #4e40ef !important;
    z-index: 9999;
    cursor: pointer;

    &:hover {
      fill: ${({ dotColor }) => dotColor};
    }
  }
  .hiddenButton {
    opacity: 0;
    transition: 1s;
  }
  &:hover {
    .hiddenButton {
      opacity: 1 !important;
    }
  }
`;
export const BarChartContainer = styled(FlexContainer)`
  & .recharts-text {
    opacity: 0;
  }
  .recharts-yAxis {
    & .recharts-cartesian-axis-tick-line {
      opacity: 0;
    }
    & g text {
      font-size: 13px;
      font-weight: 600;
      fill: #232629 !important;
      text-transform: capitalize !important;
    }
  }
`;

export const HiddenScrollTack = styled.div`
  display: none;
`;
