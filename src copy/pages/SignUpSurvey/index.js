import React from 'react';

import PureLayout from '../../components/layouts/PureLayout';
import THEME from '../../constants/theme';

import { P16, H4 } from '../../components/atoms';
import PureLayoutBox from '../../components/layouts/PureLayoutBox';
import SignUpSurveyForm from '../../components/forms/SignUpSurveyForm';

const SignUpSurvey = () => {
  return (
    <PureLayout theme="dark">
      <PureLayoutBox theme="dark">
        <H4 lineHeight="28px" fontSize="23px" fontWeight="700">
          Why do you need WhenThen?
        </H4>
        <P16 margin="16px 0" color={THEME.greyColors.lightGrey}>
          Select as many as relevant
        </P16>
        <SignUpSurveyForm />
      </PureLayoutBox>
    </PureLayout>
  );
};

export default SignUpSurvey;
