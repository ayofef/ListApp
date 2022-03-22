import React from 'react';
import { Form } from 'formik';
import { arrayOf, shape, string, func, bool } from 'prop-types';
import Box from '@material-ui/core/Box';
import { StyledList } from './styled';
import FilterItem from './FilterItem';
import FormControl from './FormControl';

const FilterForm = ({ fields, defaultValues, customIsClearDisabled }) => (
  <Box component={Form} display="flex" flexDirection="column" flex={1} overflow="hidden" height="100%">
    <Box height="100%" display="flex" flexDirection="column">
      <Box flex={1} overflow="hidden">
        <Box height="100%" overflow="auto">
          <StyledList>
            {fields.map(({ name, label, component, getOptions }) => (
              <FilterItem
                defaultValues={defaultValues}
                key={label}
                name={name}
                label={label}
                component={component}
                getOptions={getOptions}
              />
            ))}
          </StyledList>
        </Box>
      </Box>

      <FormControl customIsClearDisabled={customIsClearDisabled} />
    </Box>
  </Box>
);

FilterForm.propTypes = {
  fields: arrayOf(
    shape({
      name: string,
      label: string,
      component: func,
    })
  ).isRequired,
  defaultValues: shape({}).isRequired,
  customIsClearDisabled: bool,
};

FilterForm.defaultProps = {
  customIsClearDisabled: false,
};

export default FilterForm;
