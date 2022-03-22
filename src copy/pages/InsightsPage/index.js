import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import PaymentInsights from './PaymentInsights';
import Content from '../../components/layouts/MainLayout/Content';
import { InsightsProvider } from './context';
import { isDefined } from '../../utils/helpers';

const DashboardPage = () => {
  const { pathname } = useLocation();

  const mainContentRef = useRef(null);

  useEffect(() => {
    if (isDefined(mainContentRef?.current)) {
      mainContentRef.current.scrollTop = 0;
    }
  }, [pathname]);

  return (
    <Content ref={mainContentRef}>
      <InsightsProvider>
        <PaymentInsights />
      </InsightsProvider>
    </Content>
  );
};

export default DashboardPage;
