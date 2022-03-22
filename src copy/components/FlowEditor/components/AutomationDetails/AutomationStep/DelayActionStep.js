import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import WebhookGeneratedUrlField from './fields/WebhookGeneratedUrlField';
import RadioButtonsSection from './sections/RadioButtonsSection';
import { useElementDataToSave } from './fields/hooks/useElementDataToSave';
import { useValidationMessage } from './fields/hooks';
import Title from '../Title';
import SubTitle from '../SubTitle';
import InfoLinkSection from './sections/InfoLinkSection';
import DelayActionWebhookField from './fields/DelayActionWebhookField';

const DelayActionStep = () => {
  const { t } = useTranslation();
  const validationMessage = useValidationMessage('delay');
  const [{ delayTypes, selectedType }, updateDataToSave] = useElementDataToSave();
  const [selectedValue, setSelectedValue] = useState(() => selectedType);

  const options = useMemo(
    () =>
      delayTypes?.map((type) => ({
        value: type,
        title: type,
      })),
    [delayTypes]
  );

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    updateDataToSave({ selectedType: e.target.value });
  };

  return (
    <>
      <RadioButtonsSection
        name="matchType"
        title={t('Wait for')}
        subTitle={t('Delay the automation until one of the following occurs')}
        options={options}
        validationMessage={validationMessage}
        value={selectedValue}
        handleChange={handleChange}
        mb="40px"
      />
      {selectedValue === 'WEBHOOK' && (
        <>
          <Title>{t('Options')}</Title>
          <SubTitle>
            {t('When we receive this webhook trigger, we will initiate the next step of this automation')}
          </SubTitle>
          <WebhookGeneratedUrlField stepType="DELAY_ACTION" titleSize="12px" />
          <DelayActionWebhookField titleSize="12px" />
          <InfoLinkSection
            link="https://app.dev.whenthen.co/"
            linkTitle={t('See the list of available variables')}
            title={t('Variables')}
            subTitle={t('See developer docs to configure variables that can be included in your webhook call')}
            linkSubTitle={t('Provides solution to track')}
          />
        </>
      )}
      {selectedValue === 'API' && (
        <InfoLinkSection
          link="https://app.dev.whenthen.co/"
          linkTitle={t('Developer documentation')}
          title={t('Setup API')}
          subTitle={t('See developer docs to configure an API to proceed to the next step of this automation')}
          linkSubTitle={t('Provides solution to track')}
        />
      )}
    </>
  );
};

export default DelayActionStep;
