import React, { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import PureLayout from '../../components/layouts/PureLayout';
import THEME from '../../constants/theme';

import { L12, P16 } from '../../components/atoms';
import { UI_ROUTES } from '../../constants/routes';
import { SlackButtonCover, Logo, LineOr } from './styled';
import PureLayoutBox from '../../components/layouts/PureLayoutBox';
import SubmitButton from '../../components/forms/_common/SubmitButton';
import GoogleAuth from '../../components/GoogleAuth';
import { FREE_EMAIL_ERROR_FLAG, useSignUpWithGoogleCallback } from './useSignUpWithGoogleCallback';
import { useRegistrationStorage } from '../../hooks/registration';
import { GOOGLE_AUTH_TYPE } from '../../hooks/useGoogleOAuth';
import useSearch from '../../hooks/useSearch';

const SignUp = memo(() => {
  const { t } = useTranslation();
  const [searchParams] = useSearch();
  const [, , clearRegistrationSession] = useRegistrationStorage();
  const { completed: isSignedUpWithGoogle } = useSignUpWithGoogleCallback();

  const isFreeMail = !!searchParams[FREE_EMAIL_ERROR_FLAG];

  useEffect(() => {
    if (!isSignedUpWithGoogle) {
      clearRegistrationSession();
    }
  }, [isSignedUpWithGoogle, clearRegistrationSession]);

  return (
    <PureLayout theme="dark">
      <PureLayoutBox theme="dark">
        <Logo src="logo-small.svg" alt="Logo WhenThen" />
        <h1>{t('Welcome to WhenThen')}</h1>
        <P16 color={THEME.greyColors.lightGrey}>
          {t('Already have an account?')}{' '}
          <Link to={UI_ROUTES.signIn} className="text-primary">
            {t('Sign in')}
          </Link>
        </P16>
        <SlackButtonCover>
          <Box zIndex="10">
            <GoogleAuth type={GOOGLE_AUTH_TYPE.signUp}>{t('Sign up with Google')}</GoogleAuth>
          </Box>
          {isFreeMail && (
            <L12 data-cy="error" color={THEME.secondaryColors.danger}>
              {t('Please use your company email')}
            </L12>
          )}
          <LineOr>{t('or')}</LineOr>
          <Box>
            <Link to={UI_ROUTES.signUpPersonalDetails}>
              <SubmitButton width="100%" className="gradient">
                {t('Sign up with email')}
              </SubmitButton>
            </Link>
          </Box>
        </SlackButtonCover>
      </PureLayoutBox>
    </PureLayout>
  );
});

export default SignUp;
