import React from 'react';
import { number, string } from 'prop-types';
import { Brick, BlockWrap } from '../atoms';
import { StretchBlock } from '../atoms/flex/StretchBlock';

const StepIndicator = ({ stepsCount, currentStep, justifyContent }) => (
  <BlockWrap margin="32px 0 0 0" height="3px">
    <StretchBlock justifyContent={justifyContent}>
      {Array.from({ length: stepsCount }).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Brick key={index} active={index === currentStep - 1} />
      ))}
    </StretchBlock>
  </BlockWrap>
);

StepIndicator.propTypes = {
  stepsCount: number.isRequired,
  currentStep: number.isRequired,
  justifyContent: string,
};

StepIndicator.defaultProps = {
  justifyContent: '',
};

export default StepIndicator;
