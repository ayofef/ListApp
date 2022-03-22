import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import CardSlab from './CardSlab';
import { StagesLoadingState } from '../LoadingState';

const CardStages = ({ automationCount, paymentGatewaysCount, loading }) => {
  return (
    <Box display="flex">
      {loading && <StagesLoadingState />}
      {!loading && (
        <>
          <CardSlab title="automations" count={automationCount} />
          <CardSlab title="payment gateways" count={paymentGatewaysCount} />
        </>
      )}
    </Box>
  );
};

CardStages.propTypes = {
  automationCount: PropTypes.number.isRequired,
  paymentGatewaysCount: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default CardStages;
