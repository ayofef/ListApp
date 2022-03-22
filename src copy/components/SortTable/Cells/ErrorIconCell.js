import React from 'react';
import { bool, shape, string } from 'prop-types';
import Box from '@material-ui/core/Box';
import { ErrorRounded } from '@material-ui/icons';
import THEME from '../../../constants/theme';
import StyledTooltip from '../../styled/StyledTooltip';

const ErrorIconCell = ({ data }) => {
  return (
    <Box width="20px">
      {data?.hasErrors || data?.hasDraftErrors ? (
        <StyledTooltip title="Automation has connection or configuration issues. Please fix errors in Automation Build mode">
          <Box display="flex" alignItems="center" mr="6px" color={THEME.secondaryColors.nodeError}>
            <ErrorRounded color="inherit" />
          </Box>
        </StyledTooltip>
      ) : null}
    </Box>
  );
};

ErrorIconCell.propTypes = {
  data: shape({
    name: string,
    hasDraft: bool,
  }).isRequired,
};

export default ErrorIconCell;
