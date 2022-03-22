import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { useNotificationManager } from '../../../hooks/useNotificationManager';
import { TOAST_TITLE, TOAST_TIMEOUT, PAYMENT_PROCESSING_BASE_TEMPLATE } from './constant';
import { GET_AUTOMATION_TEMPLATES } from '../../../utils/queries/automation/queries';

const useGetAutomationTemplates = (skip) => {
  const { t } = useTranslation();
  const { data, loading, error } = useQuery(GET_AUTOMATION_TEMPLATES, {
    skip,
  });

  const availableTemplates = useMemo(() => data?.getAvailableFlowTemplates ?? [], [data?.getAvailableFlowTemplates]);

  const paymentProcessingBaseTemplate = data?.getAvailableFlowTemplates?.find(
    (template) => template.template?.id === PAYMENT_PROCESSING_BASE_TEMPLATE
  );

  const templates = useMemo(() => availableTemplates?.filter((template) => template.showOnWebApp) ?? [], [
    availableTemplates,
  ]);

  const recommendedTemplates = useMemo(() => availableTemplates?.filter((template) => template.recommended) ?? [], [
    availableTemplates,
  ]);

  useNotificationManager('error', t(error?.message), t(TOAST_TITLE), TOAST_TIMEOUT);

  return {
    loading,
    templates,
    recommendedTemplates,
    error,
    paymentProcessingBaseTemplate,
    availableTemplates,
  };
};

export { useGetAutomationTemplates };
