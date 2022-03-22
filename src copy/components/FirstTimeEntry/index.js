import React from 'react';
import { useQuery } from '@apollo/client';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { GET_ME_AND_WE } from '../../utils/queries/public/publicQueries';
import { useUserSelector } from '../../providers/User/UserContext';
import {
  selectIsDemo,
  // selectIsGreeted,
  selectIsSwitching,
} from '../../providers/User/state/selectors';
// import Greeting from './Greeting';
import DemoUser from './DemoUser';
import { UI_ROUTES } from '../../constants/routes';

const HIDE_MAP = ['editor']; //editor = automationEditor

const FirstTimeEntry = () => {
  const isDemo = useUserSelector(selectIsDemo);
  // const isGreet = useUserSelector(selectIsGreeted);
  const isSwitching = useUserSelector(selectIsSwitching);
  const { data } = useQuery(GET_ME_AND_WE);
  const { pathname } = useLocation();
  const match = useRouteMatch([
    UI_ROUTES.home,
    UI_ROUTES.payments,
    UI_ROUTES.connections,
    UI_ROUTES.automations,
    UI_ROUTES.brandCenter,
    UI_ROUTES.flows,
    UI_ROUTES.insights,
  ]);

  if (!data || !match || isSwitching || pathname?.includes(HIDE_MAP)) {
    return null;
  }

  if (isDemo) {
    return <DemoUser />;
  }

  // if (!isGreet) {
  //   return <Greeting />;
  // }

  return null;
};

export default FirstTimeEntry;
