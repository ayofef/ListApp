import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import PureLayout from '../../components/layouts/PureLayout';
import PureLayoutBox from '../../components/layouts/PureLayoutBox';
import SignInForm from '../../components/forms/SignInForm';
import { UI_ROUTES } from '../../constants/routes';
import { StyledLink } from './styled';
import { BlockWrap, P16 } from '../../components/atoms';
import THEME from '../../constants/theme';
import GoogleAuth from '../../components/GoogleAuth';
import { LineOr } from '../SignUp/styled';
import { GOOGLE_AUTH_TYPE } from '../../hooks/useGoogleOAuth';
import { useSignInWithGoogleCallback } from './useSignInWithGoogleCallback';
import LogoSignUp from '../../components/atoms/LogoSignUp/LogoSignUp';

const SignIn = memo(() => {
  const { t } = useTranslation();
  const { loading } = useSignInWithGoogleCallback();

  return (
    <PureLayout>
      <PureLayoutBox>
        <LogoSignUp src="/logo-small.svg" alt="Logo WhenThen" />
        <h1>{t('signInForm.signInToYourAccount')}</h1>
        <P16 margin="0 0 40px" color={THEME.greyColors.grey9}>
          {t('common.dontHaveAccount')}
          <StyledLink to={UI_ROUTES.signUp} className="text-primary">
            {t('Register')}
          </StyledLink>
        </P16>
        <BlockWrap margin="40px 0 20px 0">
          <GoogleAuth type={GOOGLE_AUTH_TYPE.login} loading={loading}>
            {t('Sign in with Google')}
          </GoogleAuth>
        </BlockWrap>

        <LineOr>{t('or')}</LineOr>

        <SignInForm />
      </PureLayoutBox>
    </PureLayout>
  );
});

export default SignIn;
