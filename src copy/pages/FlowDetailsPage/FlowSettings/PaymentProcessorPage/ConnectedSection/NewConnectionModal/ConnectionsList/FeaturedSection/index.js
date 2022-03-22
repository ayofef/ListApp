import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { P16 } from '../../../../../../../../components/atoms';
import FeaturedItem from './FeaturedItem';

const FeaturedSection = ({ featuredConnections }) => {
  const { t } = useTranslation();

  return (
    <Box>
      <P16 fontWeight="500">{t('Featured')}</P16>
      <Box display="flex" mt="20px">
        {featuredConnections?.map((connection) => {
          return <FeaturedItem key={`featured-${connection?.id}`} connection={connection} />;
        })}
      </Box>
    </Box>
  );
};

FeaturedSection.propTypes = {
  featuredConnections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      company: PropTypes.shape({
        name: PropTypes.string,
        logo: PropTypes.string,
        categories: PropTypes.arrayOf(PropTypes.string),
      }),
    })
  ).isRequired,
};

export default FeaturedSection;
