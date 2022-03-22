import React from 'react';
import { string, oneOfType, number } from 'prop-types';
import CircleImage from '../CircleImage/CircleImage';
import CircleWrapper from '../CircleWrapper/CircleWrapper';
import THEME from '../../../constants/theme';

const Avatar = ({ src, name, size, margin }) => {
  if (src && src !== 'null') {
    return <CircleImage src={src} size={size} margin={margin} />;
  }
  return (
    <CircleWrapper size={size} margin={margin} background={THEME.greyColors.grey5} borderColor="transparent">
      {name.charAt(0).toUpperCase()}
    </CircleWrapper>
  );
};

Avatar.propTypes = {
  name: string,
  src: string,
  margin: string,
  size: oneOfType([number, string]),
};
Avatar.defaultProps = {
  name: '?',
  src: null,
  size: 32,
  margin: 0,
};

export default Avatar;
