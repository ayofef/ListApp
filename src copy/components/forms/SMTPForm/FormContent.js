import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from 'react-i18next';
import CustomField from '../_common/CustomField';
import Select from '../_common/CustomSelect';

const FIELDS = [
  { name: 'serverAddress', type: 'text', label: 'SMTP server address', placeholder: 'e.g. smtp.gmail.com' },
  { name: 'username', type: 'text', label: 'User name', placeholder: 'e.g. john@whenthen.com' },
  { name: 'password', type: 'password', label: 'Password', placeholder: 'Type your password' },
];

const ENCRYPTION_TYPES = ['SSL', 'TLS', 'NONE'];

const FormContent = () => {
  const { t } = useTranslation();

  return (
    <Box mt="28px">
      {FIELDS.map((field) => (
        <Box key={field.name} mt="24px">
          <CustomField {...field} fullWidth />
        </Box>
      ))}

      <Box mt="24px">
        <Box component="p" fontWeight="600">
          {t('Encryption type and port number')}
        </Box>

        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Select name="encryptionType" fullWidth>
              {ENCRYPTION_TYPES.map((value) => (
                <MenuItem key={value} value={value}>
                  {t(value)}
                </MenuItem>
              ))}
            </Select>
          </Grid>

          <Grid item xs>
            <CustomField name="portNumber" type="text" placeholder="e.g. 465.587" fullWidth />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FormContent;
