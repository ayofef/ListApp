import { useEffect, useState, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { NotificationManager } from 'react-notifications';
import isEmpty from 'lodash/isEmpty';

import { useLocalStorage } from 'react-use';
import { GQL_M_IMPORT_HISTORIC_PAYMENT } from '../../../../../../utils/queries/connections/connectionsMutations';
import { GET_IMPORT_STATUS } from '../../../../../../utils/queries/connections/connectionsQueries';
import { isDefined } from '../../../../../../utils/helpers';
import { MAX_MOCK_PROGRESS, IMPORT_STATUS_DICTIONARY } from './constant';

const TIMEOUT_MS = 60000; // 1 minute
const TOAST_TITLE = 'Connection';
const TOAST_TIMEOUT = 5000;
const mutateOptions = (id) => ({
  refetchQueries: [{ query: GET_IMPORT_STATUS, variables: { id } }],
  awaitRefetchQueries: true,
});

/**
 * @typedef useHistoricPayment
 * @property {number} progress
 * @property {function} handleStartProgress
 * */

/**
 * @param {string} connectionId
 *
 * @returns
 * @returns {useHistoricPayment}
 * */

const useHistoricPayment = ({ connectionId }) => {
  const { t } = useTranslation();
  const [selectFlowDialog, setSelectFlowDialog] = useState(false);
  const toggleSelectFlowDialog = () => setSelectFlowDialog((prevState) => !prevState);
  const { data, loading: importStatusLoading, startPolling, stopPolling } = useQuery(GET_IMPORT_STATUS, {
    variables: { id: connectionId },
    skip: !connectionId,
  });

  const loading = importStatusLoading && isEmpty(data?.getImportConnectionPaymentsGateway);

  useEffect(() => {
    if (data?.getImportConnectionPaymentsGateway?.status === IMPORT_STATUS_DICTIONARY.importing) {
      startPolling(TIMEOUT_MS * 5); //5 minutes
    }
    return () => {
      stopPolling();
    };
  }, [data?.getImportConnectionPaymentsGateway?.status, startPolling, stopPolling]);

  const importStatus = useMemo(
    () => data?.getImportConnectionPaymentsGateway?.status ?? IMPORT_STATUS_DICTIONARY.default,
    [data?.getImportConnectionPaymentsGateway?.status]
  );

  const [importHistoricPayment, { loading: importHistoricPaymentLoading }] = useMutation(
    GQL_M_IMPORT_HISTORIC_PAYMENT,
    mutateOptions(connectionId)
  );
  const [progress, setProgress] = useLocalStorage(`importProgressBar:${connectionId}`, 0);

  const handleStartProgress = () => {
    setProgress(1);
  };

  useEffect(() => {
    if (progress && progress < MAX_MOCK_PROGRESS && importStatus !== IMPORT_STATUS_DICTIONARY.completed) {
      setTimeout(
        () =>
          setProgress((prevState) => {
            if (prevState < MAX_MOCK_PROGRESS) {
              return prevState + Math.floor(Math.random() * 3);
            }
            return prevState;
          }),
        TIMEOUT_MS
      );
    }
  }, [progress, setProgress, importStatus]);

  const handleHistoricPayment = ({ flowId }) => {
    importHistoricPayment({
      variables: { id: connectionId, flowId },
    })
      .then((res) => {
        if (res && !isEmpty(res?.errors)) {
          NotificationManager.error(t(res?.errors[0]?.message), TOAST_TITLE, TOAST_TIMEOUT);
          return;
        }

        if (isDefined(res?.data?.importConnectionPaymentsGateway?.id)) {
          handleStartProgress();
        } else {
          NotificationManager.error(t('Something went wrong'), TOAST_TITLE, TOAST_TIMEOUT);
        }
      })
      .finally(() => {
        toggleSelectFlowDialog();
      });
  };

  return {
    progress,
    selectFlowDialog,
    toggleSelectFlowDialog,
    handleHistoricPayment,
    importStatus,
    loading,
    importHistoricPaymentLoading,
  };
};

export { useHistoricPayment };
