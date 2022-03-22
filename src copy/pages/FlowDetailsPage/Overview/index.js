import React from 'react';
import Box from '@material-ui/core/Box';
import isEmpty from 'lodash/isEmpty';
import Skeleton from '@material-ui/lab/Skeleton';
import { useWindowSize } from 'react-use';
import CardStages from './CardStages';
import Statistics from './Statistics';
import EmptyState from './EmptyState';
import { H1 } from '../../../components/atoms';
import { usePaymentFlowContext } from '../paymentFlowContext';
import Documentation from './Documentation';

const Overview = () => {
  const { connectedProcessors, newName, loading } = usePaymentFlowContext();
  const { width } = useWindowSize();

  return (
    <>
      <Box mb="40px" alignSelf="flex-start">
        <H1>{newName}</H1>
      </Box>
      {loading ? (
        <Box display="flex" width="100%">
          <Box borderRadius="4px" overflow="hidden" flex={1} mr="32px">
            <Skeleton variant="rect" height="400px" animation="wave" />
          </Box>
          <Box borderRadius="4px" overflow="hidden" flex={1}>
            <Skeleton variant="rect" height="400px" animation="wave" />
          </Box>
        </Box>
      ) : (
        <Box position="relative">
          {!loading && isEmpty(connectedProcessors) && <EmptyState />}
          <Box width="100%">
            <Box display="flex" flexDirection={width < 1200 ? 'column' : 'row'}>
              <Box flex={1} pr={width < 1200 ? 0 : '16px'} mb={width < 1200 ? '32px' : '0'}>
                <CardStages />
                <Documentation />
              </Box>
              <Box flex={1} pl={width < 1200 ? 0 : '16px'}>
                <Statistics />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Overview;
