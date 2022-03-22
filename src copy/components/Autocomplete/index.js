import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import AutocompleteBase from '@material-ui/lab/Autocomplete';
import { getOptionLabel } from './getOptionLabel';
import { renderOption } from './renderOption';
import { filterOptions } from './filterOptions';
import Input from './Input';

const Autocomplete = ({ fieldValue, setValue, fieldOptions, placeholder, loading }) => {
  const { value, options } = useMemo(() => {
    const SELECTED = { value: fieldValue, title: fieldValue };

    if (fieldOptions === undefined) {
      return {
        value: SELECTED,
        options: [SELECTED],
      };
    }

    const selected = fieldOptions.find((property) => property?.value === fieldValue);

    return {
      value: selected ?? SELECTED,
      options: selected ? fieldOptions : [...fieldOptions, SELECTED],
    };
  }, [fieldValue, fieldOptions]);

  const onChange = useCallback(
    (event, newValue) => {
      if (typeof newValue === 'string') {
        setValue(newValue);
        return;
      }

      setValue(newValue?.inputValue ?? newValue?.value ?? '');
    },
    [setValue]
  );

  return (
    <AutocompleteBase
      /* require */
      options={options}
      renderInput={(params) => <Input {...params} loading={loading} />}
      /* optional */
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      loading={loading}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      filterOptions={filterOptions}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      freeSolo
    />
  );
};

Autocomplete.propTypes = {
  fieldValue: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  fieldOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
  placeholder: PropTypes.string,
  loading: PropTypes.bool,
};

Autocomplete.defaultProps = {
  fieldOptions: undefined,
  placeholder: undefined,
  loading: false,
};

export { Autocomplete };
