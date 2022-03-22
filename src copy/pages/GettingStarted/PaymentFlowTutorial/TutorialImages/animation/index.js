import { css } from 'styled-components';
import { Frame01Checkout, Frame01Authorize, Frame01Receipt } from './styledFirstFrame';
import { Frame02Checkout, Frame02Authorize, Frame02Receipt } from './styledSecondFrame';
import { Frame03Checkout, Frame03Authorize, Frame03Receipt } from './styledThirdFrame';
import { Frame04Checkout, Frame04Authorize, Frame04Receipt } from './styledFourthFrame';
import { Frame05Checkout, Frame05Authorize, Frame05Receipt } from './styledFifthFrame';

const animationMap = {
  checkout: {
    0: css`
      transform: scale(1);
      animation-name: ${Frame01Checkout};
    `,
    1: css`
      transform: scale(1);
      animation-name: ${Frame02Checkout};
    `,
    2: css`
      transform: scale(1);
      animation-name: ${Frame03Checkout};
    `,
    3: css`
      transform: scale(1);
      animation-name: ${Frame04Checkout};
    `,
    4: css`
      opacity: 0;
      animation-name: ${Frame05Checkout};
    `,
  },
  receipt: {
    0: css`
      transform: scale(1.03) translate(60px, -50px);
      animation-name: ${Frame01Receipt};
    `,
    1: css`
      transform: scale(1.03) translate(-4px, 20px);
      animation-name: ${Frame02Receipt};
    `,
    2: css`
      opacity: 0;
      transform: scale(1.03) translate(60px, -50px);
      animation-name: ${Frame03Receipt};
    `,
    3: css`
      opacity: 1;
      transform: scale(1.03) translate(-4px, 140px);
      animation-name: ${Frame04Receipt};
    `,
    4: css`
      opacity: 0;
      animation-name: ${Frame05Receipt};
    `,
  },
  authorize: {
    0: css`
      animation-name: ${Frame01Authorize};
    `,
    1: css`
      animation-name: ${Frame02Authorize};
    `,
    2: css`
      opacity: 0;
      animation-name: ${Frame03Authorize};
    `,
    3: css`
      opacity: 1;
      animation-name: ${Frame04Authorize};
    `,
    4: css`
      opacity: 0;
      animation-name: ${Frame05Authorize};
    `,
  },
};

export { animationMap };
