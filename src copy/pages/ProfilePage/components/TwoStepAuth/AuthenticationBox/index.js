import React from 'react';
import { string, elementType, bool } from 'prop-types';
import { useTranslation } from 'react-i18next';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import { P14 } from '../../../../../components/atoms';
import { StyledContainer, IconContainer } from './styled';
import THEME from '../../../../../constants/theme';

const AuthenticationBox = ({ icon, text, enabled, getMeLoading }) => {
  const { t } = useTranslation();
  const Icon = icon;

  return (
    <StyledContainer display="flex">
      <IconContainer>
        <Icon />
      </IconContainer>

      <P14 fontWeight="600">{t(text)}</P14>
      <Box marginLeft="auto">
        {getMeLoading && <Skeleton height="30px" width="57px" animation="wave" />}
        {!getMeLoading && enabled && <P14 color={THEME.greyColors.grey1}>{t('Enabled')}</P14>}
      </Box>
    </StyledContainer>
  );
};

AuthenticationBox.propTypes = {
  icon: elementType.isRequired,
  text: string.isRequired,
  enabled: bool.isRequired,
  getMeLoading: bool.isRequired,
};

export default AuthenticationBox;
