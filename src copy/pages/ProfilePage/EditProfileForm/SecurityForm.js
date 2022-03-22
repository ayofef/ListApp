import React from 'react';
import { useMutation } from '@apollo/client';
import { string, bool } from 'prop-types';
import Box from '@material-ui/core/Box';
import isEmpty from 'lodash/isEmpty';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { NotificationManager } from 'react-notifications';
import { CHANGE_PASSWORD, FORGOT_PASSWORD } from '../../../utils/queries/customer/customerMutations';
import { L14M } from '../../../components/atoms';
import {
  securityTabFields,
  passwordValidationSchema,
  passwordInitialValues,
} from '../../../utils/schemas/editProfileSchema';
import Password from '../../../components/forms/_common/Password';
import THEME from '../../../constants/theme';
import FormControl from './FormControl';
import ChevronRight from '../../../assets/icons/ChevronRight';
import { MUTATE_OPTIONS } from '../constant';
import { TOAST_TIMEOUT } from '../../../constants/toastTimeout';
import { FlexContainer } from '../../../components/atoms/flex/FlexContainer';

const TITLE = 'Security';
const SAME_PASSWORD_ERROR_MESSAGE = 'Your new password cannot be the same as your current password';

const SecurityForm = ({ email, getMeLoading }) => {
  const { t } = useTranslation();
  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD, {
    context: { skipGlobalHandling: true },
    ...MUTATE_OPTIONS,
  });
  const [forgotPassword] = useMutation(FORGOT_PASSWORD);

  const errorNotify = (data) => {
    const message = data?.errors?.[0]?.message;

    NotificationManager.error(t(message), t(TITLE), TOAST_TIMEOUT);
  };

  const changePasswordNotify = (data) => {
    if (!isEmpty(data?.errors) || !data?.data?.changePassword) {
      errorNotify(data);
      return false;
    }

    const message = t('editProfile.securityForm.success');
    NotificationManager.success(t(message), t(TITLE), TOAST_TIMEOUT);
    return true;
  };

  const forgotPasswordNotify = (data) => {
    if (!isEmpty(data?.errors)) errorNotify(data);
    else {
      const followInstructions = t('forgotPasswordForm.notification.followInstructions');
      const toReset = t('forgotPasswordForm.notification.toReset');
      const message = `${followInstructions} ${email} ${toReset}`;

      NotificationManager.success(t(message), t(TITLE), TOAST_TIMEOUT);
    }
  };

  const onForgotPassword = async () => {
    if (loading) return;

    const data = await forgotPassword();
    forgotPasswordNotify(data);
  };

  const handleSubmit = async (values, { resetForm }) => {
    if (values.currentPassword === values.newPassword) {
      NotificationManager.error(t(SAME_PASSWORD_ERROR_MESSAGE), t(TITLE), TOAST_TIMEOUT);
      resetForm();

      return;
    }

    const data = await changePassword({
      variables: {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      },
    });

    const success = changePasswordNotify(data);
    if (success) {
      resetForm();
    }
  };

  return (
    <FlexContainer flexDirection="column" alignItems="flex-start">
      <FlexContainer flexDirection="column" width="100%" alignItems="stretch">
        <Formik
          initialValues={passwordInitialValues}
          onSubmit={handleSubmit}
          validate={passwordValidationSchema}
          validateOnBlur={true}
          validateOnMount={false}
        >
          <Form>
            {securityTabFields.map(({ label, field }) => {
              return (
                <Box key={field} mb="18px">
                  <Password
                    key={field}
                    name={field}
                    label={label}
                    customLabel
                    getMeLoading={getMeLoading}
                    loading={loading}
                  />
                </Box>
              );
            })}

            <Box display="flex" alignItems="center" marginTop="11px">
              <FormControl loading={loading} getMeLoading={getMeLoading}>
                {t('Change password')}
              </FormControl>

              {!getMeLoading && (
                <>
                  <L14M
                    onClick={onForgotPassword}
                    margin="0 0 0 24px"
                    cursor={loading ? '' : 'pointer'}
                    color={loading ? THEME.greyColors.grey1 : THEME.primaryColors.blue}
                  >
                    {t('signInForm.requestPasswordReset')}
                  </L14M>
                  <Box display="flex" alignItems="center" marginLeft="8px">
                    <ChevronRight stroke={loading ? THEME.greyColors.grey1 : THEME.primaryColors.blue} />
                  </Box>
                </>
              )}
            </Box>
          </Form>
        </Formik>
      </FlexContainer>
    </FlexContainer>
  );
};

SecurityForm.propTypes = {
  getMeLoading: bool.isRequired,
  email: string.isRequired,
};

export default SecurityForm;
