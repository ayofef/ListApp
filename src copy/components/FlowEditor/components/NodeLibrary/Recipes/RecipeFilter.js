import React from 'react';
import PropTypes from 'prop-types';
import { StyledSelect } from '../../../../atoms';
import { StyledFilterWrapper } from './styled';
import { renderSelectValue, generateOptions } from './constant';
import FilterLoadingState from './FilterLoadingState';
import THEME from '../../../../../constants/theme';

const RecipeFilter = ({ setSelectedCategories, selectedCategories, recipes, loading, border }) => {
  const options = generateOptions(recipes);

  const handleChange = (e) => {
    setSelectedCategories(e.target.value);
  };

  return (
    <StyledFilterWrapper $noBorder={border}>
      {loading ? (
        <FilterLoadingState />
      ) : (
        <StyledSelect
          name="recipe-filter"
          value={selectedCategories}
          label=""
          onChange={handleChange}
          options={options}
          backgroundColor={border ? 'transparent' : '#F5F6F7'}
          placeholder="All categories"
          width="150px"
          height={border ? '40px' : '32px'}
          boxSizing="border-box"
          margin="0"
          fontSize={!border && '12px !important'}
          fontWeight={500}
          border={border && `1px solid ${THEME.greyColors.grey22}`}
          multiple
          displayEmpty
          renderValue={renderSelectValue}
        />
      )}
    </StyledFilterWrapper>
  );
};

RecipeFilter.propTypes = {
  loading: PropTypes.bool,
  selectedCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedCategories: PropTypes.func.isRequired,
  border: PropTypes.bool,
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.arrayOf(PropTypes.string),
    })
  ).isRequired,
};

RecipeFilter.defaultProps = {
  loading: false,
  border: false,
};

export default RecipeFilter;
