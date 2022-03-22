import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';

import { useNotificationManager } from '../../../../../hooks/useNotificationManager';
import Communication from '../../../../../components/Communication';
import { GET_AVAILABLE_TEMPLATES } from '../../../../../utils/queries/communication/communicationQueries';
// import { useGetEditorProperties } from '../../../../../hooks/useGetEditorProperties';
import ErrorBoundary from '../../../../../utils/errorBoundary';
import Skeleton from './Skeleton';

const CommunicationSection = () => {
  const { data, loading: templateLoading, error } = useQuery(GET_AVAILABLE_TEMPLATES);
  // const { getAvailableProperties, loading: propertyLoading } = useGetEditorProperties();
  const { t } = useTranslation();
  useNotificationManager('error', error?.message, t('Brand Center'), 5000);

  const loading = templateLoading;

  return (
    <ErrorBoundary>
      {loading && <Skeleton />}
      {!loading && !error && (
        <Communication
          brandInfo={data?.we?.brand}
          we={data?.we?.name}
          templates={data.getTemplates}
          // editorProperties={getAvailableProperties}
        />
      )}
    </ErrorBoundary>
  );
};

export default CommunicationSection;
