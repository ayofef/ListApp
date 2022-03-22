import React from 'react';
import { string } from 'prop-types';
import { Box } from '@material-ui/core';
import { StyledBox } from './styled';
import { L14M } from '../../../../../../../components/atoms';
import Check from '../../../../../../../assets/icons/Check';

const InstructFeature = ({ feature }) => {
  return (
    <StyledBox>
      <Box>
        <Check />
      </Box>
      <L14M color="#333" margin="0 0 0 12px" padding="8px 0">
        {feature}
      </L14M>
    </StyledBox>
  );
};

InstructFeature.propTypes = {
  feature: string.isRequired,
};

export default InstructFeature;
