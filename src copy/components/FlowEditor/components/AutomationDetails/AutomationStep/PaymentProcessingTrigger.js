import React from 'react';
import { useTranslation } from 'react-i18next';
import InfoLinkSection from './sections/InfoLinkSection';
import FlowIdCopyToClipboard from './fields/FlowIdCopyToClipboard';
import JsonInputField from './fields/JsonInputField';

const PaymentProcessingTrigger = () => {
  const { t } = useTranslation();

  return (
    <>
      <FlowIdCopyToClipboard />
      <InfoLinkSection
        link="https://documentation.whenthen.com/intent"
        linkTitle={t('Learn about Intents')}
        title={t('Required Integrations')}
        subTitle={t(`Automations which instruct the processing of payments require integration with your systems 
        (e-commerce website, mobile app, etc.). Triggering the payment flow to start the processing of a payment 
        involves starting an intent or authorizing a new payment.`)}
      />
      <InfoLinkSection link="https://documentation.whenthen.com/instruct" linkTitle={t('Learn about payments')} />
      <JsonInputField />
    </>
  );
};

export default PaymentProcessingTrigger;
