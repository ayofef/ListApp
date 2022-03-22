import React, { useMemo, useState } from 'react';
import Box from '@material-ui/core/Box';
import { FormControl, FormHelperText } from '@material-ui/core';
import PropTypes from 'prop-types';
import Title from '../../Title';
import SubTitle from '../../SubTitle';
import RadioButtons from '../inputs/RadioButtons';
import { SearchBar } from '../../../../../atoms';
import { selectTypes } from '../inputs/types';

const RadioButtonsSection = ({
  name,
  title,
  subTitle,
  options,
  validationMessage,
  value,
  handleChange,
  selectType,
  isSearchBar,
  mb,
}) => {
  const [search, setSearch] = useState('');

  const filteredOptions = useMemo(
    () => options?.filter((option) => !search.toLowerCase() || option?.title?.toLowerCase().search(search) >= 0),
    [options, search]
  );

  return (
    <Box component="section" marginBottom={mb}>
      {title && <Title>{title}</Title>}
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
      <FormControl fullWidth error={!!validationMessage}>
        {isSearchBar && (
          <Box mb={2}>
            <SearchBar search={search} setSearch={setSearch} />
          </Box>
        )}
        <RadioButtons
          options={filteredOptions}
          name={name}
          value={value}
          onChange={handleChange}
          selectType={selectType}
        />
        <FormHelperText>{validationMessage}</FormHelperText>
      </FormControl>
    </Box>
  );
};

RadioButtonsSection.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  validationMessage: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  selectType: PropTypes.oneOf([selectTypes.connections, selectTypes.people]),
  isSearchBar: PropTypes.bool,
  mb: PropTypes.string,
};

RadioButtonsSection.defaultProps = {
  name: '',
  title: '',
  subTitle: '',
  selectType: '',
  isSearchBar: false,
  mb: '0',
};

export default RadioButtonsSection;
