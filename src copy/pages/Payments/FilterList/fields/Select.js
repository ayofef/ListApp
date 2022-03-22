import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {
  StyledPaper,
  StyledMenuItem,
  CustomSelect,
  StyledFormControl,
} from '../../../../components/atoms/Select/StyledSelect';
import CheckIcon from '../../../../assets/icons/Select/CheckIcon';

/**
 * @param {Array<{ title: any, value: string }>} options
 * */
const renderMultiValue = (options) => (selected) => {
  if (selected.length === 0) return '';

  const titles = options.reduce((acc, { value, title }) => (selected.includes(value) ? [...acc, title] : acc), []);

  if (!titles.some((title) => typeof title !== 'string')) return titles.join(', ');

  return (
    <Box display="flex" flexDirection="column">
      {titles}
    </Box>
  );
};

const Select = ({ name, value, options, multiple, disabled, onChange }) => {
  const renderValue = useMemo(() => multiple && renderMultiValue(options), [options, multiple]);

  return (
    <StyledFormControl
      variant="outlined"
      disabled={disabled}
      fullWidth
      filter={1}
      padding="8px 16px"
      boxSizing="border-box"
    >
      <CustomSelect
        width="100%"
        backgroundColor="#fff"
        hoverbg="#fff"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        IconComponent={ExpandMoreIcon}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
          PaperProps: {
            component: StyledPaper,
          },
        }}
        renderValue={renderValue}
        multiple={multiple}
        // displayEmpty
        height="40px"
      >
        {/* <StyledMenuItem value="" disabled /> */}

        {options.map(({ value: optionValue, title }) => (
          <StyledMenuItem key={optionValue} value={optionValue}>
            {title}
            <CheckIcon />
          </StyledMenuItem>
        ))}
      </CustomSelect>
    </StyledFormControl>
  );
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.number),
  ]).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.node.isRequired,
    })
  ).isRequired,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

Select.defaultProps = {
  disabled: false,
  multiple: undefined,
};

export default Select;
