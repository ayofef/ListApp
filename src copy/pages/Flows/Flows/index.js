import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import isEmpty from 'lodash/isEmpty';
import FlowsListCard from '../../../components/FlowsListCard';
import EmptyState from '../EmptyState';
import LoadingState from '../LoadingState';

const Flows = ({ loading, flows, currentPage }) => {
  if (!loading && isEmpty(flows)) {
    return <EmptyState currentPage={currentPage} />;
  }

  return (
    <Box>
      {loading && <LoadingState />}
      {!loading &&
        flows?.map((flow) => {
          const gateways = flow?.enabledGateways ?? [];

          const paymentGateway = [...new Set(gateways?.filter(Boolean))];

          return (
            <FlowsListCard
              key={flow?.id}
              id={flow?.id}
              name={flow?.name}
              status={flow?.status}
              automationsCount={flow?.automationsList?.length ?? 0}
              paymentGatewaysCount={paymentGateway?.length ?? 0}
            />
          );
        })}
    </Box>
  );
};

Flows.propTypes = {
  currentPage: PropTypes.string,
  flows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};
Flows.defaultProps = {
  currentPage: '',
};

export default Flows;
