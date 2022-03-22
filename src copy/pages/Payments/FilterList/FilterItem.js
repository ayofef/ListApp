import React, { useCallback, useEffect, useState, memo } from 'react';
import PropTypes, { shape } from 'prop-types';
import { useFormikContext } from 'formik';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import isEmpty from 'lodash/isEmpty';
import capitalize from '@material-ui/core/utils/capitalize';
import { Checkbox } from '../../../components/atoms';
import { SEARCH_KEYS } from '../../../utils/filterToSearchParams/constants';
import { StyledFormControlLabel } from '../../../components/forms/_common/styled';

const NO_BORDER_MAP = [SEARCH_KEYS.amount, SEARCH_KEYS.date, SEARCH_KEYS.dateRange];
const DEFAULT_VALUE_MAP = {
  [SEARCH_KEYS.dateRange]: 'today',
};

const FilterItem = memo(({ name, label, component: Component, defaultValues }) => {
  const { values, setFieldValue } = useFormikContext();
  const fieldValue = values[name];
  const [isOpen, setIsOpen] = useState(() => !isEmpty(fieldValue));
  const handleChange = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (!isOpen && DEFAULT_VALUE_MAP[name] && fieldValue?.length < 1) {
      setFieldValue(name, DEFAULT_VALUE_MAP[name]);
    }
  }, [setIsOpen, isOpen, fieldValue, name, setFieldValue]);
  /* open Item if value exist */

  useEffect(() => {
    setIsOpen(() => !isEmpty(fieldValue));
  }, [name, fieldValue]);

  useEffect(() => {
    if (isOpen) return;

    setFieldValue(name, defaultValues[name]);
  }, [name, isOpen, setFieldValue, defaultValues, fieldValue]);

  return (
    <ListItem dense>
      <Box width="100%" p="8px 16px 8px 17px" bgcolor="#f5f6f7" borderRadius="8px" minWidth="225px">
        <StyledFormControlLabel
          control={<Checkbox checked={isOpen} onChange={handleChange} name={label} color="primary" />}
          label={
            <Box ml="16px" fontSize="13px" fontWeight="600">
              {capitalize(label?.toLowerCase() ?? '')}
            </Box>
          }
        />

        <Box
          display={isOpen ? 'block' : 'none'}
          borderTop={NO_BORDER_MAP.includes(name) ? 'none' : '1px solid #E6E9EC'}
          mt="6px"
        >
          <Component />
        </Box>
      </Box>
    </ListItem>
  );
});

FilterItem.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  defaultValues: shape({}).isRequired,
};
FilterItem.defaultProps = {};

export default FilterItem;
