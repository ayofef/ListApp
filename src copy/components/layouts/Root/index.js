import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useToggle } from 'react-use';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';

import { useGlobalContext } from '../../../containers/App/context';
import { LeftAsideProvider } from '../../../providers/LeftAsideProvider';
import { RightAsideProvider } from '../../../providers/RightAsideProvider';

import { CustomProgress } from '../../atoms';
import Aside from '../Aside';

import { useStyles } from './styled';

const Root = ({ children, isShowMain }) => {
  const { globalLoading, sidebarWidth } = useGlobalContext();
  const classes = useStyles({ sidebarWidth });
  const { pathname } = useLocation();
  const [globalFilterState, toggleGlobalFilterState] = useToggle(false);

  useEffect(() => {
    return () => {
      // unsubscribe
      toggleGlobalFilterState(false);
    };
  }, [pathname, toggleGlobalFilterState]);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Box>
        {globalLoading && <CustomProgress />}

        <LeftAsideProvider>
          <Aside />
        </LeftAsideProvider>

        {isShowMain && (
          <RightAsideProvider value={{ globalFilterState, toggleGlobalFilterState }}>
            <main className={clsx(classes.content, { [classes.contentFiltered]: globalFilterState })}>{children}</main>
          </RightAsideProvider>
        )}
      </Box>
    </div>
  );
};

Root.propTypes = {
  isShowMain: PropTypes.bool.isRequired,
};

export default Root;
