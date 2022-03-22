import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FlowName from './FlowName';
import FlowIdentifier from './FlowIdentifier';
import StyledSection from '../../components/StyledSection';
import { StyledDescription, StyledLearnMoreLink } from './styled';
import { UI_ROUTES } from '../../../../../constants/routes';

const TITLE = 'Flow info';
const DESC = 'Use the Flow ID value in our Checkout SDK. It will be sent in the paymentFlowId field.';

const SectionDescription = () => {
  const { t } = useTranslation();
  return (
    <StyledDescription>
      <span>{t(DESC)}</span>
      <Link to={UI_ROUTES.developers}>
        <StyledLearnMoreLink>{t('Learn more')}</StyledLearnMoreLink>
      </Link>
    </StyledDescription>
  );
};

const FlowInfoSection = () => {
  return (
    <StyledSection title={TITLE} description={SectionDescription}>
      <FlowName />
      <FlowIdentifier />
    </StyledSection>
  );
};

export default FlowInfoSection;
