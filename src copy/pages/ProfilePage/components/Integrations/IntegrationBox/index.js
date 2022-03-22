import React from 'react';
import { elementType, string, bool } from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { ButtonRounded, P14 } from '../../../../../components/atoms';
import { StyledContainer, IconContainer, StyledButton, LogOutContainer } from './styled';
import THEME from '../../../../../constants/theme';

const IntegrationBox = ({ icon, text, isConnected, email }) => {
  const { t } = useTranslation();

  const Icon = icon;

  return (
    <StyledContainer display="flex">
      <IconContainer>
        <Icon />
      </IconContainer>

      <div>
        <P14 fontWeight="600" color={THEME.primaryColors.black}>
          {text}
        </P14>
        <P14 fontWeight="normal" lineHeight="24px" color={THEME.greyColors.grey1}>{`Log in with ${text}`}</P14>
      </div>

      <Box marginLeft="auto">
        {isConnected ? (
          <LogOutContainer>
            <P14 fontWeight="normal" lineHeight="24px" color={THEME.greyColors.grey1}>
              {email}
            </P14>
            <StyledButton color="red">{t('Log Out')}</StyledButton>
          </LogOutContainer>
        ) : (
          <ButtonRounded color="primary">{t('Connect')}</ButtonRounded>
        )}
      </Box>
    </StyledContainer>
  );
};

IntegrationBox.propTypes = {
  icon: elementType.isRequired,
  text: string.isRequired,
  email: string.isRequired,
  isConnected: bool.isRequired,
};

export default IntegrationBox;
