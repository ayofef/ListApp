import React from 'react';
import WebhookGeneratedUrlField from './fields/WebhookGeneratedUrlField';
import WebhookBasicAuth from './fields/WebhookBasicAuth';
import JsonInputField from './fields/JsonInputField';

const WebhookTriggerStep = () => {
  return (
    <>
      <WebhookGeneratedUrlField stepType="TRIGGER" />

      <WebhookBasicAuth />

      <JsonInputField />
    </>
  );
};

export default WebhookTriggerStep;
