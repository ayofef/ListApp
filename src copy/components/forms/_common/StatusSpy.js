import React, { useEffect, useRef } from 'react';
import { useFormikContext } from 'formik';

import THEME from '../../../constants/theme';
import { L12 } from '../../atoms';

const StatusSpy = () => {
  const { dirty, status, values, resetForm, submitCount } = useFormikContext();
  const valuesRef = useRef(null);

  useEffect(() => {
    valuesRef.current = values;
  }, [values]);

  useEffect(() => {
    if (!status) return;
    const { current } = valuesRef;

    resetForm({ values: { ...current }, status, submitCount });
  }, [status, submitCount, resetForm]);

  if (!status || dirty) return null;

  return (
    <L12 margin="10px 0 10px 0" color={THEME.secondaryColors.danger}>
      {status}
    </L12>
  );
};

export default StatusSpy;
