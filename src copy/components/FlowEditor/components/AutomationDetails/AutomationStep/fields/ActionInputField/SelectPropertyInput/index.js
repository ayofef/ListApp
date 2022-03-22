import React, { useCallback } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import FormHelperText from '@material-ui/core/FormHelperText';
import { string } from 'prop-types';
import { StyledFormControl } from '../../styled';
import { useFlatFlowProperties } from '../../useFlatFlowProperties';
import { useActionInputContext } from '../actionInputContext';
import Select, { NONE } from '../../../../../../../forms/_common/Select';

const SelectPropertyInput = ({ selectedActionType }) => {
  const { fieldValue, setInputField, validationMessage } = useActionInputContext();
  const { loading, flatProperties } = useFlatFlowProperties(selectedActionType ? [selectedActionType] : []);

  const onChange = useCallback(
    ({ target }) => {
      return setInputField(target.value);
    },
    [setInputField]
  );

  return (
    <StyledFormControl fullWidth error={!!validationMessage}>
      {loading && <Skeleton height="30px" animation="wave" />}
      {flatProperties ? (
        <Select name="connection" value={fieldValue || NONE} options={flatProperties} onChange={onChange} />
      ) : null}
      <FormHelperText>{validationMessage}</FormHelperText>
    </StyledFormControl>
  );
};

SelectPropertyInput.propTypes = {
  selectedActionType: string,
};

SelectPropertyInput.defaultProps = {
  selectedActionType: '',
};

export default SelectPropertyInput;
