import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import isEmpty from 'lodash/isEmpty';
import Fieldset from '../Fieldset';
import EmptyState from './EmptyState';

const AsyncFieldset = ({ name, useGetOptions, useGetOptionsProps }) => {
  const { loading, options } = useGetOptions(useGetOptionsProps);
  const { isSubmitting } = useFormikContext();
  const [{ value, onChange }] = useField(name);
  console.log('🚀 ~ file: index.js ~ line 14 ~ AsyncFieldset ~ value', value, name);

  return (
    <>
      {loading && (
        <Box bgcolor="#fff" borderRadius="6px">
          <Skeleton height="32px" animation="wave" />
        </Box>
      )}

      {!loading && isEmpty(options) && <EmptyState />}

      {!loading && !isEmpty(options) && (
        <Fieldset name={name} value={value} options={options} disabled={isSubmitting} onChange={onChange} />
      )}
    </>
  );
};

AsyncFieldset.propTypes = {
  name: PropTypes.string.isRequired,
  useGetOptions: PropTypes.func.isRequired,
  useGetOptionsProps: PropTypes.shape({}),
};
AsyncFieldset.defaultProps = {
  useGetOptionsProps: undefined,
};

export default AsyncFieldset;
