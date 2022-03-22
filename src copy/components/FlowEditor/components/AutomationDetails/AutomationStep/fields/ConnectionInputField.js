import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NONE } from '../../../../../forms/_common/Select';
import RadioButtonsSection from '../sections/RadioButtonsSection';
import { useActionInputContext } from './ActionInputField/actionInputContext';
import LoadingState from '../../LoadingState';
import { selectTypes } from '../inputs/types';
import { useFlowEditorContext } from '../../../../context';
import useGetConnections from '../hooks/useGetConnections';
import { useFlatFlowProperties } from './useFlatFlowProperties';

const defaultPaymentGatewayOption = {
  value: '{{@default-gateway}}',
  title: 'Default Payment Gateway',
};

const ConnectionInputField = () => {
  const { t } = useTranslation();
  const { fieldValue, validationMessage, setInputField, fieldType } = useActionInputContext();
  const { topFlowId } = useFlowEditorContext();
  const { connected, loading, defaultValue } = useGetConnections({ topFlowId });
  const { getAvailableProperties, loading: availablePropertiesLoading } = useFlatFlowProperties([fieldType]);
  const [defaultProcessorProperty] = getAvailableProperties[0]?.properties ?? [];

  const paymentTriggerGatewayOption = useMemo(
    () =>
      defaultProcessorProperty
        ? {
            value: defaultProcessorProperty.key,
            title: defaultProcessorProperty.label,
          }
        : null,
    [defaultProcessorProperty]
  );

  const connectionOptions = useMemo(() => {
    const connectedProcessors = connected.map(({ id, name, company }) => ({
      value: id,
      title: name ?? company?.name,
      company,
    }));
    return paymentTriggerGatewayOption
      ? [defaultPaymentGatewayOption, paymentTriggerGatewayOption, ...connectedProcessors]
      : [defaultPaymentGatewayOption, ...connectedProcessors];
  }, [connected, paymentTriggerGatewayOption]);

  const onChange = ({ target }) => {
    setInputField(target.value);
  };

  return (
    <LoadingState height="200px" loading={loading || availablePropertiesLoading}>
      <RadioButtonsSection
        name="gateway"
        title={t('Payment Processor')}
        subTitle={t('Select which Payment Processor to send this transaction to')}
        options={connectionOptions}
        validationMessage={validationMessage}
        value={fieldValue || defaultValue || NONE}
        handleChange={onChange}
        selectType={selectTypes.connections}
        isSearchBar={true}
      />
    </LoadingState>
  );
};

ConnectionInputField.propTypes = {};

export default ConnectionInputField;
