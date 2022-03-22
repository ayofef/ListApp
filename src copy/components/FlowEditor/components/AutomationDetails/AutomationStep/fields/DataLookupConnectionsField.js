import React, { useMemo } from 'react';
import Box from '@material-ui/core/Box';
import { useQuery } from '@apollo/client';
import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';
import { useValidationMessage } from './hooks';
import { CircleImage, P14 } from '../../../../../atoms';
import { GQL_Q_GET_SUPPORTED_CONNECTION_TYPES } from '../../../../../../utils/queries/flows/queries';
import { useElementDataToSave } from './hooks/useElementDataToSave';
import MultiSelectSection from '../sections/MultiSelectSection';
import { useFlowEditorContext } from '../../../../context';
import useGetConnections from '../hooks/useGetConnections';

export const getConnectionOptions = (connections, search) =>
  compact(connections?.filter((step) => !search.toLowerCase() || step?.name?.toLowerCase().search(search) >= 0)).map(
    ({ id, company, name }) => ({
      value: id,
      title: (
        <Box display="flex" alignItems="center" ml={1}>
          {company?.logo && (
            <Box mr={1} display="flex" alignContent="center">
              <CircleImage src={company.logo} size={28} />
            </Box>
          )}
          <P14 color="#787F88">{name}</P14>
        </Box>
      ),
    })
  );

const ConnectionsField = () => {
  const { t } = useTranslation();
  const [{ connectionIds, searchForType }, updateDataToSave] = useElementDataToSave();
  const { topFlowId } = useFlowEditorContext();

  const { connected, loading } = useGetConnections({ topFlowId });

  const { data: typesData, loading: typesDataLoading } = useQuery(GQL_Q_GET_SUPPORTED_CONNECTION_TYPES, {
    variables: {
      dataTypes: searchForType,
    },
    skip: !searchForType,
    context: { skipGlobalHandling: true },
  });

  const onChangeConnection = (_connectionIds) => {
    updateDataToSave({ connectionIds: _connectionIds, connectionType: null });
  };

  const connectionOptions = useMemo(() => {
    return connected.map(({ id, name, company }) => ({
      value: id,
      title: name ?? company?.name,
      company,
    }));
  }, [connected]);

  const validationMessage = useValidationMessage('connectionIds');

  if (searchForType && !typesDataLoading && isEmpty(typesData)) {
    return null;
  }

  return (
    <MultiSelectSection
      title={t('Connections')}
      options={connectionOptions}
      validationMessage={validationMessage}
      handleChange={onChangeConnection}
      selectedOptionIds={connectionIds}
      selectType="connections"
      loading={loading}
      isSearchBar
      selectAll
    />
  );
};

export default ConnectionsField;
