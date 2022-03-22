import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import Drawer from '@material-ui/core/Drawer';
import { Route, Switch, useLocation, Link, Redirect, useParams, useRouteMatch } from 'react-router-dom';
import capitalize from '@material-ui/core/utils/capitalize';
import omit from 'lodash/omit';
import { FilterButton, P16B, H3 } from '../../../components/atoms';
import { DashboardWrapper, MainContent, StyledBox } from '../styled';
import ChartBlock from './ChartBlock';
import FilterList from '../../Payments/FilterList';
import { useStyles, IconButton } from '../../Payments/styled';
import { DEFAULT_VALUES, FIELDS, validationSchema } from './fieldsSettings';
import useSearch from '../../../hooks/useSearch';
import { useRightAsideContext } from '../../../providers/RightAsideProvider';
import InsightInfo from './InsightInfo';
import { InsightHeaderSlash, InsightHeaderStatus } from './Components/styled';
import FilterBar from './FilterBar/FilterBar';
import { useGlobalContext } from '../../../containers/App/context';
import { InsightDetailsProvider } from './InsightInfo/context';
import { isDefined } from '../../../utils/helpers';
import { UI_ROUTES } from '../../../constants/routes';
import { useFeature } from '../../../hooks/useFeature';
import { FEATURE_TOGGLES_KEYS } from '../../../constants/featureToggles';
import { FlexContainer } from '../../../components/atoms/flex/FlexContainer';

const Home = () => {
  const [insightsNavEnabled] = useFeature(FEATURE_TOGGLES_KEYS.INSIGHTS_NAV);
  const { sidebarWidth } = useGlobalContext();
  const { search, pathname } = useLocation();
  const { path: routePath } = useRouteMatch();
  const path = insightsNavEnabled ? routePath : UI_ROUTES.insights;

  const params = useParams();
  const [chartDataKey, setChartDataKey] = useState('total.rawAmount');
  const { globalFilterState, toggleGlobalFilterState } = useRightAsideContext();
  const classes = useStyles({ sidebarWidth });
  const [searchParams] = useSearch();
  const { t } = useTranslation();
  const numberOfFilters = searchParams?.filter
    ? Object.keys(omit(searchParams?.filter, ['date', 'rangeType']))?.length
    : 0;
  const status = params?.status || pathname?.split('/')[2];
  const isInsightsDetailPage = isDefined(status) && status !== 'insights';

  const customIsClearDisabled = !Object.keys(searchParams.filter || {})?.some((el) =>
    Object.keys(DEFAULT_VALUES)?.includes(el)
  );

  const showFilterCount = Object.keys(searchParams?.filter ?? {}).length > 2;
  const { buttonLabel, color } = showFilterCount
    ? { buttonLabel: 'filter', color: '#7879f1' }
    : { buttonLabel: 'add filter', color: 'inherit' };

  const handleDrawer = () => {
    toggleGlobalFilterState();
  };

  const Title = isInsightsDetailPage ? Link : 'span';
  const titleComponentProps = isInsightsDetailPage
    ? {
        to: `${path}${search || ''}`,
      }
    : {};

  return (
    <DashboardWrapper>
      <MainContent>
        <FlexContainer justifyContent="space-between" width="100%" margin="-2px 0 12px 0">
          <H3 fontWeight="600" center>
            <StyledBox hover={isInsightsDetailPage}>
              <Box component={Title} {...titleComponentProps}>
                {t('Insights')}
              </Box>
            </StyledBox>

            {isInsightsDetailPage && (
              <>
                <InsightHeaderSlash>{status && ' / '}</InsightHeaderSlash>
                <InsightHeaderStatus>{`  ${status}`}</InsightHeaderStatus>
              </>
            )}
          </H3>
          <Box color={color} zIndex="100">
            <FilterButton
              numberOfFilters={numberOfFilters}
              isOpen={globalFilterState}
              handleDrawerOpen={handleDrawer}
              handleDrawerClose={handleDrawer}
            >
              {capitalize(t(buttonLabel) ?? '')}
            </FilterButton>
          </Box>
        </FlexContainer>

        <FlexContainer justifyContent="space-between" width="100%" borderBottom="1px solid #E6E9EC" margin="16px 0">
          <FilterBar dataKey={chartDataKey} setChartDataKey={setChartDataKey} />
        </FlexContainer>

        <Switch>
          <Route path={`${path}/:status`}>
            <InsightDetailsProvider>
              <InsightInfo dataKey={chartDataKey} />
            </InsightDetailsProvider>
          </Route>

          <Route path={`${path}`}>
            <ChartBlock dataKey={chartDataKey} />
          </Route>
          <Redirect to={path} />
        </Switch>

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={globalFilterState}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <P16B margin="0">Filter</P16B>

            <IconButton onClick={handleDrawer} bgcolor="#fff">
              <CloseIcon />
            </IconButton>
          </div>

          <FilterList
            fields={FIELDS}
            defaultValues={DEFAULT_VALUES}
            validationSchema={validationSchema}
            customIsClearDisabled={customIsClearDisabled}
            filterKeysToMerge={['date', 'rangeType']} //  custom filters to merge with filters from drawer
          />
        </Drawer>
      </MainContent>
    </DashboardWrapper>
  );
};

export default Home;
