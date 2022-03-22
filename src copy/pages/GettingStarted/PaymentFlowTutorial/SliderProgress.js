import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { StyledSliderWrapper, StyledProgress } from './styled';

const SliderProgress = ({ length, activeSlide }) => {
  const sliders = useMemo(() => Array.from(Array(length).keys()), [length]);

  return (
    <StyledSliderWrapper>
      {sliders.map((key) => (
        <StyledProgress key={key} isActive={activeSlide >= key}>
          &nbsp;
        </StyledProgress>
      ))}
    </StyledSliderWrapper>
  );
};

SliderProgress.propTypes = {
  activeSlide: PropTypes.number.isRequired,
  length: PropTypes.number.isRequired,
};

export default SliderProgress;
