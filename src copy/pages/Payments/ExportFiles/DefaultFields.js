import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

const DefaultFields = ({ columnSet }) => (
  <Box component="p" my="16px" fontSize="12px" color="#787F88">
    {columnSet
      .reduce((acc, column) => {
        if (column.isDefault) {
          return [...acc, column.label];
        }

        return acc;
      }, [])
      .join(', ')}
  </Box>
);

DefaultFields.propTypes = {
  columnSet: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string.isRequired, isDefault: PropTypes.bool.isRequired })
  ).isRequired,
};

export default DefaultFields;
