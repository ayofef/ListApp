import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { UI_ROUTES } from '../constants/routes';

import SignUp from '../pages/SignUp';
import SignUpForm from '../pages/SignUpPersonalDetails';
import SignIn from '../pages/SignIn';
import SignInEmail from '../pages/SignInEmail';
import ErrorBoundary from '../utils/errorBoundary';
import SignUpCompanyDetails from '../pages/SignUpCompanyDetails';

import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import SlackAuthConfirm from '../pages/SlackAuthConfirm';
import Invitation from '../pages/Invitation';
import VersionPage from '../pages/Version';

/**New Registration FLow Pages */
import WelcomeToBetaPage from '../pages/WelcomeToBetaPage';
import WaitingListPage from '../pages/WaitingListPage';
import ExpiredBetaLink from '../pages/ExpiredBetaLink';
import VerifyBetaLink from '../pages/VerifyBetaLink';
import EnterPasswordPage from '../pages/EnterPasswordPage';
import CompleteSignUp from '../pages/CompleteSignUp';

const PublicRoutes = () => (
  <ErrorBoundary>
    <Switch>
      <Route exact path={UI_ROUTES.slackAuth} component={SlackAuthConfirm} />
      <Route exact path={UI_ROUTES.signUp} component={SignUp} />
      <Route exact path={UI_ROUTES.signUpPersonalDetails} component={SignUpForm} />
      <Route exact path={UI_ROUTES.signIn} component={SignIn} />
      <Route exact path={UI_ROUTES.signInEmail} component={SignInEmail} />
      <Route exact path={UI_ROUTES.signUpCompanyDetails} component={SignUpCompanyDetails} />
      <Route exact path={UI_ROUTES.welcomeToBeta} component={WelcomeToBetaPage} />
      <Route exact path={UI_ROUTES.waitingList} component={WaitingListPage} />
      <Route exact path={UI_ROUTES.verifyBetaLink} component={VerifyBetaLink} />
      <Route exact path={UI_ROUTES.expiredBetaLink} component={ExpiredBetaLink} />
      <Route exact path={UI_ROUTES.enterPassword} component={EnterPasswordPage} />
      <Route exact path={UI_ROUTES.completeSignUp} component={CompleteSignUp} />

      <Route exact path={UI_ROUTES.forgotPassword} component={ForgotPassword} />
      <Route exact path={UI_ROUTES.resetPassword} component={ResetPassword} />
      <Route exact path={UI_ROUTES.invite} component={Invitation} />
      <Route exact sensitive path={UI_ROUTES.version} component={VersionPage} />
      <Redirect path="*" to={UI_ROUTES.signIn} />
    </Switch>
  </ErrorBoundary>
);

export default PublicRoutes;
