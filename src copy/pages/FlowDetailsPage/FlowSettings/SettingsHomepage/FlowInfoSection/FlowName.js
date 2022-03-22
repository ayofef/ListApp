import React, { useCallback } from 'react';

import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { InputField, P12 } from '../../../../../components/atoms';
import LoadingState from './LoadingState';
import { usePaymentFlowContext } from '../../../paymentFlowContext';

const FlowName = () => {
  const { t } = useTranslation();
  const { flow, loading, handleRename, newName, setNewName } = usePaymentFlowContext();

  const handleChange = useCallback((event) => setNewName(event.target.value), [setNewName]);

  const handleBlur = useCallback(() => {
    if (newName !== flow?.name) {
      handleRename();
    }
  }, [flow?.name, newName, handleRename]);

  return (
    <Box>
      <Box mb="8px">
        <P12 fontWeight="700">{t('Flow title')}</P12>
      </Box>
      {loading ? (
        <LoadingState />
      ) : (
        <InputField
          variant="outlined"
          onBlur={handleBlur}
          value={newName || ''}
          onChange={handleChange}
          name="flow-name"
          type="text"
          fullWidth
        />
      )}
    </Box>
  );
};

export default FlowName;
