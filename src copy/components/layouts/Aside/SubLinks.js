import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { capitalize } from '@material-ui/core';

import { SITE_MAP } from '../../../constants/routes';
import CollapsableIcon from '../../../assets/icons/MainNav/Collapsable';
import { StyledHeader } from './StyledAside';
import { H4 } from '../../atoms';
import ExtraLinks from './ExtraLinks';
import { useGlobalContext } from '../../../containers/App/context';
import SubLinkList from './SubLinkList';

const SubLinks = () => {
  const { toggleDrawer } = useGlobalContext();

  return (
    <Switch>
      {SITE_MAP.map(({ title, path, subRoutes, persistSearch }) => (
        <Route key={title} path={path}>
          <Box width="100%" p="16px 16px 30px">
            <StyledHeader onClick={toggleDrawer}>
              <H4 margin="10px 0 0 15px">{capitalize(title)}</H4>
              <span className="collapsable-icon">
                <CollapsableIcon />
              </span>
            </StyledHeader>
            <SubLinkList path={path} subRoutes={subRoutes} persistSearch={persistSearch} />
            <ExtraLinks />
          </Box>
        </Route>
      ))}

      <Route path="*">
        <Box as="p">empty list</Box>
      </Route>
    </Switch>
  );
};

export default SubLinks;
