import { useMutation } from '@apollo/client';
import React from 'react';
import queryString from 'query-string';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';
import { NotificationManager } from 'react-notifications';
import isEmpty from 'lodash/isEmpty';
import { useHistory } from 'react-router-dom';
import { P16 } from '../../atoms';
import THEME from '../../../constants/theme';
import { resetPasswordFields, initialValues } from '../../../utils/schemas/resetPasswordSchema';
import resetPasswordValidator from '../../../utils/validators/resetPasswordValidator';
import { FieldsWrapper } from '../formStyles';
import { RESET_PASSWORD } from '../../../utils/queries/customer/customerMutations';
import { UI_ROUTES } from '../../../constants/routes';
import SubmitButton from '../_common/SubmitButton';
import Password from '../_common/Password';
import { messages } from '../../../client/links/errorLink';

const TOAST_TIMEOUT = 5000;
const TOAST_TITLE = 'Reset Password';

const ResetPasswordForm = () => {
  const { t } = useTranslation();
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD, { context: { skipGlobalHandling: true } });
  const history = useHistory();
  const { push } = history;

  const onSubmit = async (values) => {
    const { search } = history.location;
    const params = queryString.parse(search);

    try {
      const res = await resetPassword({
        variables: { newPassword: values.password, token: params.token },
      });
      const isFailed = !isEmpty(res?.errors) || !res?.data?.resetPassword;

      if (isFailed) {
        const error = res?.errors?.[0]?.message;
        const errorMessage = messages[error] ?? error ?? 'uiMessages.error';

        NotificationManager.error(t(errorMessage), t(TOAST_TITLE), TOAST_TIMEOUT);
        return;
      }

      const successMessage = t('resetPasswordForm.notification.success');
      NotificationManager.success(successMessage, t(TOAST_TITLE), TOAST_TIMEOUT);
      push(UI_ROUTES.signIn);
    } catch {
      NotificationManager.error(t('uiMessages.error'), t(TOAST_TITLE), TOAST_TIMEOUT);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={resetPasswordValidator}
      validateOnBlur={true}
      validateOnMount={false}
    >
      <Form>
        <h1>{t('resetPasswordForm.resetPassword')}</h1>
        <P16 margin="0 0 28px" color={THEME.greyColors.grey1}>
          {t('resetPasswordForm.enterPassword')}
        </P16>
        <FieldsWrapper>
          {resetPasswordFields.map(({ field, label, type }) => (
            <Password key={field} name={field} type={type} label={label} />
          ))}
          <Box mt="24px">
            <SubmitButton isLoading={loading}>{t('buttonsText.Submit')}</SubmitButton>
          </Box>
        </FieldsWrapper>
      </Form>
    </Formik>
  );
};

export default ResetPasswordForm;
