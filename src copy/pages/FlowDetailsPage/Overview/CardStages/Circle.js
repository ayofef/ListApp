import React from 'react';
import { elementType, string, number, oneOfType } from 'prop-types';
import { L14B } from '../../../../components/atoms/Typography/L14B';
import THEME from '../../../../constants/theme';
import { CircleWrapper } from './styled';

const Circle = ({ Icon, value, backgroundColor, margin, zIndex }) => {
  return (
    <CircleWrapper background={backgroundColor} margin={margin} zIndex={zIndex}>
      {Icon ? <Icon /> : <L14B>{value}</L14B>}
    </CircleWrapper>
  );
};

Circle.propTypes = {
  backgroundColor: string,
  Icon: elementType,
  value: oneOfType([string, number]),
  margin: string,
  zIndex: number,
};

Circle.defaultProps = {
  Icon: null,
  value: 0,
  backgroundColor: THEME.greyColors.grey12,
  margin: '0px',
  zIndex: 0,
};

export default Circle;
