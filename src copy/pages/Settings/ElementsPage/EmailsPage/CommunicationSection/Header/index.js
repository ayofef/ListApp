import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledWrapper } from './styled';
import { H3 } from '../../../../../../components/atoms';

const Header = () => {
  const { t } = useTranslation();

  return (
    <StyledWrapper>
      <H3 fontWeight="600">{t('Communication')}</H3>
    </StyledWrapper>
  );
};

export default Header;
