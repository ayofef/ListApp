import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { StyledWrapper } from './styled';
import { P18B, P14 } from '../../../../components/atoms';
import THEME from '../../../../constants/theme';

const StyledSection = ({ title, description, children }) => {
  const isComponentDescription = typeof description === 'function';
  const Description = description;
  const { t } = useTranslation();

  return (
    <StyledWrapper>
      <Box>
        <P18B margin="0 0 12px 0">{t(title)}</P18B>
        {isComponentDescription ? (
          <Description />
        ) : (
          <P14 color={THEME.greyColors.grey1} lineHeight="24px">
            {t(description)}
          </P14>
        )}
      </Box>
      <Box>{children}</Box>
    </StyledWrapper>
  );
};

StyledSection.propTypes = {
  description: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  title: PropTypes.string.isRequired,
};

export default StyledSection;
