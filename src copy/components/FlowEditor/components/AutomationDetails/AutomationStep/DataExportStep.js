import React, { useCallback, useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';
import Box from '@material-ui/core/Box';
import capitalize from '@material-ui/core/utils/capitalize';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useTranslation } from 'react-i18next';
import { useValidationMessage } from './fields/hooks';
import Title from '../Title';
import { StyledFormControl } from './fields/styled';
import Select, { NONE } from '../../../../forms/_common/Select';
import { useNotificationManager } from '../../../../../hooks/useNotificationManager';
import LoadingState from '../LoadingState';
import { useElementDataToSave } from './fields/hooks/useElementDataToSave';
import SubTitle from '../SubTitle';

const DataExportStep = () => {
  const { t } = useTranslation();
  const validationMessage = useValidationMessage('export');
  const [{ viewId }, updateDataToSave] = useElementDataToSave();
  const { loading, error, data } = useQuery(gql`
    query listPaymentViews {
      listPaymentViews {
        views {
          id
          name
        }
      }
    }
  `);

  const options = useMemo(() => data?.listPaymentViews?.views.map((view) => ({ value: view.id, title: view.name })), [
    data?.listPaymentViews?.views,
  ]);

  const onChange = useCallback(({ target: { value } }) => updateDataToSave({ viewId: value !== NONE ? value : null }), [
    updateDataToSave,
  ]);

  useNotificationManager('error', error?.message, 'Fetch Payment Views');

  return (
    <LoadingState loading={loading}>
      <Box>
        <SubTitle>
          {t('You can export a saved view from Insights. Customize a report to Export in Insights to export it here')}
        </SubTitle>
        <Title>{t('Select which report to export')}</Title>
        {options && (
          <StyledFormControl fullWidth error={Boolean(validationMessage)}>
            <Select value={viewId || NONE} options={options} onChange={onChange} />

            <FormHelperText>{capitalize(t(validationMessage) || '')}</FormHelperText>
          </StyledFormControl>
        )}
      </Box>
    </LoadingState>
  );
};

export default DataExportStep;
