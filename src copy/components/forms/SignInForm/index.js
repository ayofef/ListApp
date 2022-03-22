import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Formik } from 'formik';

import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import THEME from '../../../constants/theme';
import { initialValues, signInFields } from '../../../utils/schemas/signInSchema';
import { DEFAULT_LOGIN } from '../../../utils/queries/public/publicMutations';
import signInValidator from '../../../utils/validators/signInValidator';
import useMutationSetTokens from '../../../hooks/useMutationSetTokens';
import { MUTATION_NAMES } from '../../../constants/api';
import { UI_ROUTES } from '../../../constants/routes';
import SubmitButton from '../_common/SubmitButton';
import { StyledMaterialLink } from '../../atoms';
import Password from '../_common/Password';
import Input from '../_common/Input';
import StatusSpy from '../_common/StatusSpy';
import { useGlobalContext } from '../../../containers/App/context';
import { linkStyle } from './styled';

const SignInForm = () => {
  const { t } = useTranslation();
  const [login, { loading }] = useMutationSetTokens(DEFAULT_LOGIN, MUTATION_NAMES.login);
  const { getMeRefetch } = useGlobalContext();
  const { push } = useHistory();
  const connectPath = sessionStorage.getItem('connect');
  const handleSubmit = useCallback(
    (values, actions) => {
      actions.setStatus(undefined);
      login({ variables: values })
        .then((res) => {
          if (!res.data?.login.isLoggedIn) {
            actions.setStatus(t('uiMessages.loginFail'));
          }
        })
        .finally(() => {
          actions.setSubmitting(false);
          getMeRefetch();
          if (connectPath) {
            push(connectPath);
            sessionStorage.removeItem('connect');
          }
        });
    },
    [t, login, getMeRefetch, connectPath, push]
  );

  return (
    <Formik
      initialValues={initialValues}
      validate={signInValidator}
      onSubmit={handleSubmit}
      validateOnBlur={false}
      validateOnMount
    >
      <Form>
        {signInFields.map(({ field, type, label, placeholder }) => {
          const Component = type === 'password' ? Password : Input;
          const componentProps = {
            name: field,
            type,
            label,
            placeholder: t(placeholder),
            ...(type === 'password' && { signIn: true }),
            ...(type !== 'password' && { customLabel: true }),
          };
          return (
            <React.Fragment key={label}>
              {type === 'password' && (
                <StyledMaterialLink
                  to={UI_ROUTES.forgotPassword}
                  textDecoration="none"
                  color={THEME.primaryColors.primary}
                  margin="0 0 0 6px"
                  className="text-primary"
                  cursor="pointer"
                  style={linkStyle}
                  fontSize="12px"
                >
                  {t('signInForm.forgotPassword')}
                </StyledMaterialLink>
              )}
              <Component {...componentProps} />
            </React.Fragment>
          );
        })}
        <StatusSpy />
        <Box mt="24px">
          <SubmitButton isLoading={loading}>{t('common.continueText')}</SubmitButton>
        </Box>
      </Form>
    </Formik>
  );
};

export default SignInForm;
