import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as WarningIcon } from '../../../assets/img/WarningIcon.svg';
import { StyledWrapper } from './styled';

const EmptyState = () => {
  const { t } = useTranslation();

  return (
    <StyledWrapper>
      <div>
        <WarningIcon />

        <p>{t('No template available')}</p>
      </div>
    </StyledWrapper>
  );
};

export default EmptyState;
