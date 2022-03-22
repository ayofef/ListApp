import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import CarbonCopyComponent from './CarbonCopyComponent';

const CarbonCopyField = ({ name, title }) => {
  const [{ value }] = useField(name);
  const { setFieldValue } = useFormikContext();
  const onChangeHandler = useCallback((emails) => setFieldValue(name, emails), [name, setFieldValue]);

  return <CarbonCopyComponent value={value} title={title} onChange={onChangeHandler} />;
};

CarbonCopyField.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default CarbonCopyField;
