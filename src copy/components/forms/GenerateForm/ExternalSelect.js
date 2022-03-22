import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { func, bool, shape } from 'prop-types';
import { L12 } from '../../atoms';
import AutocompliteSelect from '../../common/Autocomplete/Autocomplete';
import THEME from '../../../constants/theme';
import { SELECT_OPTIONS } from '../../../utils/queries/public/publicQueries';

const ExternalSelect = ({ valueFromEdit, values, errors, setFieldValue, showErrors, setShowErrors, item }) => {
  const [query, setQuery] = useState('');
  const { data, loading } = useQuery(SELECT_OPTIONS, {
    skip: !query,
    variables: {
      selectId: item.element.action_id,
      query,
    },
  });

  const optionsList = data?.selectOptions?.options;

  const createMerchantOptions = (_data) => {
    if (!_data) return [];
    return _data.map(({ text, value }) => {
      return {
        id: text.text,
        name: text.text,
        avatar: text['x-icon'],
        domain: value,
      };
    });
  };

  return (
    <>
      <AutocompliteSelect
        merchant
        freeSolo={Boolean(true)}
        name="merchant"
        id={item.block_id}
        value={values[item.block_id]}
        onSelect={(e) => {
          setFieldValue(item.block_id, e.name);
          setQuery(e.name);
          setShowErrors(false);
        }}
        onSearch={(e) => {
          setQuery(e.target.value);
          if (valueFromEdit) {
            setFieldValue(item.block_id, e.target.value);
          }
        }}
        options={createMerchantOptions(optionsList) || []}
        label={item.label.text}
        loading={loading}
      />
      {showErrors && errors[item.block_id] && (
        <L12 margin="0 0 10px 0" color={THEME.secondaryColors.danger}>
          {errors[item.block_id]}
        </L12>
      )}
    </>
  );
};

ExternalSelect.propTypes = {
  item: shape({}).isRequired,
  errors: shape({}).isRequired,
  values: shape({}).isRequired,
  showErrors: bool.isRequired,
  setShowErrors: func.isRequired,
  setFieldValue: func.isRequired,
  valueFromEdit: bool,
};

ExternalSelect.defaultProps = {
  valueFromEdit: false,
};

export default ExternalSelect;
