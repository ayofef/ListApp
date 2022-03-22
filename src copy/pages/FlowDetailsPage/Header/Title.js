import React, { useCallback } from 'react';
import { Box, capitalize } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIosRounded';
import { useHistory } from 'react-router-dom';

import EditableField from '../../ConnectionsPage/components/EditableField';
import { usePaymentFlowContext } from '../paymentFlowContext';
import LoadingState from './LoadingState';
import { StyledIconButton } from './styled';
import { UI_ROUTES } from '../../../constants/routes';

const Title = () => {
  const { loading, handleRename, newName, setNewName, handleFieldReset } = usePaymentFlowContext();
  const { push } = useHistory();

  const handleGoBack = useCallback(() => {
    push(UI_ROUTES.flows);
  }, [push]);

  return (
    <Box display="flex" alignItems="center">
      <Box borderRadius="8px" mr="16px" display="flex" alignItems="center" justifyContent="center">
        <StyledIconButton type="button" onClick={handleGoBack}>
          <ArrowBackIosIcon />
        </StyledIconButton>
      </Box>
      {loading ? (
        <LoadingState width="160px" />
      ) : (
        <Box>
          <EditableField
            updateValue={setNewName}
            value={capitalize(newName ?? '')}
            reset={handleFieldReset}
            submit={handleRename}
            defaultTransform="translateY(4px)"
            editingTransform="translateY(4px)"
          />
        </Box>
      )}
    </Box>
  );
};

export default Title;
