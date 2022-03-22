import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useFormikContext } from 'formik';
import isEqual from 'lodash/isEqual';

import Select from './Select';
import { StyledTypography } from '../../../../components/atoms/Typography/StyledTypography';
import { lazySelected, isShowLeft, isShowRight, getInitialValues } from './utils';
import { GT, LT } from '../../../../utils/filterToSearchParams/constants';

const FieldsWithSelect = ({ name, options, component: Component, divider }) => {
  const { values, initialValues, touched, setFieldValue } = useFormikContext();
  const [selected, setSelected] = useState(() => lazySelected(values[name]));

  const selectHandler = useCallback(
    (event) => {
      const { value } = event.target;
      setSelected(value);

      const fieldValue = getInitialValues(value, name);
      setFieldValue(name, fieldValue);
    },
    [setFieldValue, name]
  );
  const showLeft = isShowLeft(selected);
  const showRight = isShowRight(selected);
  const showDivider = showLeft && showRight;

  useEffect(() => {
    const value = values[name];
    const initialValue = initialValues[name];
    if (!isEqual(value, initialValue)) return;

    setSelected(lazySelected(values[name]));
  }, [name, values, initialValues, touched]);

  return (
    <Box mb="8px" ml="-2px">
      <Select name={name} value={selected} options={options} onChange={selectHandler} />

      {selected && (
        <Box display="flex" flexWrap="wrap" alignItems="flex-start" mt="9px">
          {showLeft && (
            <Box width={name === 'amount' ? 'min-content' : '100%'}>
              <Component id={GT} name={`${name}.${GT}`} />
            </Box>
          )}

          {showDivider && (
            <Box
              display="flex"
              height="30.25px"
              alignItems="center"
              m={name === 'amount' ? '0 auto' : '0'}
              color="#787F88"
            >
              <StyledTypography color="inherit" component="span">
                {divider}
              </StyledTypography>
            </Box>
          )}

          {showRight && (
            <Box width={name === 'amount' ? 'min-content' : '100%'}>
              <Component id={LT} name={`${name}.${LT}`} />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

FieldsWithSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.node.isRequired,
    })
  ).isRequired,
  component: PropTypes.elementType.isRequired,
  divider: PropTypes.node,
};

FieldsWithSelect.defaultProps = {
  divider: undefined,
};

export default FieldsWithSelect;
