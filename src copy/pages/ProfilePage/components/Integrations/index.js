import React from 'react';
import { string } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { TitleContainer, StyledSection, MainContainerWithBorder } from '../../styled';
import { L16B } from '../../../../components/atoms/Typography/L16B';
import IntegrationBox from './IntegrationBox';
import Google from '../../../../assets/icons/Profile/Google';
import Slack from '../../../../assets/icons/Profile/Slack';

/** hide this component until further notice for implementation **/
const INTEGRATIONS = [
  {
    id: 'google',
    icon: Google,
    text: 'Google',
    isConnected: false, // temporary placeholder
  },
  {
    id: 'slack',
    icon: Slack,
    text: 'Slack',
    isConnected: true, // temporary placeholder
  },
];

const Integrations = ({ email }) => {
  const { t } = useTranslation();

  return (
    <StyledSection>
      <TitleContainer>
        <L16B>{t('Integrations')}</L16B>
      </TitleContainer>
      <MainContainerWithBorder>
        {INTEGRATIONS.map(({ id, icon, text, isConnected }) => {
          return <IntegrationBox key={id} icon={icon} text={text} email={email} isConnected={isConnected} />;
        })}
      </MainContainerWithBorder>
    </StyledSection>
  );
};

Integrations.propTypes = {
  email: string.isRequired,
};
export default Integrations;
