import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyledImage, StyledWrapper } from './styled';
import { TUTORIAL_CONTENT } from '../constant';

const TutorialImages = ({ activeSlide, opacity, setOpacity }) => {
  const TutorialImage = TUTORIAL_CONTENT[activeSlide]?.Image;

  useEffect(() => {
    setOpacity(1);
  }, [activeSlide, setOpacity]);

  return (
    <StyledWrapper activeSlide={activeSlide}>
      <StyledImage className={TUTORIAL_CONTENT[activeSlide]?.className} opacity={opacity}>
        <TutorialImage />
      </StyledImage>
    </StyledWrapper>
  );
};

TutorialImages.propTypes = {
  activeSlide: PropTypes.number.isRequired,
  opacity: PropTypes.number.isRequired,
  setOpacity: PropTypes.func.isRequired,
};

export default TutorialImages;
