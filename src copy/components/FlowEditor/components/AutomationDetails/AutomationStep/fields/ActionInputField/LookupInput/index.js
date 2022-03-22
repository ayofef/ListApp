import React, { useCallback, useMemo } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useQuery } from '@apollo/client';
import { StyledFormControl } from '../../styled';
import { useActionInputContext } from '../actionInputContext';
import Select, { NONE } from '../../../../../../../forms/_common/Select';
import { GQL_Q_LOOKUP_ACTION_INPUT_SELECTION } from '../../../../../../../../utils/queries/flows/queries';
import { useElementDataToSave } from '../../hooks/useElementDataToSave';

const LookupInput = () => {
  const { fieldValue, fieldId, setInputField, validationMessage } = useActionInputContext();
  const [{ actionId, connectionId }] = useElementDataToSave();

  const { data, loading } = useQuery(GQL_Q_LOOKUP_ACTION_INPUT_SELECTION, {
    variables: {
      actionId,
      connectionId,
      inputId: fieldId,
    },
  });

  const lookupSelection = useMemo(() => {
    return data?.lookupActionInputSelection?.map((item) => {
      return {
        value: item.key,
        title: item.label,
      };
    });
  }, [data?.lookupActionInputSelection]);

  const onChange = useCallback(({ target }) => setInputField(target.value), [setInputField]);

  return (
    <StyledFormControl fullWidth error={!!validationMessage}>
      {loading && <Skeleton height="30px" animation="wave" />}
      {lookupSelection ? (
        <Select name="connection" value={fieldValue || NONE} options={lookupSelection} onChange={onChange} />
      ) : null}
      <FormHelperText>{validationMessage}</FormHelperText>
    </StyledFormControl>
  );
};

export default LookupInput;
