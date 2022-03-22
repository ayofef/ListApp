import React, { useCallback } from 'react';
import { number, arrayOf, shape } from 'prop-types';
import { v4 as uniqueId } from 'uuid';
import { StepsWrapper, StepCircle, StepWrapper } from './styled';
import { CheckmarkGreen } from '../../../assets/icons';
import { P14 } from '../../atoms';

const SignupStepIndicator = ({ steps, currentStep }) => {
  const isActive = useCallback((index) => index === currentStep, [currentStep]);
  const isChecked = useCallback((index) => index < currentStep, [currentStep]);

  return (
    <StepsWrapper>
      {steps.map((item, index) => (
        <StepWrapper key={uniqueId()}>
          <StepCircle isActive={isActive(index)} isChecked={isChecked(index)}>
            {isChecked(index) ? <CheckmarkGreen /> : index + 1}
          </StepCircle>
          <P14 color={isActive(index) ? 'white' : '#8C909D'}>{item.label}</P14>
        </StepWrapper>
      ))}
    </StepsWrapper>
  );
};

SignupStepIndicator.propTypes = {
  steps: arrayOf(shape({})).isRequired,
  currentStep: number.isRequired,
};

export default SignupStepIndicator;
