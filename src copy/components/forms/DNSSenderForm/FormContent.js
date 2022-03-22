import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { useFormikContext } from 'formik';
import TypeField from './TypeField';
import CustomField from '../_common/CustomField';

const FIELDS = [
  { name: 'displayName', type: 'text', label: 'Display name' },
  { name: 'emailAddress', type: 'email', label: 'Email' },
];

const FormContent = () => {
  const {
    values: { type },
  } = useFormikContext();

  return (
    <Box pt="10px" pb="24px" borderBottom="1px solid #e6e9ec">
      <TypeField />

      {type === 'custom' ? (
        <Box mt="4px" mb="10px">
          <Grid container spacing={2}>
            {FIELDS.map((field) => (
              <Grid key={field.name} item xs={6}>
                <CustomField {...field} fullWidth />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : null}
    </Box>
  );
};

export default FormContent;
