import React from 'react';
import PropTypes from 'prop-types';
import { usePeopleField } from './hooks/usePeopleField';
import { selectTypes } from '../inputs/types';
import MultiSelectSection from '../sections/MultiSelectSection';

const PeopleMultiSelectField = ({ title, fieldName }) => {
  const { selectedOptionIds, options, onChange, validationMessage, loading } = usePeopleField(fieldName);

  return (
    <MultiSelectSection
      options={options}
      loading={loading}
      selectedOptionIds={selectedOptionIds}
      title={title}
      validationMessage={validationMessage}
      handleChange={onChange}
      selectType={selectTypes.people}
      selectAll
      isSearchBar
      showEmptyState
    />
  );
};
PeopleMultiSelectField.defaultProps = {
  title: '',
};

PeopleMultiSelectField.propTypes = {
  title: PropTypes.string,
  fieldName: PropTypes.string.isRequired,
};

export default PeopleMultiSelectField;
