import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, withStyles } from '@material-ui/core';
import { parseInitials } from '../../utils/parseInitials';

const StyledBox = withStyles({
  root: {
    backgroundImage: ({ bgimage }) => `url(${bgimage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
})(Box);

const CircleImage = ({
  text,
  logo,
  size,
  bgColor,
  fontSize,
  color,
  border,
  borderRadius,
  matchRadius,
  bgImage,
  textOnly,
  margin,
}) => {
  const [isValid, setIsValid] = useState(true);
  const handleError = useCallback(() => setIsValid(false), []);
  useEffect(() => {
    setIsValid(text && logo);
  }, [text, logo]);

  return isValid && !textOnly ? (
    <Box
      component="img"
      src={logo}
      width={size}
      height={size}
      borderRadius={borderRadius}
      alt={`logo ${text}`}
      onError={handleError}
      border={border}
      margin={margin}
    />
  ) : (
    <StyledBox
      component="span"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width={size}
      height={size}
      borderRadius={matchRadius ? borderRadius : '50%'}
      fontSize={fontSize}
      fontWeight="600"
      color={color}
      bgcolor={bgColor}
      border={border}
      margin={margin}
      {...(bgImage && {
        bgimage: bgImage,
      })}
    >
      {parseInitials(text)?.toUpperCase() ?? ''}
    </StyledBox>
  );
};

CircleImage.propTypes = {
  text: PropTypes.string,
  logo: PropTypes.string,
  size: PropTypes.number,
  bgColor: PropTypes.string,
  fontSize: PropTypes.string,
  margin: PropTypes.string,
  color: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  matchRadius: PropTypes.bool,
  bgImage: PropTypes.string,
  textOnly: PropTypes.bool,
};

CircleImage.defaultProps = {
  text: '',
  logo: '',
  size: 24,
  bgColor: '#c4cbd2',
  fontSize: '12px',
  color: '#fff',
  border: 'none',
  margin: '0',
  borderRadius: '50%',
  matchRadius: false,
  bgImage: '',
  textOnly: false,
};

export default CircleImage;
