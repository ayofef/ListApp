import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import isEmpty from 'lodash/isEmpty';
import { P16 } from '../../../../../../../../components/atoms';
import AvailableItem from './AvailableItem';
import EmptyState from './EmptyState';

const AvailableSection = ({ availableConnections }) => {
  const { t } = useTranslation();

  return (
    <Box mt="40px">
      <P16 fontWeight="500">{t('Available')}</P16>
      <Box display="flex" mt="20px" flexWrap="wrap">
        {isEmpty(availableConnections) && <EmptyState />}
        {!isEmpty(availableConnections) &&
          availableConnections?.map((connection) => {
            return <AvailableItem key={connection?.id} connection={connection} />;
          })}
      </Box>
    </Box>
  );
};

AvailableSection.propTypes = {
  availableConnections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      company: PropTypes.shape({
        name: PropTypes.string,
        logo: PropTypes.string,
        categories: PropTypes.arrayOf(PropTypes.string),
      }),
    })
  ).isRequired,
};

export default AvailableSection;
