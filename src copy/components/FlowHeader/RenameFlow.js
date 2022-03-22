import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { string } from 'prop-types';
import { useFlowEditorContext } from '../FlowEditor/context';
import { useBoolState } from '../../hooks/useBoolState';
import { GQL_M_RENAME_FLOW } from '../../utils/queries/flows/mutations';
import EditableField from '../../pages/ConnectionsPage/components/EditableField';

const RenameFlow = ({ fontSize }) => {
  const { flowId, flowName: originalFlowName, refetch } = useFlowEditorContext();
  const { on: starRename, off: stopRename } = useBoolState();

  const [flowName, setFlowName] = useState('');
  //todo loading indicator
  const [renameFlow] = useMutation(GQL_M_RENAME_FLOW);

  useEffect(() => {
    if (originalFlowName) {
      setFlowName(originalFlowName);
    }
  }, [originalFlowName]);

  const onChangeFlowName = (value) => {
    setFlowName(value);
  };

  const submit = async () => {
    if (flowName === originalFlowName) return;
    if (!flowName?.trim()) {
      setFlowName(originalFlowName);
      return;
    }
    starRename();
    await renameFlow({
      variables: {
        flowId,
        newName: flowName,
      },
    });
    await refetch();
    stopRename();
  };

  return (
    <EditableField
      margin="0"
      updateValue={onChangeFlowName}
      value={flowName}
      reset={() => setFlowName(originalFlowName)}
      submit={submit}
      fontSize={fontSize}
    />
  );
};

RenameFlow.propTypes = {
  fontSize: string,
};

RenameFlow.defaultProps = {
  fontSize: '16px',
};

export { RenameFlow };
