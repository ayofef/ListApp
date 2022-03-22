import React, { useState } from 'react';
import styled from 'styled-components';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { bool, arrayOf, func, string, shape } from 'prop-types';
import omit from 'lodash/omit';
import AvatarItem from '../AvatarItem/AvatarItem';
import THEME from '../../../constants/theme';
import CircularLoader from '../../atoms/CircularLoader/CircularLoader';
import emptyImage from '../../../assets/img/emptyImage.svg';
import { CircleWrapper, InputField } from '../../atoms';
import { Customer } from '../../table/Cells/CustomerNameCell';
import { StyledImage } from '../../styled/StyledImage';

const useStyles = makeStyles({
  root: {
    padding: '10px 0 4px',
    position: 'relative',
    '& .MuiInputLabel-outlined': {
      fontSize: '14px',
    },
    '& label.MuiFormLabel-filled': {
      fontWeight: 500,
      color: 'black',
    },
    '& label.Mui-focused': {
      fontWeight: 500,
      color: THEME.primaryColors.blue,
    },
  },
  option: {
    fontSize: 15,
    '& > div': {
      width: 'calc(100% + 32px)',
      margin: '-6px -16px',
      padding: '6px 16px',
    },
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
    '&:hover': {
      backgroundColor: '#fff',
      '& p': {
        color: '#4E40EF !important',
      },
    },
    "&[aria-selected*='true']": {
      backgroundColor: '#fff',
      '& p': {
        color: '#4E40EF !important',
      },
    },
  },
  loading: {
    position: 'absolute',
    top: '26px',
    right: '36px',
  },
  merchant: {
    '& .MuiInputBase-input': {
      position: 'relative',
      transition: '0.2s linear padding',
      zIndex: 1,
    },
    '&.active .MuiInputBase-input': {
      paddingLeft: '56px!important',
    },
  },
  avatar: {
    position: 'absolute',
    top: '24px',
    left: '14px',
  },
});

const StyledAutocomplete = styled(Autocomplete)`
  width: ${({ width }) => width || '100%'};
`;

export default function AutocompleteSelect({
  options,
  onSelect,
  onSearch,
  multiple,
  value,
  label,
  width,
  loading,
  defaultValue,
  merchant,
  customLabel,
  customer,
  placeholder,
  filterOptions,
}) {
  const classes = useStyles({ value });
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const onChangeHandler = (e) => {
    onSearch(e);
  };
  const merchantClass = merchant ? classes.merchant : null;
  const showAvatar = value && merchant && value === selectedAvatar?.id;
  return (
    <StyledAutocomplete
      {...multiple}
      id={`Autocomplete-${Math.random() / 100}`}
      width={width || '100%'}
      options={options}
      defaultValue={{ name: defaultValue }}
      classes={{
        root: classes.root,
        option: classes.option,
      }}
      autoHighlight
      {...(filterOptions && { filterOptions })}
      freeSolo
      disableClearable
      getOptionLabel={(option) => (customer ? option.id : option.name)}
      renderOption={(option) => (
        <div
          onClick={() => {
            onSelect(option);
            setSelectedAvatar(option);
          }}
        >
          {customer ? (
            <Customer name={option.name} email={option.email} />
          ) : (
            <AvatarItem onlyName name={option.name} src={option.avatar} />
          )}
        </div>
      )}
      renderInput={(params) => (
        <div className={`${merchantClass} ${value ? 'active' : null}`}>
          {loading && <CircularLoader size={24} className={classes.loading} />}
          {showAvatar && (
            <CircleWrapper
              size={32}
              className={classes.avatar}
              borderColor="transparent"
              background="transparent"
              position="absolute"
            >
              <StyledImage src={selectedAvatar?.avatar || emptyImage} alt="" maxWidth="100%" />
            </CircleWrapper>
          )}
          <InputField
            {...omit(params, ['InputProps.className'])}
            value={value}
            label={!customLabel && label}
            onChange={onChangeHandler}
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'off',
            }}
            {...(placeholder && { placeholder })}
          />
        </div>
      )}
    />
  );
}

AutocompleteSelect.propTypes = {
  options: arrayOf(shape({})),
  isOpen: bool,
  multiple: bool,
  onSelect: func.isRequired,
  onSearch: func.isRequired,
  value: string,
  label: string,
  width: string,
  loading: bool,
  defaultValue: shape({}),
  merchant: bool,
  customLabel: bool,
  customer: bool,
  filterOptions: func,
  placeholder: string,
};

AutocompleteSelect.defaultProps = {
  options: [],
  multiple: false,
  isOpen: false,
  value: '',
  label: '',
  width: '',
  loading: false,
  defaultValue: null,
  merchant: false,
  customLabel: false,
  customer: false,
  placeholder: '',
  filterOptions: undefined,
};
