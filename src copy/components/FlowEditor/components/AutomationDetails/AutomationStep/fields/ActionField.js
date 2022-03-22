import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { FormHelperText } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import Select, { NONE } from '../../../../../forms/_common/Select';
import Title from '../../Title';
import { StyledFormControl } from './styled';
import { useValidationMessage, useValidationMessages } from './hooks';

import ActionInputField from './ActionInputField';
import { useElementDataToSave } from './hooks/useElementDataToSave';
import SubTitle from '../../SubTitle';
import { GQL_Q_GET_ACTION_FOR } from '../../../../../../utils/queries/flows/queries';
import { useFlowEditorContext } from '../../../../context';
import LoadingState from '../../LoadingState';
import { ButtonRounded } from '../../../../../atoms';
import { useHandleConnection } from '../../../../../../pages/FlowDetailsPage/FlowSettings/PaymentProcessorPage/ConnectedSection/NewConnectionModal/useHandleConnection';
import { useListConnections } from '../../../../../../pages/FlowDetailsPage/FlowSettings/hooks/useListConnections';

const DESC_MAP = {
  'Payment Action': 'Choose what payment action to send to your Payment Processor',
  'Mandrill Actions':
    'Select what action you want Mandrill to take. You can browser and configure email templates from your Settings',
};

const selectHeading = (name) => {
  switch (true) {
    case name.includes('Payment Action'):
      return DESC_MAP['Payment Action'];
    case name.includes('Mandrill'):
      return DESC_MAP['Mandrill Actions'];
    default:
      return null;
  }
};

const listConnectionsStatuses = ['CONNECTED'];
const ActionField = () => {
  const { t } = useTranslation();
  const validationMessage = useValidationMessage('actionId');
  const validationMessages = useValidationMessages('inputMappings');
  const { selectedInputs, setSelectedInputs, stepLibraryRefetch } = useFlowEditorContext();
  const [
    { __typename: typename, actionId, dataType, connectionId, name, originConnectionId, connectionLabel },
    updateDataToSave,
  ] = useElementDataToSave();
  const { availableConnections, refetch: refetchConnections } = useListConnections({
    status: listConnectionsStatuses,
  });

  const originConnection = availableConnections?.find((connection) => connection?.origin === originConnectionId);

  useEffect(() => {
    if (!connectionId && availableConnections?.id) {
      updateDataToSave({ connectionId: availableConnections.id });
    }
  }, [availableConnections.id, connectionId, updateDataToSave]);

  const onSuccess = async (id) => {
    updateDataToSave({ connectionId: id });
    stepLibraryRefetch();
    await refetchConnections();
  };

  const { handleConnect, renderConnectionForm } = useHandleConnection({
    connection: { id: originConnectionId, name: connectionLabel?.replace('Connect ', '') },
    closeModal: onSuccess,
  });

  const variables = useMemo(
    () => (typename === 'DataConnectionActionStep' ? { id: connectionId || originConnection?.id } : { dataType }),
    [typename, connectionId, originConnection?.id, dataType]
  );
  const { data, loading: dataLoading } = useQuery(GQL_Q_GET_ACTION_FOR, { variables, fetchPolicy: 'no-cache' });
  const actions = useMemo(() => data?.getActionsFor?.actions, [data]);
  const { actionsMap, actionOptions } = useMemo(() => {
    const initialResult = { actionsMap: {}, actionOptions: [] };
    if (!Array.isArray(actions)) {
      return initialResult;
    }
    return actions.reduce((acc, action) => {
      const id = action?.id;
      if (!id || acc.actionsMap[id]) {
        return acc;
      }
      acc.actionsMap[id] = action;
      acc.actionOptions.push({
        value: id,
        title: action.name,
      });
      return acc;
    }, initialResult);
  }, [actions]);

  const selectedActionType = useMemo(() => actionsMap[actionId]?.forDataType || '', [actionsMap, actionId]);

  const onChange = useCallback(
    ({ target }) => {
      updateDataToSave({ actionId: target.value });
    },
    [updateDataToSave]
  );

  const connectSlack = () => {
    handleConnect();
  };

  useEffect(() => {
    setSelectedInputs(actionsMap[actionId]?.inputs);
  }, [actionId, actionsMap, selectedInputs, setSelectedInputs]);

  return (
    <LoadingState loading={dataLoading}>
      {renderConnectionForm()}
      {!originConnection && originConnectionId ? (
        <Box component="section" marginTop="16px">
          <ButtonRounded type="button" variant="contained" color="primary" fullWidth onClick={connectSlack}>
            {connectionLabel}
          </ButtonRounded>
        </Box>
      ) : (
        <>
          <Box component="section">
            <Title>{t('Action')}</Title>
            <SubTitle>{t(selectHeading(name) ?? 'Select what action you want to take')}</SubTitle>
            <StyledFormControl fullWidth error={Boolean(validationMessage)}>
              <Select name="action" value={actionId || NONE} options={actionOptions} onChange={onChange} />
              <FormHelperText>{validationMessage}</FormHelperText>
            </StyledFormControl>
          </Box>
          {selectedInputs?.map(({ id, name: fieldName, __typename, type, required, placeholder, tooltip }, index) => (
            <ActionInputField
              key={id}
              fieldId={id}
              fieldName={fieldName}
              fieldType={type}
              placeholder={placeholder}
              subTitle={tooltip}
              required={required}
              validationMessage={validationMessages[index] || validationMessages[id]}
              selectedActionType={selectedActionType}
            />
          ))}
        </>
      )}
    </LoadingState>
  );
};

export default ActionField;
