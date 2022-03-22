import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import PureLayoutBox from '../../components/layouts/PureLayoutBox';
import PureLayout from '../../components/layouts/PureLayout';
import GoogleAuth from '../../components/GoogleAuth';
import { LineOr } from '../SignUp/styled';
import SubmitButton from '../../components/forms/_common/SubmitButton';
import { BlockWrap } from '../../components/atoms';
import { useCompleteGoogleSignUpCallback } from './useCompleteGoogleSignUpCallback';
import { GOOGLE_AUTH_TYPE } from '../../hooks/useGoogleOAuth';
import { UI_ROUTES } from '../../constants/routes';
import { GOOGLE_EMAIL_SWITCHER_PARAM_KEY, REG_METHOD } from '../../constants/registration';
import LogoSignUp from '../../components/atoms/LogoSignUp/LogoSignUp';

const TITLE = 'Welcome back';

const CompleteSignUp = () => {
  const { t } = useTranslation();
  const {
    location: { search },
    push,
  } = useHistory();
  const { loading } = useCompleteGoogleSignUpCallback();

  const handleSignInWithEmail = () => {
    push(`${UI_ROUTES.enterPassword}${search || ''}&${GOOGLE_EMAIL_SWITCHER_PARAM_KEY}=${REG_METHOD.googleEmail}`);
  };

  return (
    <PureLayout>
      <PureLayoutBox>
        <LogoSignUp src="/logo-small.svg" alt="Logo WhenThen" />
        <h1>{t(TITLE)}</h1>
        <BlockWrap margin="40px 0">
          <GoogleAuth type={GOOGLE_AUTH_TYPE.completeSignUp} loading={loading}>
            {t('Sign in with Google')}
          </GoogleAuth>
          <LineOr>{t('or')}</LineOr>
          <Box mt="24px">
            <SubmitButton width="100%" className="gradient" onClick={handleSignInWithEmail}>
              {t('Sign in with email')}
            </SubmitButton>
          </Box>
        </BlockWrap>
      </PureLayoutBox>
    </PureLayout>
  );
};

export default CompleteSignUp;
