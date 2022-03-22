import React from 'react';
import Box from '@material-ui/core/Box';
import { StyledDetailsBox, StyledPaginationBox, StyledTableBox } from '../styled';
import LoadingState from './LoadingState';
import Pagination from '../../SmartTable/Pagination';
import { useFlowMonitorDetails } from './useFlowMonitorDetails';
import FlowMonitorDetailsHeader from './FlowMonitorDetailsHeader';
import useFilterHook from '../../../pages/InsightsPage/PaymentInsights/FilterBar/useFilterHook';
import FlowMonitorDetailsItem from './FlowMonitorDetailsItem';
import ErrorCrossIcon from '../../../assets/icons/FlowMonitor/ErrorCrossIcon';
import SuccessCheckmarkIcon from '../../../assets/icons/FlowMonitor/SuccessCheckmarkIcon';
import { StyledFlowInstancesListError } from './styled';
import { RANGE_DICTIONARY } from '../../../pages/InsightsPage/PaymentInsights/FilterBar/constant';

const FlowMonitorDetails = () => {
  const {
    loading,
    flowInstances,
    showPagination,
    pageInfo,
    selectedStatus,
    setSelectedStatus,
    setSelectedInstanceId,
  } = useFlowMonitorDetails();
  const { handlePresetFilter, handleDateRange, handleRangeType } = useFilterHook(RANGE_DICTIONARY.sevenDays);
  return (
    <StyledDetailsBox>
      <FlowMonitorDetailsHeader
        handlePresetFilter={handlePresetFilter}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        handleDateRange={handleDateRange}
        handleRangeType={handleRangeType}
      />
      <Box p="6px 24px">
        {loading ? (
          <LoadingState />
        ) : (
          <StyledTableBox>
            {flowInstances.map((instance) => (
              <FlowMonitorDetailsItem
                key={instance.id}
                errorMessage={
                  instance.errorMessage && (
                    <StyledFlowInstancesListError>
                      <span>{instance.stepWithErrorName}:</span>&nbsp;
                      {instance.errorMessage}
                    </StyledFlowInstancesListError>
                  )
                }
                isInErrorStatus={instance.isInErrorStatus}
                label={instance.date}
                onClick={() => setSelectedInstanceId(instance.id)}
              >
                <Box display="inline-flex" pr="12px">
                  {instance.isInErrorStatus ? <ErrorCrossIcon /> : <SuccessCheckmarkIcon />}
                </Box>
              </FlowMonitorDetailsItem>
            ))}
            {showPagination && (
              <StyledPaginationBox>
                <Pagination loading={loading} pageInfo={pageInfo} />
              </StyledPaginationBox>
            )}
          </StyledTableBox>
        )}
      </Box>
    </StyledDetailsBox>
  );
};

export default FlowMonitorDetails;
