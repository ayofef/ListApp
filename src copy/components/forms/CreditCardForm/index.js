import React, { useState } from 'react';
import { withFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { func, bool, shape } from 'prop-types';
import InputMask from 'react-input-mask';
import { useTranslation } from 'react-i18next';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CheckIcon from '@material-ui/icons/Check';
import { FieldsWrapper, FieldRow } from '../formStyles';
import { InputField, Button, P14, BlockWrap, L12 } from '../../atoms';
import THEME from '../../../constants/theme';
import creditCardSchema, { creditCardFields } from '../../../utils/schemas/creditCardSchema';
import { CreditCardWrap } from './styled';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

const masks = {
  cardNumber: '9999-9999-9999-9999',
  cvv: '999',
  expiryDate: '99/99',
};

const CreditCardForm = ({
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
  editCreditCard,
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
    <CreditCardWrap>
      <FlexContainer maxWidth="380" flexDirection="column" height="100%">
        <FieldsWrapper>
          {creditCardFields.map(({ field, type, label }) => {
            return (
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
            );
          })}
        </FieldsWrapper>
        {!editCreditCard && (
          <P14 margin="10px 0 0"> {isPage ? t('addBillingCardForm.description2') : t('funding.bottomText')}</P14>
        )}
        <FlexContainer margin="auto 0 0" justifyContent="flex-start">
          {isPage ? (
            <BlockWrap margin="52px 16px 0 0">
              <Button onClick={handleSubmit} disabled={isEmpty(touched)} className="blue" loading={loading}>
                {t('buttonsText.Continue')} <ArrowForwardIcon />
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
    </CreditCardWrap>
  );
};

CreditCardForm.propTypes = {
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
  editCreditCard: bool,
};

CreditCardForm.defaultProps = {
  handleCancel: () => false,
  loading: false,
  isPage: false,
  hideCancel: false,
  editCreditCard: false,
};

export default withRouter(withFormik(creditCardSchema)(CreditCardForm));
