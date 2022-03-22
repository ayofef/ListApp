import React from 'react';
import { useTranslation } from 'react-i18next';
import { P14 } from '../../../../../components/atoms';
import InfoBlockState from '../../Components/InfoBlockState';

const EmptyInfoBlock = () => {
  const { t } = useTranslation();
  return (
    <InfoBlockState>
      <P14>{t('No data yet.')}</P14>
    </InfoBlockState>
  );
};

export default EmptyInfoBlock;
