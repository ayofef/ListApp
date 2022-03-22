import React from 'react';
import { useTranslation } from 'react-i18next';
import { useElementDataToSave } from './fields/hooks/useElementDataToSave';
import RadioButtonsSection from './sections/RadioButtonsSection';
import { useValidationMessage } from './fields/hooks';

const COUNT_SCOPE = {
  WITHIN_RUN: 'WITHIN_RUN',
  ACROSS_RUNS: 'ACROSS_RUNS',
};

const countScopeOptions = [
  {
    value: COUNT_SCOPE.WITHIN_RUN,
    title: 'Count within a single run',
  },
  {
    value: COUNT_SCOPE.ACROSS_RUNS,
    title: 'Count any run',
  },
];

const CountConditionStep = () => {
  const { t } = useTranslation();
  const [{ countScope }, updateDataToSave] = useElementDataToSave();
  const validationMessage = useValidationMessage('countScope');

  const onChange = ({ target }) => {
    updateDataToSave({ countScope: target.value });
  };

  return (
    <RadioButtonsSection
      name="countScope"
      title={t('Check for')}
      subTitle={t('Increment count within a single run of your automation, or count any run of your automation')}
      options={countScopeOptions}
      validationMessage={validationMessage}
      value={countScope}
      handleChange={onChange}
    />
  );
};

export default CountConditionStep;
