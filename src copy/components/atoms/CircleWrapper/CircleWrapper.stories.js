import React from 'react';
import CircleWrapperComponent from './CircleWrapper';
import THEME from '../../../constants/theme';

export const CircleWrapper = (args) => (
  <CircleWrapperComponent size={args.size} background={THEME.greyColors.grey5} borderColor="transparent">
    test
  </CircleWrapperComponent>
);

CircleWrapper.args = {
  size: 32,
};

export default {
  title: 'Atoms/CircleWrapper',
  component: CircleWrapperComponent,
};
