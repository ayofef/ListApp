import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BRAND } from '../utils/queries/brandCenter/brandCenterQueries';
import { useNotificationManager } from './useNotificationManager';

const useBrandedEmailData = () => {
  const { loading, data, error } = useQuery(GET_BRAND);

  const we = data?.we?.name;
  const brandInfo = data?.we?.brand;

  const logoHandler = useMemo(
    () => ({
      logoType: brandInfo?.templateConfig?.logoType,
      logoSize: brandInfo?.templateConfig?.logoSize,
      logoPosition: brandInfo?.templateConfig?.logoPosition,
      logoText: brandInfo?.templateConfig?.logoText,
      handleChange: () => {},
    }),
    [brandInfo]
  );

  useNotificationManager('error', error?.message, 'Fetch brand', 5000);

  return { loading, we, brandInfo, logoHandler };
};

export { useBrandedEmailData };
