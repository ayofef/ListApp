import { useMemo } from 'react';
import { useQuery } from '@apollo/client';

import { GQL_Q_GET_AVAILABLE_PROPERTIES } from '../utils/queries/properties/editorPropertiesQueries';
import { useNotificationManager } from './useNotificationManager';

/**
 * @param {Object?} context
 * @param matchingTypes
 * @param fetchPolicy
 * @param {string?} context.flowId
 * @param {string?} context.stepId
 * */
const useGetEditorProperties = (context = {}, matchingTypes = [], fetchPolicy = 'cache-first') => {
  const result = useQuery(GQL_Q_GET_AVAILABLE_PROPERTIES, { variables: { context, matchingTypes }, fetchPolicy });
  const getAvailableProperties = useMemo(() => result?.data?.getAvailableProperties ?? [], [result.data]);

  useNotificationManager('error', result?.error?.message, 'Fetch property list', 5000);

  return { getAvailableProperties, ...result };
};

export { useGetEditorProperties };
