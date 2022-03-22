import React, { useState } from 'react';
import { withFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { func, bool, shape } from 'prop-types';
import InputMask from 'react-input-mask';
import { useTranslation } from 'react-i18next';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CheckIcon from '@material-ui/icons/Check';
import { FieldRow } from '../formStyles';
import { InputField, Button, P14, BlockWrap, L12 } from '../../atoms';
import THEME from '../../../constants/theme';
import billingCardSchema, { billingCardFields } from '../../../utils/schemas/billingCardSchema';
import { BillingCardWrap } from './styled';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

const masks = {
  cardNumber: '9999-9999-9999-9999',
  cvv: '999',
  expiryDate: '99/99',
};

const BillingCardForm = ({
  values,
  errors,
  handleChange,
  handleBlur,
  touched,
  handleCancel,
  handleCardSubmit,
  loading,
  isPage,
  hideCancel,
  editBillingCard,
}) => {
  const [showErrors, setShowErrors] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = () => {
    if (!isEmpty(errors)) {
      setShowErrors(true);
    } else {
      handleCardSubmit(values);
    }
  };

  const onChange = (e) => {
    handleChange(e);
  };

  return (
    <BillingCardWrap>
      <FlexContainer maxWidth="380" flexDirection="column" justifyContent="flex-start" alignItems="flex-start">
        <BlockWrap margin="0 0 20px">
          {billingCardFields.map(({ field, type, label }) => (
            <FieldRow key={field} className={`credit-input credit-${field}`}>
              {masks[field] ? (
                <InputMask mask={masks[field]} value={values[field]} onChange={onChange} onBlur={handleBlur}>
                  {(inputProps) => (
                    <InputField
                      variant="outlined"
                      type={type || 'text'}
                      key={field}
                      name={field}
                      label={label}
                      {...inputProps}
                    />
                  )}
                </InputMask>
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
                />
              )}
              {showErrors && errors[field] && (
                <L12 margin="-10px 0 10px 0" color={THEME.secondaryColors.danger}>
                  {errors[field]}
                </L12>
              )}
            </FieldRow>
          ))}
        </BlockWrap>
        {!editBillingCard && <P14> {isPage ? t('addBillingCardForm.description2') : t('funding.bottomText')}</P14>}
        <FlexContainer justifyContent="flex-start" margin="auto 0 0">
          {isPage ? (
            <BlockWrap margin="52px 16px 0 0">
              <Button onClick={handleSubmit} disabled={isEmpty(touched)} className="blue" loading={loading}>
                {t('buttonsText.Continue')} {!isEmpty(touched) && <ArrowForwardIcon />}
              </Button>
            </BlockWrap>
          ) : (
            <>
              <BlockWrap margin="52px 16px 0 0">
                <Button onClick={handleSubmit} disabled={isEmpty(touched)} className="blue" loading={loading}>
                  {t('buttonsText.Save')}
                  {!isEmpty(touched) && <CheckIcon />}
                </Button>
              </BlockWrap>
              {(hideCancel || handleCancel) && (
                <BlockWrap margin="52px 0 0 0">
                  <Button onClick={handleCancel} ghost>
                    {t('buttonsText.Cancel')}
                  </Button>
                </BlockWrap>
              )}
            </>
          )}
        </FlexContainer>
      </FlexContainer>
    </BillingCardWrap>
  );
};

BillingCardForm.propTypes = {
  values: shape({}).isRequired,
  errors: shape({}).isRequired,
  handleChange: func.isRequired,
  handleBlur: func.isRequired,
  touched: shape({}).isRequired,
  handleCancel: func,
  handleCardSubmit: func.isRequired,
  loading: bool,
  isPage: bool,
  hideCancel: bool,
  editBillingCard: bool,
};

BillingCardForm.defaultProps = {
  handleCancel: () => false,
  loading: false,
  isPage: false,
  hideCancel: false,
  editBillingCard: false,
};

export default withRouter(withFormik(billingCardSchema)(BillingCardForm));
