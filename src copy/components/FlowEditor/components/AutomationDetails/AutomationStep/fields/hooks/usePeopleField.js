import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { useValidationMessage } from '.';
import { PEOPLE_PAGE } from '../../../../../../../utils/queries/billing';
import { useNotificationManager } from '../../../../../../../hooks/useNotificationManager';
import { useElementDataToSave } from './useElementDataToSave';

export const usePeopleField = (fieldName) => {
  const [elementDataToSave, updateDataToSave] = useElementDataToSave();
  const selectedOptionIds = elementDataToSave[fieldName];
  const { loading, error, data } = useQuery(PEOPLE_PAGE);
  const options = useMemo(() => data?.listUsers?.map(({ id, name, avatar }) => ({ title: name, value: id, avatar })), [
    data,
  ]);

  const onChange = (newValue) => updateDataToSave({ [fieldName]: newValue });

  const validationMessage = useValidationMessage(fieldName);

  useNotificationManager('error', error?.message, 'Fetch people');

  return { selectedOptionIds, options, onChange, validationMessage, loading };
};
