import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { H2 } from '../../../../components/atoms';
import ChevronRight from '../../../../assets/icons/ChevronRight';
import { StyledWrapper, StyledButton, StyledLeftItem, StyledRightItem } from './styled';
import { UI_ROUTES } from '../../../../constants/routes';
import DirectoryCTAIcon from '../../../../assets/icons/DirectoryCTA';

const TITLE = 'Browse more than 100+ automation templates.';

const BrowseAutomationTemplatesCta = () => {
  const { t } = useTranslation();
  return (
    <StyledWrapper as="div" $marginTop="40px">
      <StyledLeftItem>
        <H2 color="#fff" fontWeight="700" margin="0 0 12px 0">
          {t(TITLE)}
        </H2>
        <StyledButton component={Link} to={UI_ROUTES.automationsDirectory} variant="outlined" color="secondary">
          {t('Browse all templates')} <ChevronRight stroke="#fff" />
        </StyledButton>
      </StyledLeftItem>

      <StyledRightItem>
        <DirectoryCTAIcon />
      </StyledRightItem>
    </StyledWrapper>
  );
};

export default BrowseAutomationTemplatesCta;
