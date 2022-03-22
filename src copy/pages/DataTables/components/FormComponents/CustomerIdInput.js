import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';
import AutocompleteSelect from '../../../../components/common/Autocomplete/Autocomplete';
import { useGetCustomers } from '../../../../hooks/dataTables/useGetCustomers';
import { createAutoCompleteOption } from './constant';
import { Label } from '../../../../components/forms/_common/Input';
import { P } from '../../../../components/atoms';

const filterFn = (el, query) => el?.toLowerCase().indexOf(query?.toLowerCase()) > -1;
const FIRST = 100;
const noop = () => {};

//TODO: Convert to backend search
const CustomerIdInput = ({ name, label, customLabelProps, placeholder }) => {
  const [{ value }, , { setValue }] = useField(name);
  const { customers } = useGetCustomers(FIRST);
  const { t } = useTranslation();
  const handleSelect = useCallback(
    (e) => {
      setValue(e.id);
    },
    [setValue]
  );

  const customerOptions = useMemo(() => createAutoCompleteOption(customers), [customers]);

  const filterOptions = useCallback((options, { inputValue }) => {
    return options?.filter(
      (el) => filterFn(el.name, inputValue) || filterFn(el.email, inputValue) || filterFn(el.id, inputValue)
    );
  }, []);

  return (
    <Label>
      <P
        fontSize="12px !important"
        fontWeight={600}
        width="100%"
        textAlign="left"
        lineHeight="30px"
        {...(customLabelProps && customLabelProps)}
      >
        {t(label)}
      </P>
      <AutocompleteSelect
        name="customer-id"
        id="customer-id"
        value={value}
        onSelect={handleSelect}
        onSearch={noop}
        options={customerOptions}
        loading={false}
        customLabel
        customer
        placeholder={placeholder}
        filterOptions={filterOptions}
      />
    </Label>
  );
};

CustomerIdInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  customLabelProps: PropTypes.shape({}).isRequired,
};

export default CustomerIdInput;
