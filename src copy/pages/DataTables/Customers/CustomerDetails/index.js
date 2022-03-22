import React from 'react';
import Box from '@material-ui/core/Box';
import { useLocation } from 'react-router-dom';
import DetailsHeader from './Header';
import Details from './Details';
import { UI_ROUTES } from '../../../../constants/routes';
import { useGetCustomerDetails } from '../../../../hooks/dataTables/useGetCustomerDetails';

const CustomerDetails = () => {
  const { loading, customer, linkedCards } = useGetCustomerDetails();
  const location = useLocation();

  const headerPrimary = { title: 'All', route: `${UI_ROUTES.customersDataTables}${location?.search || ''}` };

  return (
    <Box position="relative" display="flex" flexDirection="column" width="100%" height="100%" bgcolor="transparent">
      <Box padding="16px 32px">
        <DetailsHeader secondary="Customer Details" primary={headerPrimary} customer={customer} />
      </Box>
      <Box display="flex" flexDirection="column" flexGrow="1" p="0px 32px 16px 24px" bgcolor="#fff">
        <Details loading={loading} customer={customer} linkedCards={linkedCards} />
      </Box>
    </Box>
  );
};

export default CustomerDetails;
