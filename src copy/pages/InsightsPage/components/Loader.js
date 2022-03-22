import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { AbsoluteBlock } from '../../../components/atoms';
import SPIN_IMG from '../../../assets/img/Spinner.png';
import { StyledImage } from './styled';

const Spinner = ({ top, padding }) => {
  return (
    <AbsoluteBlock backgroundColor="#fff" width="100%" height="99%" top={top} padding={padding}>
      <Box display="flex" justifyContent="center" alignItems="center" height="100%" marginLeft="30px">
        <StyledImage src={SPIN_IMG} alt="loading-spinner" />
      </Box>
    </AbsoluteBlock>
  );
};
Spinner.propTypes = {
  top: PropTypes.string,
  padding: PropTypes.string,
};
Spinner.defaultProps = {
  top: '-20px',
  padding: '',
};

export { Spinner };
