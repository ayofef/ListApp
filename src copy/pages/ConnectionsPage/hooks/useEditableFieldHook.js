import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NotificationManager } from 'react-notifications';
import isEmpty from 'lodash/isEmpty';
import { useUpdateConnectionData } from '../../../hooks/connectionsHooks';
import { TOAST_TIMEOUT } from '../../../constants/toasts';

const TITLE = 'Connections';
const EMPTY_NAME_ERROR_MESSAGE = 'Connection name cannot be empty';
const SERVER_ERROR_MESSAGE = 'Server error';

export const useEditableFieldHook = (connection) => {
  const { t } = useTranslation();
  const companyName = useMemo(() => connection?.name || connection?.company?.name, [connection]);
  const [nameText, setNameText] = useState(companyName || '');
  const { changeName } = useUpdateConnectionData(connection?.id);

  const handleFieldReset = () => {
    setNameText(companyName);
  };

  const handleSubmitName = () => {
    if (nameText.trim().length === 0) {
      setNameText(companyName);
      NotificationManager.error(t(EMPTY_NAME_ERROR_MESSAGE), t(TITLE), TOAST_TIMEOUT);

      return;
    }

    if (nameText !== connection?.name) {
      changeName({
        variables: {
          id: connection.id,
          name: nameText,
        },
      }).then((res) => {
        if (!isEmpty(res?.errors)) {
          NotificationManager.error(t(SERVER_ERROR_MESSAGE), t(TITLE), TOAST_TIMEOUT);
        }
      });
    }
  };

  return { nameText, setNameText, handleFieldReset, handleSubmitName };
};
