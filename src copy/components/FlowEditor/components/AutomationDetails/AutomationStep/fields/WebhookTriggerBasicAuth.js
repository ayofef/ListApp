import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import React from 'react';
import { Checkbox } from '../inputs';
import { P14 } from '../../../../../atoms';
import Title from '../../Title';
import WebhookBasicAuth from './WebhookBasicAuth';
import { useElementDataToSave } from './hooks/useElementDataToSave';

const WebhookTriggerBasicAuth = () => {
  const { t } = useTranslation();
  const [{ useBasicAuthentication }, updateDataToSave] = useElementDataToSave();

  const _onSelect = ({ target }) => {
    const { checked } = target;
    updateDataToSave({ useBasicAuthentication: checked });
  };

  return (
    <Box component="section">
      <Title>{t('Authentication')}</Title>

      <Box p="10.7px 18px" bgcolor="#f5f6f7" boxSizing="border-box" borderRadius="6px">
        <FormControl fullWidth>
          <Checkbox
            name="useBasicAuthentication"
            label={
              <Box display="flex" alignItems="center" ml={1}>
                <P14 color="#787F88">{t('Basic Auth')}</P14>
              </Box>
            }
            checked={useBasicAuthentication}
            onChange={_onSelect}
            wide={false}
          />
        </FormControl>

        {useBasicAuthentication && <WebhookBasicAuth />}
      </Box>
    </Box>
  );
};

export default WebhookTriggerBasicAuth;
