import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from './TextField';

const CarbonCopyComponent = ({ title }) => {
  return (
    <Grid key={title} item xs={12}>
      <TextField name={title} />
    </Grid>
  );
};

CarbonCopyComponent.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CarbonCopyComponent;
