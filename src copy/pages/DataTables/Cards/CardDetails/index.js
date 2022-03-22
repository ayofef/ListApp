import React from 'react';
import Box from '@material-ui/core/Box';
import { useLocation } from 'react-router-dom';
import DetailsHeader from './Header';
import Details from './Details';
import { useGetCardDetails } from '../../../../hooks/dataTables/useGetCardDetails';
import { UI_ROUTES } from '../../../../constants/routes';

const CardDetails = () => {
  const { loading, card } = useGetCardDetails();
  const location = useLocation();

  const headerPrimary = { title: 'All', route: `${UI_ROUTES.cardsDataTables}${location?.search || ''}` };
  return (
    <Box position="relative" display="flex" flexDirection="column" width="100%" height="100%" bgcolor="transparent">
      <Box padding="16px 32px">
        <DetailsHeader secondary="Card details" primary={headerPrimary} />
      </Box>
      <Box display="flex" flexDirection="column" flexGrow="1" p="0px 32px 16px 24px" bgcolor="#fff">
        <Details loading={loading} card={card} />
      </Box>
    </Box>
  );
};

export default CardDetails;
