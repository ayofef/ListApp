import React, { useState, Fragment } from 'react';
import { func, bool, shape } from 'prop-types';
import { withFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';
import { CountryRegionData } from 'react-country-region-selector';
import billingSchema, { billingFields } from '../../../utils/schemas/billingSchema';
import { FieldsWrapper } from '../formStyles';
import { InputField, Button, StyledSelect, H5, L12 } from '../../atoms';
import THEME from '../../../constants/theme';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

const countryToOptions = (data) => {
  return data.map((item) => {
    return {
      value: item[0],
      text: {
        text: item[0],
      },
    };
  });
};

const BillingForm = ({ values, errors, handleChange, handleBlur, resetForm, updateCustomer, loading }) => {
  const [showErrors, setShowErrors] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = () => {
    if (!isEmpty(errors)) {
      setShowErrors(true);
    } else {
      updateCustomer({
        variables: {
          ...values,
        },
      });
    }
  };

  const onChange = (e) => {
    setShowErrors(false);
    handleChange(e);
  };

  return (
    <>
      <FieldsWrapper>
        {billingFields.map(
          ({ field, type, label }, index) =>
            index < 3 && (
              <Fragment key={`billingFields-${label}`}>
                <InputField
                  variant="outlined"
                  type={type || 'text'}
                  key={field}
                  name={field}
                  label={label}
                  value={values[field]}
                  onChange={onChange}
                  onBlur={handleBlur}
                  autoFocus={field === 'companyName'}
                  size="smaller"
                />
                {showErrors && errors[field] && (
                  <L12 margin="-10px 0 10px 0" color={THEME.secondaryColors.danger}>
                    {errors[field]}
                  </L12>
                )}
              </Fragment>
            )
        )}
      </FieldsWrapper>
      <H5 margin="20px 0 12px">{t('settings.billing.billinDetails.title2')}</H5>
      <FieldsWrapper>
        {billingFields.map(
          ({ field, type, label }, index) =>
            index >= 3 && (
              <Fragment key={`billing-fields-${label}`}>
                {field === 'country' ? (
                  <StyledSelect
                    name={field}
                    id={field}
                    value={values[field]}
                    onChange={onChange}
                    options={countryToOptions(CountryRegionData)}
                    label={label}
                  />
                ) : (
                  <InputField
                    variant="outlined"
                    type={type || 'text'}
                    key={field}
                    name={field}
                    label={label}
                    value={values[field]}
                    onChange={onChange}
                    onBlur={handleBlur}
                    size="smaller"
                    autoFocus={field === 'companyName'}
                  />
                )}
                {showErrors && errors[field] && (
                  <L12 margin="-10px 0 10px 0" color={THEME.secondaryColors.danger}>
                    {errors[field]}
                  </L12>
                )}
              </Fragment>
            )
        )}
      </FieldsWrapper>

      <FlexContainer margin="20px 0 0 0" justifyContent="flex-start">
        <Button margin="0 0 0 0" onClick={handleSubmit} className="blue" loading={loading}>
          {t('buttonsText.SaveChanges')}
        </Button>
        <Button ghost margin=" 0 0 0 15.5px" onClick={resetForm}>
          {t('buttonsText.Cancel')}
        </Button>
      </FlexContainer>
    </>
  );
};

BillingForm.propTypes = {
  values: shape({}).isRequired,
  errors: shape({}).isRequired,
  handleChange: func.isRequired,
  handleBlur: func.isRequired,
  resetForm: func.isRequired,
  updateCustomer: func.isRequired,
  loading: bool.isRequired,
};

export default withRouter(withFormik(billingSchema)(BillingForm));
