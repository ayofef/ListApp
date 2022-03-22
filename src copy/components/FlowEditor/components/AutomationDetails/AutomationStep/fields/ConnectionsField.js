import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import THEME from '../../../../../../constants/theme';
import Title from '../../Title';
import { useValidationMessage } from './hooks';
import { SearchBar } from '../../../../../atoms';
import { useElementDataToSave } from './hooks/useElementDataToSave';
import MultiSelectSection from '../sections/MultiSelectSection';
import { useFlowEditorContext } from '../../../../context';
import useGetConnections from '../hooks/useGetConnections';
import AddNewConnectionButton from '../../../AddNewConnectionButton';

const ConnectionsField = () => {
  const { t } = useTranslation();
  // do not destructure elementDataToSave
  const [elementDataToSave, updateDataToSave] = useElementDataToSave();
  const { topFlowId } = useFlowEditorContext();
  const { connected, loading } = useGetConnections({ topFlowId });
  const [search, setSearch] = useState('');

  const onChangeConnection = (_connectionIds) => {
    updateDataToSave({ connectionIds: _connectionIds, connectionType: null });
  };

  const connectionOptions = useMemo(() => {
    return connected?.map(({ id, name, company }) => ({
      value: id,
      title: name ?? company?.name,
      company,
    }));
  }, [connected]);

  const validationMessage = useValidationMessage('connectionIds');

  return (
    <Box component="section">
      <Title>{t('Connections')}</Title>
      {loading || connectionOptions?.length ? (
        <>
          <Box mb={3}>
            <SearchBar search={search} setSearch={setSearch} />
          </Box>
          <MultiSelectSection
            options={connectionOptions}
            selectedOptionIds={elementDataToSave?.connectionIds}
            validationMessage={validationMessage}
            handleChange={onChangeConnection}
            loading={loading}
            selectType="connections"
            showEmptyState
            selectAll
          />
        </>
      ) : (
        <AddNewConnectionButton
          connectionTypes={['PAYMENT_GATEWAY']}
          btnHeight="48px"
          mr="10px"
          ml="10px"
          iconSize="24px"
          fontSize="12px"
          border={`1px solid ${THEME.primaryColors.primaryLight}`}
          borderRadius="8px"
          mt="8px"
        />
      )}
    </Box>
  );
};

export default ConnectionsField;
