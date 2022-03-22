import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import CarbonCopyField from './CarbonCopyField';
import { CHECKBOX_KEYS } from './constants';

const CarbonCopyInputs = ({ carbonControl }) =>
  CHECKBOX_KEYS.map((name) =>
    carbonControl[name] ? (
      <Grid key={name} item xs={12}>
        <CarbonCopyField title={name} name={name} />
      </Grid>
    ) : null
  );

CarbonCopyInputs.propTypes = {
  carbonControl: PropTypes.shape({
    cc: PropTypes.bool.isRequired,
    bcc: PropTypes.bool.isRequired,
  }).isRequired,
};

export default CarbonCopyInputs;
