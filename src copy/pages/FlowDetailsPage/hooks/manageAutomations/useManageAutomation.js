import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { NotificationManager } from 'react-notifications';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';

import {
  GQL_M_DISABLE_FLOW,
  GQL_M_PUBLISH_CONFIGURATION,
  DELETE_FLOW,
  GQL_M_ARCHIVE_FLOW,
  GQL_M_UNPUBLISH_FLOW,
  GQL_M_DISCARD_FLOW_CHANGES,
} from '../../../../utils/queries/flows/mutations';
import { usePaymentFlowContext } from '../../paymentFlowContext';
import { TOAST_TITLE, TOAST_TIMEOUT } from '../constant';
import { isDefined } from '../../../../utils/helpers';
import { EXCEPTION_DICTIONARY } from '../../constant';

const ACTION_TYPE_DICTIONARY = { flow: 'flow' };

const OPTION_KEYS = {
  deactivate: 'disableFlow',
  activate: 'publishConfiguration',
  delete: 'deleteFlow',
  archive: 'archiveFlow',
  unpublish: 'unpublishFlow',
  discardChanges: 'discardFlow',
};

const MUTATION_MAP = {
  [OPTION_KEYS.deactivate]: GQL_M_DISABLE_FLOW,
  [OPTION_KEYS.activate]: GQL_M_PUBLISH_CONFIGURATION,
  [OPTION_KEYS.delete]: DELETE_FLOW,
  [OPTION_KEYS.archive]: GQL_M_ARCHIVE_FLOW,
  [OPTION_KEYS.unpublish]: GQL_M_UNPUBLISH_FLOW,
  [OPTION_KEYS.discardChanges]: GQL_M_DISCARD_FLOW_CHANGES,
};

const TOAST_KEY_MAP = {
  [OPTION_KEYS.deactivate]: { default: 'deactivated' },
  [OPTION_KEYS.activate]: { default: 'activated', [ACTION_TYPE_DICTIONARY.flow]: 'published' },
  [OPTION_KEYS.delete]: { default: 'deleted' },
  [OPTION_KEYS.archive]: { default: 'deleted' },
  [OPTION_KEYS.unpublish]: { default: 'unpublished' },
  [OPTION_KEYS.discardChanges]: { default: 'discard changes in' },
};

const useManageAutomation = (key) => {
  const [operationFn, { loading: _loading }] = useMutation(MUTATION_MAP[key], {
    context: { skipGlobalHandling: true },
  });
  const { setSaving, refetch, setFlow, flow, refetchLoading } = usePaymentFlowContext();
  const loading = _loading || refetchLoading;

  const { t } = useTranslation();

  const handleOperation = useCallback(
    async ({ id, automationName, callback, type, checkSuccess = false, skipSuccessToast = false }) => {
      setSaving(true);
      let success = false;

      try {
        const res = await operationFn({
          variables: {
            flowId: id,
          },
        });

        if (isDefined(res?.data?.[key]?.id)) {
          const toastKeyValue = TOAST_KEY_MAP[key]?.[type] ?? TOAST_KEY_MAP[key].default;
          const name = type === ACTION_TYPE_DICTIONARY.flow ? flow?.name : automationName;

          const successMessage = `Successfully ${toastKeyValue} ${name}`;
          const refetchData = await refetch();

          if (!isEmpty(refetchData?.data?.getPaymentFlow)) {
            setFlow(refetchData?.data?.getPaymentFlow);
          }
          success = true;

          if (!skipSuccessToast) {
            NotificationManager.success(t(successMessage), t(TOAST_TITLE), TOAST_TIMEOUT);
          }

          return;
        }

        if (!isEmpty(res?.errors)) {
          const translatedError = EXCEPTION_DICTIONARY[res?.errors?.[0]?.message];

          if (!isEmpty(translatedError)) {
            NotificationManager.error(t(translatedError), t(TOAST_TITLE), TOAST_TIMEOUT);
            return;
          }

          NotificationManager.error(t(res?.errors[0]?.message), t(TOAST_TITLE), TOAST_TIMEOUT);
          return;
        }

        NotificationManager.error(t('uiMessages.error'), t(TOAST_TITLE), TOAST_TIMEOUT);
      } catch (e) {
        NotificationManager.error(t('uiMessages.error'), t(TOAST_TITLE), TOAST_TIMEOUT);
      } finally {
        setSaving(false);

        /**Call the callback regardless of the operation outcome */
        if (typeof callback === 'function' && !checkSuccess) {
          callback();
        }

        /**Call the callback only if the operation succeeds */
        if (typeof callback === 'function' && checkSuccess && success) {
          callback();
        }
      }
    },
    [t, operationFn, setSaving, refetch, setFlow, key, flow?.name]
  );

  return [handleOperation, loading];
};

const useDeactivateAutomation = () => useManageAutomation(OPTION_KEYS.deactivate);
const useActivateAutomation = () => useManageAutomation(OPTION_KEYS.activate);
const useDeleteAutomation = () => useManageAutomation(OPTION_KEYS.delete);
const useArchiveAutomation = () => useManageAutomation(OPTION_KEYS.archive);
const useUnpublishFlow = () => useManageAutomation(OPTION_KEYS.unpublish);
const useDiscardChangesFlow = () => useManageAutomation(OPTION_KEYS.discardChanges);

export {
  useDeactivateAutomation,
  useActivateAutomation,
  useDeleteAutomation,
  useArchiveAutomation,
  useUnpublishFlow,
  useDiscardChangesFlow,
  ACTION_TYPE_DICTIONARY,
};
