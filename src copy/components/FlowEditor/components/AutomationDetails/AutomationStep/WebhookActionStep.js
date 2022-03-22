import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import WebhookActionField from './fields/WebhookActionField';
import WebhookHeadersField from './fields/WebhookHeadersField';
import WebhookGeneratedUrlField from './fields/WebhookGeneratedUrlField';
import Title from '../Title';
import SubTitle from '../SubTitle';

const WebhookActionStep = () => {
  const { t } = useTranslation();

  return (
    <>
      <Box>
        <Title>{t('Options')}</Title>
        <SubTitle>{t('Identify where WhenThen should send the webhook request')}</SubTitle>
      </Box>
      <WebhookGeneratedUrlField stepType="ACTION" titleSize="12px" />

      <WebhookActionField titleSize="12px" />

      <WebhookHeadersField />
    </>
  );
};

export default WebhookActionStep;
