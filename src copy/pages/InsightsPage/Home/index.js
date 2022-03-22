import React from 'react';
import { H3 } from '../../../components/atoms';
import { DashboardWrapper, MainContent } from '../styled';
import ChartBlock from './ChartBlock';
import { UI_ROUTES } from '../../../constants/routes';

const Home = () => (
  <DashboardWrapper>
    <MainContent>
      <H3 fontWeight="600" margin="0 0 25px 0">
        Overview
      </H3>

      <ChartBlock pageLabel="Today" redirectLabel="Payment insights" redirectLink={UI_ROUTES.insights} />
    </MainContent>
  </DashboardWrapper>
);

export default Home;
