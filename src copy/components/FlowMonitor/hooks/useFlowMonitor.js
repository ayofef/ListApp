import { useCallback, useEffect, useMemo, useState } from 'react';
import { isEdge, isNode } from 'react-flow-renderer';
import isEmpty from 'lodash/isEmpty';
import { getLayoutedElements } from '../../FlowEditor/utils/layout';
import { nodeBaseStyles } from '../../FlowEditor/styled';
import { NODE_TYPE } from '../../FlowEditor/utils/nodeTypes';
import { useGetFlowInstances } from './useGetFlowInstances';
import { facadeStepsToElements } from '../../FlowEditor/utils/facades';
import useSearch from '../../../hooks/useSearch';
import { useBoolState } from '../../../hooks/useBoolState';
import { ROWS_PER_PAGE } from '../FlowMonitorDetailsDrawer/helpers';
import { getOrderDataFromSearchParamsSort } from '../../SortTable/helpers';
import { ALL_FLOW_INSTANCE_STATUSES, FLOW_INSTANCE_STATUSES } from '../../FlowEditor/utils/flowInstanceStatus';

export const useFlowMonitor = ({ flowId }) => {
  const [elements, setElements] = useState([]);
  const { toggle: onValidate, bool: isValidateOn } = useBoolState(true);
  const [isFlowMonitor, setIsFlowMonitor] = useState(true);
  const [isOpenFlowMonitorDetails, setIsOpenFlowMonitorDetails] = useState(true);
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [{ instanceId: selectedInstanceId, sort, page, filter }, setSearchParams] = useSearch();
  const selectedElement = elements.find(({ id }) => selectedElementId === id);
  const selectedElementData = selectedElement?.data;
  const { order, orderBy } = getOrderDataFromSearchParamsSort(sort);
  const options = {
    variables: {
      flowId,
      inStatus:
        filter?.inStatus === FLOW_INSTANCE_STATUSES.ALL || isEmpty(filter?.inStatus)
          ? ALL_FLOW_INSTANCE_STATUSES
          : filter?.inStatus,
      ...(!isEmpty(filter?.date?.gt) && { startDate: filter?.date?.gt }),
      ...(!isEmpty(filter?.date?.lt) && { endDate: filter?.date?.lt }),
      cursor: {
        page: page ? page - 1 : 0,
        max: ROWS_PER_PAGE,
        orderBy: orderBy ?? null,
        ...(orderBy && { orderBy }),
        ...(order && { asc: order === 'asc' }),
      },
    },
    skip: !flowId,
    fetchPolicy: 'no-cache',
  };

  const { flowInstances, pageInfo, loading, isDataReady } = useGetFlowInstances(options);
  const selectedFlowInstance = useMemo(() => flowInstances?.find((instance) => instance.id === selectedInstanceId), [
    flowInstances,
    selectedInstanceId,
  ]);

  const setSelectedInstanceId = useCallback(
    (id) => {
      setSearchParams((prevState) => ({ ...prevState, instanceId: id }));
    },
    [setSearchParams]
  );

  useEffect(() => {
    if (isDataReady && selectedInstanceId) {
      const steps = flowInstances?.find((step) => step?.id === selectedInstanceId)?.steps;
      const data = facadeStepsToElements(steps);
      if (data.find((el) => isNode(el) && !el.position)) {
        setElements(getLayoutedElements(data));
      } else {
        setElements(data);
      }
    } else if (!selectedInstanceId) {
      setElements([]);
    }
  }, [flowInstances, selectedInstanceId, loading, setSearchParams, isDataReady]);

  const reactFlowElements = useMemo(
    () =>
      elements?.map((element) => {
        if (isEdge(element)) {
          return { ...element, arrowHeadType: 'arrow' };
        }
        return {
          ...element,
          ...nodeBaseStyles,
          type: NODE_TYPE.basic,
        };
      }),
    [elements]
  );

  const context = useMemo(
    () => ({
      flowInstances,
      pageInfo,
      loading,
      isDataReady,
      elements,
      selectedElementId,
      selectedElement,
      selectedElementData,
      setSelectedElementId,
      reactFlowElements,
      isFlowMonitor,
      setIsFlowMonitor,
      isOpenFlowMonitorDetails,
      setIsOpenFlowMonitorDetails,
      selectedInstanceId,
      setSelectedInstanceId,
      onValidate,
      isValidateOn,
      selectedFlowInstance,
    }),
    [
      flowInstances,
      pageInfo,
      loading,
      isDataReady,
      elements,
      selectedElementId,
      selectedElement,
      selectedElementData,
      reactFlowElements,
      isFlowMonitor,
      setIsFlowMonitor,
      isOpenFlowMonitorDetails,
      setIsOpenFlowMonitorDetails,
      selectedInstanceId,
      setSelectedInstanceId,
      onValidate,
      isValidateOn,
      selectedFlowInstance,
    ]
  );

  return {
    context,
    flowInstances,
    pageInfo,
    loading,
    isDataReady,
    elements,
    selectedElementData,
    selectedElementId,
    setSelectedElementId,
    reactFlowElements,
    isFlowMonitor,
    setIsFlowMonitor,
    isOpenFlowMonitorDetails,
    setIsOpenFlowMonitorDetails,
    selectedInstanceId,
    setSelectedInstanceId,
    onValidate,
    isValidateOn,
  };
};
