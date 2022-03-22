import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import CardHeader from './CardHeader';
import CardStats from './CardStats';
import { StyledBox } from './styled';

import { useGetFlowStats } from '../../hooks/useGetFlowStats';

const FlowsListCard = ({ id, name, status }) => {
  const [getFlowStats, { flowStats, loading }] = useGetFlowStats();

  useEffect(() => {
    if (id) {
      getFlowStats({
        variables: { flowId: id },
      });
    }
  }, [id, getFlowStats]);

  return (
    <Box mb="32px">
      <StyledBox component={Link} to={{ pathname: `/flows/${id}/details` }} display="block" borderRadius="6px">
        <CardHeader flowId={id} flowName={name} flowStatus={status} />
        <CardStats flowStats={flowStats} loading={loading} />
      </StyledBox>
    </Box>
  );
};

FlowsListCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default FlowsListCard;
