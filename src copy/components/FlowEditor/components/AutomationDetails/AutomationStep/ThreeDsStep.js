import React from 'react';
import { useTranslation } from 'react-i18next';
import isNil from 'lodash/isNil';
import FormHelperText from '@material-ui/core/FormHelperText';
import Title from '../Title';
import { StyledFormControl } from './fields/styled';
import Select, { NONE } from '../../../../forms/_common/Select';
import { useElementDataToSave } from './fields/hooks/useElementDataToSave';
import { useValidationMessage } from './fields/hooks';

const ThreeDsStep = () => {
  const { t } = useTranslation();
  const [{ performThreeDs, threeDsOptions }, updateDataToSave] = useElementDataToSave();
  const validationMessage = useValidationMessage('performThreeDs');
  const hasError = Boolean(validationMessage);

  const options = threeDsOptions?.map(({ value, label }) => ({
    value,
    title: label,
  }));

  const onChange = ({ target }) => {
    updateDataToSave({ performThreeDs: target.value });
  };

  return (
    <>
      <Title fontSize="12px" mt="26px" mb="6px !important">
        {t('Request 3DS')}:
      </Title>
      <StyledFormControl fullWidth error={hasError}>
        <Select
          name="performThreeDs"
          value={!isNil(performThreeDs) ? performThreeDs : NONE}
          options={options}
          onChange={onChange}
        />
        {hasError && <FormHelperText>{validationMessage}</FormHelperText>}
      </StyledFormControl>
    </>
  );
};

export default ThreeDsStep;
