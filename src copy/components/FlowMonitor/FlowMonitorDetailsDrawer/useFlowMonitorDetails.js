import isEmpty from 'lodash/isEmpty';
import { useCallback } from 'react';
import { useFlowEditorContext } from '../../FlowEditor/context';
import useSearch from '../../../hooks/useSearch';
import { FLOW_INSTANCE_STATUSES } from '../../FlowEditor/utils/flowInstanceStatus';

export const useFlowMonitorDetails = () => {
  const { flowInstances, loading, pageInfo, setSelectedInstanceId } = useFlowEditorContext();
  const [{ filter }, setSearchParams] = useSearch();
  const showPagination = !isEmpty(flowInstances) && pageInfo?.totalPages > 1;
  const selectedStatus = isEmpty(filter?.inStatus) ? FLOW_INSTANCE_STATUSES.ALL : filter?.inStatus;
  const setSelectedStatus = useCallback(
    (value) => {
      setSearchParams((prevState) => ({
        ...prevState,
        filter: {
          ...prevState.filter,
          inStatus: value === FLOW_INSTANCE_STATUSES.ALL ? value : [value],
        },
        page: 0,
      }));
    },
    [setSearchParams]
  );

  return {
    loading,
    setSelectedInstanceId,
    showPagination,
    selectedStatus,
    flowInstances,
    setSelectedStatus,
    pageInfo,
  };
};
