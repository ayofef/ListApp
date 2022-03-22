import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import capitalize from '@material-ui/core/utils/capitalize';
import { P16 } from '../../../../../components/atoms';
import { StyledBarSections } from './styled';

const StyledInPageSection = ({ title, children }) => {
  const { t } = useTranslation();

  return (
    <Box mb="40px">
      <P16 fontWeight="600" margin="0 0 20px 0">
        {capitalize(t(title) ?? '')}
      </P16>
      <StyledBarSections>{children}</StyledBarSections>
    </Box>
  );
};

StyledInPageSection.propTypes = {
  title: PropTypes.string.isRequired,
};

export default StyledInPageSection;
