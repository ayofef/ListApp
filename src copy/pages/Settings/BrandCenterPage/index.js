import React, { useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { omit } from 'lodash';
import { useQuery } from '@apollo/client';
import { saveGraphics } from './constants';
import { useBrandCenterMutation } from '../../../hooks/useBrandCenterMutation';
import { useNotificationManager } from '../../../hooks/useNotificationManager';
import { GET_BRAND } from '../../../utils/queries/brandCenter/brandCenterQueries';
import ErrorBoundary from '../../../utils/errorBoundary';
import BrandCenter from '../../../components/BrandCenter';
import BrandCenterSkeleton from './BrandCenterSkeleton';

const BrandCenterPage = () => {
  const { data, loading, error } = useQuery(GET_BRAND);
  const { mutateData } = useBrandCenterMutation();
  const { t } = useTranslation();

  const removeSocialTypename = useCallback(
    () => data?.we?.brand?.socialNetworks.map((el) => omit(el, ['__typename'])),
    [data]
  );

  useNotificationManager('error', error?.message, t('Brand Center'), 5000);

  const { graphics, masterTemplate } = useMemo(() => {
    const brand = data?.we?.brand;
    const templateConfig = brand?.templateConfig;

    return {
      graphics: {
        favicon: {
          name: 'favicon',
          contentType: brand?.faviconContentType,
          objectKey: brand?.faviconObjectKey,
        },
        logo: {
          name: 'logo',
          contentType: brand?.logoContentType,
          objectKey: brand?.logoObjectKey,
        },
      },
      masterTemplate: {
        signOffContent: templateConfig?.signOffContent,
        footerText: templateConfig?.footerText,
        logoConfig: {
          logoType: templateConfig?.logoType,
          logoPosition: templateConfig?.logoPosition,
          logoSize: templateConfig?.logoSize,
          logoText: templateConfig?.logoText,
        },
      },
    };
  }, [data?.we?.brand]);

  const handleButtonStyle = (e) => {
    mutateData({
      ...data?.we?.brand,
      actionButton: e.target.value,
      socialNetworks: removeSocialTypename(),
      ...graphics,
      ...masterTemplate,
    });
  };

  const handleAccentColor = (color) => {
    mutateData({
      ...data?.we?.brand,
      accentColor: color,
      socialNetworks: removeSocialTypename(),
      ...graphics,
      ...masterTemplate,
    });
  };

  const handleSocialEdit = (newArr) => {
    const filterType = () => newArr.map((el) => omit(el, ['__typename']));
    mutateData({
      ...data?.we?.brand,
      socialNetworks: filterType(),
      ...graphics,
      ...masterTemplate,
    });
  };

  const handleGraphics = ({ uploadUrl, objectKey }, file, type) => {
    const toS3 = { uploadUrl, objectKey, file, type };
    const toBackend = { data, mutateData, socialNetworks: removeSocialTypename() };

    saveGraphics(toS3, toBackend, masterTemplate);
  };

  const handleLogoConfig = ({ type, value }) => {
    mutateData({
      ...data?.we?.brand,
      socialNetworks: removeSocialTypename(),
      ...graphics,
      logoConfig: {
        ...masterTemplate.logoConfig,
        [type]: value.toUpperCase(),
      },
      footerText: masterTemplate.footerText,
      signOffContent: masterTemplate.signOffContent,
    });
  };
  const handleLogoText = (value) => {
    mutateData({
      ...data?.we?.brand,
      socialNetworks: removeSocialTypename(),
      ...graphics,
      logoConfig: {
        ...masterTemplate.logoConfig,
        logoText: value,
        logoType: 'TEXT',
      },
      footerText: masterTemplate.footerText,
      signOffContent: masterTemplate.signOffContent,
    });
  };
  const handleSaveFooterText = (parsedHTML) => {
    mutateData({
      ...data?.we?.brand,
      socialNetworks: removeSocialTypename(),
      ...graphics,
      logoConfig: {
        ...masterTemplate.logoConfig,
      },
      footerText: parsedHTML,
      signOffContent: masterTemplate.signOffContent,
    });
  };
  const handleSaveSignOffContent = (parsedHTML) => {
    mutateData({
      ...data?.we?.brand,
      socialNetworks: removeSocialTypename(),
      ...graphics,
      logoConfig: {
        ...masterTemplate.logoConfig,
      },
      footerText: masterTemplate.footerText,
      signOffContent: parsedHTML,
    });
  };

  return (
    <ErrorBoundary>
      {loading ? (
        <BrandCenterSkeleton />
      ) : (
        <BrandCenter
          data={data?.we?.brand}
          handleButtonStyle={handleButtonStyle}
          handleAccentColor={handleAccentColor}
          handleSocialEdit={handleSocialEdit}
          handleGraphics={handleGraphics}
          we={data?.we?.name}
          handleLogoConfig={handleLogoConfig}
          handleSaveFooterText={handleSaveFooterText}
          handleSaveSignOffContent={handleSaveSignOffContent}
          handleLogoText={handleLogoText}
        />
      )}
    </ErrorBoundary>
  );
};

export default BrandCenterPage;
