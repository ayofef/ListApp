import React, { useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { string } from 'prop-types';
import { Form, Formik } from 'formik';
import { capitalize } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import omit from 'lodash/omit';

import { BlockWrap, StyledMaterialLink, P16 } from '../../atoms';
import SubmitButton from '../_common/SubmitButton';
import GoogleAuth from '../../GoogleAuth';
import { GOOGLE_AUTH_TYPE } from '../../../hooks/useGoogleOAuth';
import THEME from '../../../constants/theme';
import { invitationFields, initialValues, invitationFieldsNames } from '../../../utils/schemas/invitationSchema';
import invitationValidator from '../../../utils/validators/invitationValidator';
import { UI_ROUTES } from '../../../constants/routes';
import AcceptLabel from '../SignUpPersonalDetailsForm/AcceptLabel';
import Input from '../_common/Input';
import Password from '../_common/Password';
import Checkbox from '../_common/Checkbox';
import { useCompleteInvitation } from '../../../hooks/registration/useCompleteInvitation';

const InvitationForm = ({ email, token }) => {
  const { t } = useTranslation();
  const { completeInvitation, loading, authenticationState } = useCompleteInvitation();

  const parsedInitialValues = useMemo(() => initialValues({ email }), [email]);

  //Handles Google Authentication
  useEffect(() => {
    if (authenticationState?.state !== GOOGLE_AUTH_TYPE.completeSignUpWithInvitation) {
      return;
    }

    completeInvitation({
      email: authenticationState.jwt.email,
      googleToken: authenticationState.token,
      token,
    });
  }, [authenticationState, token, completeInvitation, email]);

  const handleSubmit = async (values, actions) => {
    const removedAccepted = omit(values, 'accepted');
    try {
      await completeInvitation({ ...removedAccepted, token });
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={parsedInitialValues}
      enableReinitialize
      onSubmit={handleSubmit}
      validate={invitationValidator}
      validateOnBlur={true}
      validateOnMount={false}
    >
      <Form>
        <h1>{capitalize(t(`Join your team`))}</h1>

        <P16 textAlign="center" color={THEME.greyColors.grey1}>
          {t('common.underTitle')}
        </P16>
        <P16 textAlign="center" color={THEME.greyColors.grey1}>
          {t('common.haveAccount')}
          &nbsp;
          <StyledMaterialLink to={UI_ROUTES.signIn} color={THEME.secondaryColors.blue}>
            {t('signInForm.signIn')}
          </StyledMaterialLink>
        </P16>

        <BlockWrap height="43px" margin="32px 0">
          <GoogleAuth type={GOOGLE_AUTH_TYPE.completeSignUpWithInvitation} loading={loading}>
            {t('Continue with Google')}
          </GoogleAuth>
        </BlockWrap>

        {invitationFields.map(({ field, type, label }) => {
          const Component = type === 'password' ? Password : Input;

          return <Component key={field} name={field} type={type} label={label} customLabel />;
        })}

        <Box mt="10px" mb="20px">
          <Checkbox name={invitationFieldsNames.accepted} label={<AcceptLabel />} />
        </Box>

        <SubmitButton>{t('common.continueText')}</SubmitButton>
      </Form>
    </Formik>
  );
};
InvitationForm.propTypes = {
  email: string,
  token: string,
};
InvitationForm.defaultProps = {
  email: '',
  token: '',
};
export default InvitationForm;
