import React, { useMemo, useState } from 'react';
import Box from '@material-ui/core/Box';
import { FormControl, FormHelperText } from '@material-ui/core';
import isEmpty from 'lodash/isEmpty';

import PropTypes from 'prop-types';
import Title from '../../Title';
import SubTitle from '../../SubTitle';
import { SearchBar } from '../../../../../atoms';
import { selectTypes } from '../inputs/types';
import MultiSelect from '../inputs/MultiSelect';
import ListLoadingState from '../fields/ListLoadingState';
import { StyledFormControlLabel } from '../inputs/styled';
import Checkbox from '../inputs/Checkbox';
import ListEmptyState from '../../../../../ListEmptyState';

const MultiSelectSection = ({
  title,
  subTitle,
  options,
  selectedOptionIds,
  validationMessage,
  handleChange,
  selectType,
  isSearchBar,
  selectAll,
  mb,
  loading,
  showEmptyState,
}) => {
  const [search, setSearch] = useState('');

  const filteredOptions = useMemo(
    () => options?.filter((option) => !search.toLowerCase() || option?.title?.toLowerCase().search(search) >= 0),
    [options, search]
  );

  const onSelectAll = ({ target }) => {
    const { checked } = target;

    if (checked) {
      handleChange([...options?.map((el) => el?.value)]);
    } else {
      handleChange([]);
    }
  };

  return (
    <Box component="section" marginBottom={mb}>
      {title && <Title>{title}</Title>}
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
      <FormControl fullWidth error={!!validationMessage}>
        {isSearchBar && (
          <Box mb={2}>
            <SearchBar search={search} setSearch={setSearch} paddingY="0" />
          </Box>
        )}
        {loading ? (
          <ListLoadingState />
        ) : (
          <>
            {isEmpty(options) && showEmptyState && (
              <Box position="relative" height="200px" mb="32px">
                <ListEmptyState title="Connections" description="There are currently no connections." />
              </Box>
            )}
            {selectAll && !search && !isEmpty(options) && (
              <StyledFormControlLabel
                value="all"
                control={<Checkbox name="all" color="primary" size="small" />}
                label={<Box ml={1}>All {title}</Box>}
                onChange={onSelectAll}
                checked={options?.length === selectedOptionIds?.length}
                selectType={selectType}
              />
            )}
            <MultiSelect
              options={filteredOptions}
              selectedOptionIds={selectedOptionIds}
              onSelect={handleChange}
              selectType={selectType}
              selectAll={selectAll}
            />
          </>
        )}
        <FormHelperText>{validationMessage}</FormHelperText>
      </FormControl>
    </Box>
  );
};

MultiSelectSection.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedOptionIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  validationMessage: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  selectType: PropTypes.oneOf([selectTypes.connections, selectTypes.people]),
  isSearchBar: PropTypes.bool,
  mb: PropTypes.string,
  loading: PropTypes.bool,
  showEmptyState: PropTypes.bool,
  selectAll: PropTypes.bool,
};

MultiSelectSection.defaultProps = {
  title: '',
  subTitle: '',
  selectType: '',
  isSearchBar: false,
  mb: '0',
  loading: false,
  showEmptyState: false,
  selectAll: false,
};

export default MultiSelectSection;
