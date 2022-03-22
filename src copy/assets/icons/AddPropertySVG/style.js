import { css } from 'styled-components';

const STYLE = css`
  .fill-white,
  .fill,
  .stroke {
    transition: all 0.3s;
  }

  svg.active .mask,
  svg:hover .mask {
    display: none;
  }

  svg.active .fill-white,
  svg:hover .fill-white {
    fill: #f0ecff;
  }

  svg.active .fill,
  svg:hover .fill {
    fill: #3023c8;
  }

  svg.active .stroke,
  svg:hover .stroke {
    stroke: #3023c8;
  }
`;

export { STYLE };
