import React from 'react';
import { Form, useField, useFormikContext } from 'formik';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { shape, string, arrayOf } from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import FormControl from '../../../../components/forms/_common/FormControl';
import { StyledDialogActions } from '../../../../components/Dialog/styled';

import CustomInput from './CustomInput';
import StyledSelect from '../../../../components/forms/_common/StyledSelect';

const transformOptions = (options) =>
  options.map((el) => ({ text: { text: el?.title }, value: el?.value?.toUpperCase() }));

const MOCK_OPTIONS = transformOptions([
  { title: 'EUR', value: 'EUR' },
  { title: 'USD', value: 'USD' },
]);

const FeesForm = ({ currencyOptions }) => {
  const { t } = useTranslation();
  const [currencyField] = useField('currency');
  const { resetForm, isValid } = useFormikContext();

  const options = isEmpty(transformOptions(currencyOptions)) ? MOCK_OPTIONS : transformOptions(currencyOptions);

  return (
    <Form>
      <Box mb="24px">
        <CustomInput
          m="0 0 12px 0"
          currency="%"
          width="100%"
          inputWidth="100%"
          name="percentage"
          skipError
          label={t('Percentage fee (optional)')}
        />
        <Box display="flex" alignItems="flex-end" mb="16px">
          <CustomInput width="100%" name="fixed" inputWidth="100%" label={t('Fixed fee (optional)')} />

          <Box width="100%" marginLeft="16px" marginBottom="4px" display="flex" alignItems="flex-end">
            <StyledSelect options={options} placeholder="Select currency" {...currencyField} hideNone />
          </Box>
        </Box>
      </Box>
      <StyledDialogActions px="0" py="0">
        <FormControl primaryText="save" toggleIsOpen={resetForm} customIsSubmitDisabled={!isValid} />
      </StyledDialogActions>
    </Form>
  );
};

FeesForm.propTypes = {
  currencyOptions: arrayOf(
    shape({
      value: string,
      title: string,
    })
  ).isRequired,
};

export default FeesForm;
