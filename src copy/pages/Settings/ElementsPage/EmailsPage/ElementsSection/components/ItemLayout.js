import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

const ItemLayout = ({ title, subTitle, children }) => (
  <Box display="flex" justifyContent="space-between" py="16px" borderBottom="1px solid #E6E9EC">
    <Box maxWidth="350px" mr="40px">
      <Box component="p" m="0" fontFamily="16px" fontWeight="600" lineHeight="20px">
        {title}
      </Box>

      <Box component="p" m="10px 0 0 " lineHeight="20px" color="#787F88">
        {subTitle}
      </Box>
    </Box>

    <Box maxWidth="70%" flexGrow="1">
      {children}
    </Box>
  </Box>
);

ItemLayout.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};

export default ItemLayout;
