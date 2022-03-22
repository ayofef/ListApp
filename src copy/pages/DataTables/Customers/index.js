import React, { useState, useCallback } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Table from '../Table';
import { useGetCustomers } from '../../../hooks/dataTables/useGetCustomers';
import { useNotificationManager } from '../../../hooks/useNotificationManager';
import { headCells, transformNodeToRow } from './tableData';
import { TableStarterContextProvider, useTableStarter } from '../hooks/useTableStarter';
import { INITIAL_TABLE_STATE, transformHiddenColumnsFn } from './constant';
import { ButtonRounded } from '../../../components/atoms';
import CreateCustomerDrawer from './CreateCustomerDrawer';
import EmptyStateTemplate from '../components/EmptyStateTemplate';
import { ICON_WRAPPER_PROPS } from '../constant';
import CustomersIcon from '../../../assets/icons/EmptyStates/Customers';

const Customers = () => {
  const value = useTableStarter();
  const { t } = useTranslation();
  const { loading, error, customers, pageInfo } = useGetCustomers();
  const isEmpty = !loading && customers !== undefined && (!customers?.length || customers?.length === 0);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = useCallback(() => setIsOpen((prevState) => !prevState), []);
  useNotificationManager('error', error?.message, 'All Payments', 5000);

  const customButton = () => {
    return (
      <ButtonRounded type="button" color="primary" variant="contained" onClick={toggleDrawer}>
        {t('Create customer')}
      </ButtonRounded>
    );
  };

  const emptyStateComponent = (props) => (
    <EmptyStateTemplate
      description="You currently have no customers"
      buttonLabel="Create customer"
      handleButtonEvent={toggleDrawer}
      iconWrapperProps={ICON_WRAPPER_PROPS}
      iconComponent={CustomersIcon}
      title=""
      {...props}
    />
  );

  return (
    <TableStarterContextProvider value={value}>
      <Box position="relative" display="flex" flexDirection="column" width="100%" height="100%" bgcolor="transparent">
        <Box padding="16px 32px">
          <Header primaryText="customers" customButton={customButton} />
        </Box>

        <Box display="flex" flexDirection="column" flexGrow="1" p="0px 32px 16px 24px" bgcolor="#fff">
          <Table
            data={transformNodeToRow(customers) ?? []}
            loading={loading}
            isEmpty={isEmpty}
            pageInfo={pageInfo}
            headCells={headCells}
            initialTableState={INITIAL_TABLE_STATE}
            transformHiddenColumnsFn={transformHiddenColumnsFn}
            emptyStateComponent={emptyStateComponent}
          />
        </Box>
      </Box>
      <CreateCustomerDrawer toggleDrawer={toggleDrawer} isOpen={isOpen} />
    </TableStarterContextProvider>
  );
};
export default Customers;
