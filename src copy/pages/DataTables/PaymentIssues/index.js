import React, { useState, useCallback } from 'react';
import Box from '@material-ui/core/Box';
import PaymentIssuesTable from '../../Payments/Issues';
import Header from '../../Payments/Issues/Header';
import PaymentIssuesDrawer from './PaymentIssuesDrawer';

const PaymentIIssues = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = useCallback(() => setDrawerOpen((prevState) => !prevState), []);
  return (
    <Box position="relative" display="flex" flexDirection="column" width="100%" height="100%" bgcolor="transparent">
      <Box padding="16px 32px">
        <Header drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
      </Box>

      <Box display="flex" flexDirection="column" flexGrow="1" p="0px 32px 16px 24px" bgcolor="#fff">
        <PaymentIssuesTable />
      </Box>
      <PaymentIssuesDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />
    </Box>
  );
};

export default PaymentIIssues;
