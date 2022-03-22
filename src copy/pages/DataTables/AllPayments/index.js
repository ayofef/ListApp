import React, { useMemo } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import unionBy from 'lodash/unionBy';
import _isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';

import Box from '@material-ui/core/Box';
import Header from '../components/Header';
import Table from '../Table';
import { useGetPaymentList } from '../../../hooks/useGetPaymentList';
import { useNotificationManager } from '../../../hooks/useNotificationManager';
import { headCells } from './tableData';
import BottomDrawer from '../BottomDrawer';
import { TableStarterContextProvider, useTableStarter } from '../hooks/useTableStarter';
import { INITIAL_TABLE_STATE, transformHiddenColumnsFn } from './constant';
import { useGetViews } from '../../../hooks/useGetView';
import EmptyStateTemplate from '../components/EmptyStateTemplate';
import { UI_ROUTES } from '../../../constants/routes';
import usePermission from '../../../permissions/hooks/usePermission';
import { AUTOMATION_PERMISSIONS_IDS } from '../../MVPAutomation/permissions';

const ICON_WRAPPER_PROPS = {
  $transform: 'scale(1.1)',
  $margin: '0 0 10px -8px',
};

const AllPayments = () => {
  const { t } = useTranslation();
  const value = useTableStarter();
  const { loading, error, rows, pageInfo } = useGetPaymentList();
  const [canCreateAutomations] = usePermission(AUTOMATION_PERMISSIONS_IDS.automations);
  const unionRows = useMemo(() => rows && unionBy(rows, 'id'), [rows]);
  const isEmpty = !loading && _isEmpty(rows);
  const views = useGetViews();
  const { push } = useHistory();

  /**GET VIEW VALUES */
  const match = useRouteMatch('/payments/views/:viewId');
  const viewId = match?.params?.viewId;
  const view = viewId && views?.[viewId];
  const initialTableState = useMemo(() => view ?? INITIAL_TABLE_STATE, [view]);

  useNotificationManager('error', error?.message, 'All Payments', 5000);

  const handleCreateAutomation = () => {
    push(UI_ROUTES.automations);
  };

  const emptyStateComponent = (props) => (
    <EmptyStateTemplate
      iconWrapperProps={ICON_WRAPPER_PROPS}
      {...(canCreateAutomations
        ? { buttonLabel: t('Create automation'), handleButtonEvent: handleCreateAutomation }
        : {})}
      {...props}
    />
  );

  return (
    <TableStarterContextProvider value={value}>
      <Box position="relative" display="flex" flexDirection="column" width="100%" height="100%" bgcolor="transparent">
        <Box padding="16px 32px">
          <Header />
        </Box>
        <Box display="flex" flexDirection="column" flexGrow="1" p="0px 32px 16px 24px" bgcolor="#fff">
          <Table
            data={unionRows || []}
            loading={loading}
            isEmpty={isEmpty}
            pageInfo={pageInfo}
            headCells={headCells}
            initialTableState={initialTableState}
            transformHiddenColumnsFn={transformHiddenColumnsFn}
            emptyStateComponent={emptyStateComponent}
          />
        </Box>
        <BottomDrawer drawerOpen={value.drawerOpen} selected={value.selected} setSelected={value.setSelected} />
      </Box>
    </TableStarterContextProvider>
  );
};
export default AllPayments;
