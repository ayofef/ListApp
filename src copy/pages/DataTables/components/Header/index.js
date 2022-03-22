import PropTypes from 'prop-types';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Box } from '@material-ui/core';
import Title from '../../Header/Title';
import DefaultHeaderContent from './DefaultHeaderContent';
import CheckboxEditModeHeader from './CheckboxEditModeHeader';
import { useGetViews } from '../../../../hooks/useGetView';
import { useTableStarterContext } from '../../hooks/useTableStarter';

const Header = ({ primaryText, customButton }) => {
  const { checkboxEditMode } = useTableStarterContext();

  const views = useGetViews();
  /*Update match when other table gets save view feature */
  const match = useRouteMatch('/payments/views/:viewsId');
  const viewsId = match?.params?.viewsId;
  const primary = (viewsId && views?.[viewsId]?.name) ?? match?.params?.page ?? primaryText;
  const disableExport = primary === 'customers' || primary === 'cards';

  return (
    <Box display="flex" position="relative" mb="16px">
      <Box display="flex" alignItems="center" width="100%">
        <Title primary={primary?.replaceAll('-', ' ')} />

        <Box display="flex" alignItems="center" justifyContent="flex-end" flex="1 1 720px">
          {checkboxEditMode && !disableExport ? (
            <CheckboxEditModeHeader />
          ) : (
            <DefaultHeaderContent disableExport={disableExport} customButton={customButton} primaryText={primaryText} />
          )}
        </Box>
      </Box>
    </Box>
  );
};

Header.propTypes = {
  primaryText: PropTypes.string,
  customButton: PropTypes.func,
};
Header.defaultProps = {
  primaryText: undefined,
  customButton: undefined,
};

export default Header;
