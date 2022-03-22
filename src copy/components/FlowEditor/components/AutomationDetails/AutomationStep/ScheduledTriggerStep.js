import Box from '@material-ui/core/Box';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import Title from '../Title';
import { useElementDataToSave } from './fields/hooks/useElementDataToSave';
import CronInput from '../../../../CronGenerator/CronInput';

const DEFAULT_VALUE = '* * * * *';

const Fallback = () => (
  <Box display="flex" justifyContent="center">
    <CircularProgress size={24} />
  </Box>
);

const ScheduledTriggerStep = () => {
  const [elementDataToSave, updateDataToSave] = useElementDataToSave();
  const { t } = useTranslation();
  const [value, setValue] = useState(() => elementDataToSave?.cron ?? DEFAULT_VALUE);

  const setCron = useCallback(
    (text) => {
      setValue(text);
      updateDataToSave({ ...elementDataToSave, cron: text });
    },
    [updateDataToSave, elementDataToSave]
  );

  const [error, onError] = useState();

  return (
    <Box component="section">
      <Title>{t('Schedule')}</Title>

      <Box display="flex" alignItems="center" my="16px">
        <Box mt="16px" width="100%">
          <React.Suspense fallback={<Fallback />}>
            <CronInput value={value} onChange={setCron} onError={onError} />
          </React.Suspense>
        </Box>
      </Box>
      {error && <Alert severity="error">{error.description}</Alert>}
    </Box>
  );
};

export default ScheduledTriggerStep;
