import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PureLayout from '../../components/layouts/PureLayout';
import PureLayoutBox from '../../components/layouts/PureLayoutBox';
import SignInForm from '../../components/forms/SignInForm';
import { UI_ROUTES } from '../../constants/routes';
import { StyledLink } from './styled';
import { P16 } from '../../components/atoms';
import THEME from '../../constants/theme';
import LogoSignUp from '../../components/atoms/LogoSignUp/LogoSignUp';

const SignInEmail = memo(() => {
  const { t } = useTranslation();
  return (
    <PureLayout>
      <PureLayoutBox>
        <Link to="/signIn">
          <LogoSignUp src="/logo-small.svg" alt="Logo WhenThen" />
        </Link>
        <h1>
          Sign in
          <br />
          with email
        </h1>
        <P16 margin="0 0 40px" color={THEME.greyColors.grey}>
          {t('common.dontHaveAccount')}
          <StyledLink to={UI_ROUTES.signUp} className="text-primary">
            {t('signUpForm.signUp')}
          </StyledLink>
        </P16>
        <SignInForm />
      </PureLayoutBox>
    </PureLayout>
  );
});

export default SignInEmail;
