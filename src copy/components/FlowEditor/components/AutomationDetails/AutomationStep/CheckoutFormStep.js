import React from 'react';
import { useTranslation } from 'react-i18next';
import InfoLinkSection from './sections/InfoLinkSection';

const CheckoutFormStep = () => {
  const { t } = useTranslation();

  return (
    <InfoLinkSection
      link="https://documentation.whenthen.com/instruct/checkout"
      linkTitle={t('Learn about checkout')}
      title={t('Documentation')}
      subTitle={t(`During the process of collecting payment information, users will often be presented with a checkout
      form. This step represents the point at which your website or app has presented the checkout form and is waiting
      for the user to complete the selected payment method checkout process. The payment flow will continue when the
      proper API calls submit the checkout details.`)}
    />
  );
};

export default CheckoutFormStep;
