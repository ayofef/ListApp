import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { UI_ROUTES } from '../constants/routes';
import Dashboard from '../containers/Dashboard';
import AddBillingCard from '../pages/AddBillingCard';
import AddToSlack from '../pages/AddToSlack';
import EmailConfimation from '../pages/EmailConfimation';
import InstallSlack from '../pages/InstallSlack';
import PlanSelection from '../pages/PlanSelection';
import ResetPassword from '../pages/ResetPassword';
import ErrorBoundary from '../utils/errorBoundary';
import OtpLogin from '../pages/OtpLogin';
import MFASetup from '../pages/MFASetup';
import FlowDetailsPage from '../pages/FlowDetailsPage';
import BetaAccessCodePage from '../pages/BetaAccessPage';
import AutomationTemplatePage from '../pages/AutomationTemplatePage';
import SignUpSurvey from '../pages/SignUpSurvey';
import VersionPage from '../pages/Version';
import { useGlobalContext } from '../containers/App/context';
import FlowEditorPage from '../pages/FlowEditorPage';
import AutomationTestPage from '../pages/AutomationTestPage';
import { useFeature } from '../hooks/useFeature';
import { FEATURE_TOGGLES_KEYS } from '../constants/featureToggles';
import FlowMonitorPage from '../pages/FlowMonitorPage';

const RestrictedRoutes = () => {
  const [multipleFLowEnabled] = useFeature(FEATURE_TOGGLES_KEYS.MULTIPLE_FLOW);
  const { getMeData } = useGlobalContext();
  const onboardingComplete = getMeData?.getOnboardingStatus === 'COMPLETE';

  return (
    <ErrorBoundary>
      <Switch>
        <Route exact path={UI_ROUTES.addToSlack} component={AddToSlack} />
        <Route exact path={UI_ROUTES.addBillingCard} component={AddBillingCard} />
        <Route exact path={UI_ROUTES.resetPassword} component={ResetPassword} />
        <Route exact path={UI_ROUTES.installSlack} component={InstallSlack} />
        <Route exact path={UI_ROUTES.otpLogin} component={OtpLogin} />
        <Route exact path={UI_ROUTES.mfaSetup} component={MFASetup} />
        <Route exact path={UI_ROUTES.emailConfirmation} component={EmailConfimation} />
        <Route exact path={UI_ROUTES.planSelection} component={PlanSelection} />
        <Route exact path={UI_ROUTES.signUpSurvey} component={SignUpSurvey} />
        <Route exact path={UI_ROUTES.betaAccessCode} component={BetaAccessCodePage} />
        <Route exact sensitive path={UI_ROUTES.version} component={VersionPage} />
        <Route exact path={UI_ROUTES.automationsEditor} component={FlowEditorPage} />
        <Route exact path={UI_ROUTES.automationsTest} component={AutomationTestPage} />
        <Route exact path={UI_ROUTES.automationsMonitor} component={FlowMonitorPage} />
        <Route exact path={UI_ROUTES.automationTemplates} component={AutomationTemplatePage} />
        <Route exact path={`${UI_ROUTES.automationTemplates}/:paymentFlowId`} component={AutomationTemplatePage} />
        <Route
          exact
          path={[UI_ROUTES.flowDetails, `${UI_ROUTES.flowDetails}/:page`, `${UI_ROUTES.flowDetails}/:page/:subPage`]}
        >
          {multipleFLowEnabled ? <FlowDetailsPage /> : <Redirect to={UI_ROUTES.automations} />}
        </Route>

        {/* Guard This Routes */}
        {onboardingComplete && <Route path={UI_ROUTES.root} component={Dashboard} />}
      </Switch>
    </ErrorBoundary>
  );
};

export default RestrictedRoutes;
