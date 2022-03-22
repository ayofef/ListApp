import React from 'react';
import Box from '@material-ui/core/Box';
import DNSItem from './DNSItem';
import SMTPItem from './SMTPItem';

const ElementsSection = () => {
  return (
    <Box>
      <Box>
        <DNSItem />
        <SMTPItem />
      </Box>
    </Box>
  );
};

export default ElementsSection;
