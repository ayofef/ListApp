import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { UI_ROUTES } from '../../constants/routes';
import { P14, H4 } from '../atoms';

import { StyledButton } from './styled';

const GotoBrandCenter = ({ invert }) => {
  const { t } = useTranslation();
  return (
    <Box
      component="section"
      bgcolor={invert ? '#F5F6F7' : '#fff'}
      borderRadius="8px"
      p="24px "
      width="240px"
      boxSizing="border-box"
    >
      <H4>{t('Brand center')}</H4>
      <P14 margin="16px 0" color="#787F88">
        {t('Configure your companies brand. Add your logo, color scheme, social media and more.')}
      </P14>
      <Link to={UI_ROUTES.brandCenter}>
        <StyledButton type="button" variant="contained" color="secondary" invert={invert ? 1 : 0}>
          {t('Open brand center')}
        </StyledButton>
      </Link>
    </Box>
  );
};

GotoBrandCenter.propTypes = {
  invert: PropTypes.bool,
};
GotoBrandCenter.defaultProps = {
  invert: false,
};

export default GotoBrandCenter;
