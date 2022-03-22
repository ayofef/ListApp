import { useCallback, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';
import { NotificationManager } from 'react-notifications';
import { GQL_M_RENAME_FLOW } from '../../../utils/queries/flows/mutations';

import { TOAST_TITLE, TOAST_TIMEOUT } from './constant';

export const useRenameFlow = ({ setSaving, setFlow, flow }) => {
  const { t } = useTranslation();
  const [newName, setNewName] = useState('');
  const [renameFlow] = useMutation(GQL_M_RENAME_FLOW);

  const handleFieldReset = useCallback(() => {
    setNewName(flow?.name);
  }, [flow?.name]);

  useEffect(() => {
    setNewName(flow?.name);
  }, [setNewName, flow?.name]);

  const handleRename = useCallback(() => {
    if (flow?.name === newName) {
      return;
    }

    if (isEmpty(newName)) {
      NotificationManager.error(t('Flow name cannot be empty'), t(TOAST_TITLE), TOAST_TIMEOUT);
      setNewName(flow?.name);
      return;
    }
    setSaving(true);
    renameFlow({ variables: { flowId: flow?.id?.trim(), newName } })
      .then(({ data, errors }) => {
        if (!isEmpty(errors) || isEmpty(data?.renameFlow)) {
          NotificationManager.error(t(errors?.[0].message), t(TOAST_TITLE), TOAST_TIMEOUT);
          return;
        }

        setFlow({ ...flow, ...data.renameFlow });
        NotificationManager.success(t('Flow name renamed successfully'), t(TOAST_TITLE), TOAST_TIMEOUT);
      })
      .finally(() => setSaving(false));
  }, [renameFlow, newName, setSaving, setFlow, flow, t, setNewName]);
  return { handleRename, handleFieldReset, newName, setNewName };
};
