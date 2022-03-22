import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';

import { H4, P14, ButtonRounded } from '../atoms';

const BrandCenterSection = ({ section, children, button, tabIndex, minHeight }) => {
  const { t } = useTranslation();
  return (
    <Box display="flex" flexWrap="nowrap" p="32px 0" tabIndex={tabIndex} {...(minHeight && { minHeight })}>
      <Box flex="0 0 400px" width="400px" mb="32px">
        <H4>{t(section.title)}</H4>
        <P14 color="#787F88" padding="16px 0" maxWidth="230px">
          {t(section.description)}
        </P14>
        {button && (
          <ButtonRounded type="button" variant="contained" color="secondary" onClick={button?.action}>
            {t(`${button?.title}`)}
          </ButtonRounded>
        )}
      </Box>
      {children}
    </Box>
  );
};

BrandCenterSection.propTypes = {
  section: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  children: PropTypes.node.isRequired,
  button: PropTypes.shape({
    title: PropTypes.string,
    action: PropTypes.func,
  }),
  tabIndex: PropTypes.string,
  minHeight: PropTypes.string,
};
BrandCenterSection.defaultProps = {
  button: null,
  tabIndex: '',
  minHeight: '',
};

export default BrandCenterSection;
