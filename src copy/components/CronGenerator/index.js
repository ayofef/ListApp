import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import TextFieldBase from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { StyledFormControl } from '../FlowEditor/components/AutomationDetails/AutomationStep/fields/styled';

const CronInput = React.lazy(() => import('./CronInput'));

const Fallback = () => (
  <Box display="flex" justifyContent="center">
    <CircularProgress size={5} />
  </Box>
);

const CronGenerator = ({ value, onChange }) => {
  const [error, onError] = useState();

  return (
    <Box mt="24px">
      <StyledFormControl fullWidth>
        <TextFieldBase name="cron" type="text" value={value} InputProps={{ readOnly: true }} />
      </StyledFormControl>

      <Box mt="16px">
        <React.Suspense fallback={<Fallback />}>
          <CronInput value={value} onChange={onChange} onError={onError} />
        </React.Suspense>
      </Box>

      {error && <Alert severity="error">{error.description}</Alert>}
    </Box>
  );
};

CronGenerator.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CronGenerator;
