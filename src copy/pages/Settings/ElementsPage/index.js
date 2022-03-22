import React, { useMemo } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { Redirect, Route, Switch, useLocation, useRouteMatch, Link } from 'react-router-dom';
import last from 'lodash/last';
import { H3 } from '../../../components/atoms';
import ElementsSections from './components/ElementsSections';
import BrandCenterPage from '../BrandCenterPage';
import EmailsPage from './EmailsPage';
import { StyledTypography, StyledWrapper } from './styled';
import { ELEMENTS_SECTIONS } from './constants';
import { UI_ROUTES } from '../../../constants/routes';

const ElementsPage = () => {
  const { t } = useTranslation();
  const { path, url } = useRouteMatch();
  const { pathname } = useLocation();
  const subRoute = useMemo(() => last(pathname.split('/')), [pathname]);
  const subTitle = useMemo(() => ELEMENTS_SECTIONS.find((section) => section.subRoute === `/${subRoute}`)?.title, [
    subRoute,
  ]);

  return (
    <Box>
      <Box display="flex" alignItems="center" margin="0 0 20px 0">
        <Link to={UI_ROUTES.elements}>
          <H3 fontWeight="600">{t('Elements')}</H3>
        </Link>
        {subTitle && (
          <>
            <StyledWrapper>/</StyledWrapper>
            <StyledTypography color="#787F88">{t(subTitle)}</StyledTypography>
          </>
        )}
      </Box>

      <Switch>
        <Route key={path} path={path} exact component={ElementsSections} />
        <Route key={path} path={`${path}/brand-center`} exact component={BrandCenterPage} name="QQQQ" />
        <Route key={path} path={`${path}/emails`} exact component={EmailsPage} />
        <Redirect to={url} />
      </Switch>
    </Box>
  );
};

export default ElementsPage;
