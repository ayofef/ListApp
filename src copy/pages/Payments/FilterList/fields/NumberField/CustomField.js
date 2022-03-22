import React, { useEffect, useMemo, useRef } from 'react';
import { useField, useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { useTranslation } from 'react-i18next';

import { StyledTextField } from '../../../../../components/forms/_common/styled';
import { GT, LT } from '../../../../../utils/filterToSearchParams/constants';

const CustomField = ({ name, id }) => {
  const { t } = useTranslation();
  const oppositeKey = useMemo(() => name.replace(id, id === LT ? GT : LT), [name, id]);
  const { values, isSubmitting } = useFormikContext();
  const [{ value, ...field }, { error }, helpers] = useField(name);
  const helpersRef = useRef(helpers);
  const { max } = useMemo(() => {
    const oppositeValue = get(values, oppositeKey, undefined);

    return {
      min: id === LT ? oppositeValue : undefined,
      max: id === GT ? oppositeValue : undefined,
    };
  }, [id, oppositeKey, values]);
  const helperText = error && error !== 'NaN' && t(error);

  useEffect(() => () => helpersRef.current.setValue(undefined), []);

  return (
    <StyledTextField
      id={name}
      type="number"
      variant="outlined"
      value={value ?? ''}
      inputProps={{ min: 0, max, step: 'any' }}
      placeholder="0"
      error={Boolean(helperText)}
      helperText={helperText}
      disabled={isSubmitting}
      width={name.includes('amount') ? '80px' : '105px'}
      {...field}
    />
  );
};

CustomField.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default CustomField;
