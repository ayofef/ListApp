import React from 'react';
import { string, shape, arrayOf, bool, elementType } from 'prop-types';
import { InputLabel } from '@material-ui/core';
import { useField } from 'formik';
import { StyledPaper, StyledMenuItem, CustomSelect, StyledFormControl } from '../../atoms/Select/StyledSelect';
import THEME from '../../../constants/theme';
import { P } from '../../atoms';
import CheckIcon from '../../../assets/icons/Select/CheckIcon';
import SelectDropdownIcon from './SelectDropdownIcon';

const StyledSelect = ({ paperComponent, name, options, label, placeholder, errorProps, multiple, ...restProps }) => {
  const [{ value, onBlur, onChange }, { touched, error }] = useField(name);

  const { renderValue, ...formControlProps } = restProps;
  return (
    <>
      <StyledFormControl variant="outlined" fullWidth {...formControlProps}>
        {label && (
          <InputLabel id={`${name}-label`} shrink>
            {label}
          </InputLabel>
        )}
        <CustomSelect
          labelId={`${name}-label`}
          id={name}
          name={name}
          IconComponent={SelectDropdownIcon}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
            PaperProps: {
              component: paperComponent ?? StyledPaper,
            },
          }}
          displayEmpty
          multiple={multiple}
          renderValue={
            value !== '' ? undefined : () => placeholder && <P color={THEME.greyColors.grey}>{placeholder}</P>
          }
          {...restProps}
        >
          {placeholder && (
            <StyledMenuItem value="" disabled>
              {placeholder}
            </StyledMenuItem>
          )}
          {options.map((option) => (
            <StyledMenuItem key={option.value} value={option.value}>
              {option.icon || null}
              {option.text.text ? option.text.text : ''}
              <CheckIcon />
            </StyledMenuItem>
          ))}
        </CustomSelect>
      </StyledFormControl>
      {touched &&
        error?.map((message) => (
          <P
            fontSize="12px"
            fontWeight="500"
            margin="6px 0 -7px"
            key={message}
            data-cy="error"
            color={THEME.secondaryColors.danger}
            {...errorProps}
          >
            {message}
          </P>
        ))}
    </>
  );
};

StyledSelect.propTypes = {
  name: string,
  options: arrayOf(shape({})),
  label: string,
  placeholder: string,
  paperComponent: elementType,
  errorProps: shape({}),
  multiple: bool,
};

StyledSelect.defaultProps = {
  name: '',
  options: [],
  label: '',
  placeholder: '',
  paperComponent: undefined,
  errorProps: {},
  multiple: false,
};

export default StyledSelect;
