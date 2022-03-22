import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from './TextField';

const INPUTS = [
  { name: 'to', type: 'email', adornment: 'To' },
  { name: 'subject', type: 'text', adornment: 'Subject' },
];

const BasicInputs = () => {
  return INPUTS.map(({ name }) => (
    <Grid key={name} item xs={12}>
      <TextField name={name} />
    </Grid>
  ));
};

export default BasicInputs;
