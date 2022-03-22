import { useMutation } from '@apollo/client';
import React, { useState, useMemo, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import { withFormik } from 'formik';
import { Link } from 'react-router-dom';
import { NotificationManager } from 'react-notifications';
import { shape, func } from 'prop-types';
import { InputField, P14, L12 } from '../../atoms';
import THEME from '../../../constants/theme';
import forgotPasswordSchema, { forgotPasswordFields } from '../../../utils/schemas/forgotPasswordSchema';
import { FieldsWrapper } from '../formStyles';
import { FORGOT_PASSWORD } from '../../../utils/queries/customer/customerMutations';
import SubmitButton from '../_common/SubmitButton';
import LogoSignUp from '../../atoms/LogoSignUp/LogoSignUp';

const Label = styled.label`
  display: block;
  text-align: left;

  > span {
    font-size: 14px;
    font-weight: 500;
  }
`;

const ForgotPasswordForm = ({ values, errors, handleChange, handleBlur }) => {
  const { t } = useTranslation();
  const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD);

  const [showError, setShowError] = useState(false);
  const disabled = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const notifyUser = (data) => {
    if (data.errors) {
      const { code } = data.errors[0].extensions;
      const message = t(code);

      NotificationManager.error(message, 'Failed', 5000);
      return;
    }

    const followInstructions = t('forgotPasswordForm.notification.followInstructions');
    const toReset = t('forgotPasswordForm.notification.toReset');
    const title = t('forgotPasswordForm.notification.successTitle');
    const message = `${followInstructions} ${values.email} ${toReset}`;

    NotificationManager.success(message, title, 5000);
  };

  const confirm = async () => {
    const data = await forgotPassword({
      variables: {
        email: values.email,
      },
    });

    notifyUser(data);
  };

  const onSubmit = () => {
    if (disabled || !values.email) {
      setShowError(true);
      return;
    }

    confirm();
  };

  const onChange = (e) => {
    handleChange(e);
    setShowError(false);
  };

  const handleKeyDown = (key) => {
    if (key === 'Enter') {
      confirm();
    }
  };

  return (
    <>
      <Link to="/">
        <LogoSignUp src="/logo-small.svg" alt="Logo WhenThen" />
      </Link>
      <h1>{t('forgotPasswordForm.forgotYourPassword')}</h1>
      <P14 margin="0 0 40px" color={THEME.greyColors.grey9}>
        {t('forgotPasswordForm.enterYourEmail')}
      </P14>
      <FieldsWrapper>
        {forgotPasswordFields.map(({ field, label }) => (
          <Fragment key={field}>
            <Label>
              {label && <span>{label}</span>}
              <InputField
                variant="outlined"
                type="email"
                name={field}
                value={values[field]}
                onChange={onChange}
                onBlur={handleBlur}
                autoFocus
                root={{ margin: '4px 0 13px' }}
                onKeyPress={(event) => handleKeyDown(event.key)}
              />
            </Label>
            {showError && errors[field] && (
              <L12 margin="-10px 0 10px 0" color={THEME.secondaryColors.danger}>
                {errors[field]}
              </L12>
            )}
          </Fragment>
        ))}
      </FieldsWrapper>
      <Box mt="24px">
        <SubmitButton
          onClick={onSubmit}
          className="gradient"
          margin="44px 0 0 0"
          loading={loading}
          onKeyPress={(event) => handleKeyDown(event.key)}
        >
          {t('common.continueText')}
        </SubmitButton>
      </Box>
    </>
  );
};

ForgotPasswordForm.propTypes = {
  errors: shape({}),
  values: shape({}),
  handleChange: func,
  handleBlur: func,
};

ForgotPasswordForm.defaultProps = {
  errors: null,
  values: null,
  handleChange: null,
  handleBlur: null,
};

export default withFormik(forgotPasswordSchema)(ForgotPasswordForm);
