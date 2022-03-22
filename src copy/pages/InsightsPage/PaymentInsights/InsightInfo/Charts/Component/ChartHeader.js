import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import { Box } from '@material-ui/core';
import { P } from '../../../../../../components/atoms';
import { FlexStart } from '../../../../../../components/atoms/flex/FlexStart';

const CommonStyledP = styled(P)`
  width: 100%;
  text-align: left;
`;

const Capitalized = styled(CommonStyledP)`
  text-transform: capitalize;
`;

const ChartHeader = ({ label, value }) => {
  return (
    <FlexStart width="100%">
      <Box>
        <CommonStyledP fontSize="14px" fontWeight={400} color="#787F88">
          {label}
        </CommonStyledP>
        <Capitalized margin="8px 0 21px" fontSize="20px" fontWeight={600} color="#232629">
          {value}
        </Capitalized>
      </Box>
    </FlexStart>
  );
};

ChartHeader.propTypes = {
  label: string.isRequired,
  value: string,
};

ChartHeader.defaultProps = {
  value: null,
};

export default ChartHeader;
