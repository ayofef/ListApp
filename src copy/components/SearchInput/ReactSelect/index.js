import React, { useCallback, useMemo } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import groupBy from 'lodash/groupBy';
import flattenDeep from 'lodash/flattenDeep';
import ReactSelectOption from './ReactSelectOption';
import { customStyles } from './styles';
import useSearchFilter from '../../../hooks/useSearchFilter';
import ReactSelectMultiValue from './ReactSelectMultiValue';
import { useGetPaymentList } from '../../../hooks/useGetPaymentList';

const ReactSelect = ({ onInputChange, query, selectRef }) => {
  const [searchFilter, setSearchFilter] = useSearchFilter();
  const { availableKnownValues } = useGetPaymentList();

  const availableOptions = useMemo(() => {
    if (isEmpty(availableKnownValues)) {
      return [];
    }
    return Object.keys(availableKnownValues).map((key) => {
      const values = availableKnownValues[key];
      const options = values.map((value) => {
        return {
          value,
          label: value,
          type: key,
        };
      });
      return {
        label: key,
        options,
      };
    });
  }, [availableKnownValues]);

  const formatSearchFilter = useCallback((selectedOptions) => {
    const groupedOptions = groupBy(selectedOptions, 'type');
    return Object.entries(groupedOptions).reduce((acc, [key, value]) => {
      return {
        ...acc,
        [key]: value.map((item) => item.value),
      };
    }, {});
  }, []);

  const defaultOptions = useMemo(() => {
    return !isEmpty(searchFilter)
      ? flattenDeep(
          Object.entries(searchFilter).map(([type, values]) => {
            return values.map((value) => {
              return {
                value,
                type,
                label: value,
              };
            });
          })
        )
      : [];
  }, [searchFilter]);

  const handleChange = (selectedOptions) => {
    const filter = formatSearchFilter(selectedOptions);
    setSearchFilter(filter, false);
  };

  return (
    <Select
      ref={selectRef}
      isMulti
      placeholder="Type your search"
      options={availableOptions}
      inputValue={query}
      onChange={handleChange}
      onInputChange={onInputChange}
      defaultValue={defaultOptions}
      styles={customStyles}
      menuIsOpen={availableOptions?.length}
      components={{ Option: ReactSelectOption, MultiValue: ReactSelectMultiValue }}
      autoFocus
    />
  );
};

ReactSelect.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  selectRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.elementType })]).isRequired,
};

export default ReactSelect;
