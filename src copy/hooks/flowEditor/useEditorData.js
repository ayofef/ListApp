import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NotificationManager } from 'react-notifications';
import { facadeStepsToElements } from '../../components/FlowEditor/utils/facades';
import { GET_FLOW } from '../../utils/queries/flows/queries';

const getConfig = (getFlow) => getFlow?.draftConfig || getFlow?.config;

export const useEditorData = (flowId) => {
  const { t } = useTranslation();
  const { loading, errors, data, refetch } = useQuery(GET_FLOW, {
    variables: { id: flowId },
    fetchPolicy: 'no-cache',
    skip: !flowId,
  });
  const [result, setResult] = useState([]);

  const getFlow = data?.getFlow;
  const currentConfig = getConfig(getFlow);
  const isDataReady = Boolean(!loading && getFlow);
  const steps = currentConfig?.steps;
  const initialState = currentConfig?.initialState;
  const firstStepId = currentConfig?.firstStep?.id;
  const errorCount = getFlow?.errorCount;
  const flowInstanceCount = getFlow?.flowInstanceCount;

  useEffect(() => {
    if (isDataReady) {
      setResult(facadeStepsToElements(steps));
    }
  }, [isDataReady, steps]);

  useEffect(() => {
    if (!errors) return;

    NotificationManager.error(t('errors.errorFetchingData'), 'Oops..', 5000);
  }, [t, errors]);

  const publishedData = facadeStepsToElements(getFlow?.config?.steps);

  return {
    data: result,
    flowName: getFlow?.name ?? '',
    flowStatus: getFlow?.status ?? '',
    draftConfig: getFlow?.draftConfig ?? '',
    topFlowId: getFlow?.paymentFlowId ?? '',
    minimumPlanRequired: getFlow?.minimumPlanRequired ?? '',
    isInstruct: getFlow?.instruct,
    loading,
    isDataReady,
    initialState,
    publishedData,
    refetch,
    firstStepId,
    errorCount,
    flowInstanceCount,
  };
};
