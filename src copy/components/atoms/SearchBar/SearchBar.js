import React, { useCallback, useEffect, useState } from 'react';
import { Box, IconButton } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { string, func, bool } from 'prop-types';
import debounce from 'lodash/debounce';
import Search from '../../../assets/icons/Search';

const style = { outline: 'none' };

const SearchBar = ({
  search,
  setSearch,
  bgcolor,
  borderRadius,
  paddingX,
  paddingY,
  placeholder,
  width,
  height,
  noClear,
  noIcon,
}) => {
  const [value, setValue] = useState('');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounced = useCallback(
    debounce((newVal) => {
      setSearch(newVal);
    }, 200),
    [setSearch]
  );

  const onChange = (e) => {
    const { value: newValue } = e.target;
    setValue(newValue);
    debounced(newValue);
  };

  const onClear = () => {
    setSearch('');
  };

  useEffect(() => {
    setValue(search);
  }, [search]);

  return (
    <Box
      height={height}
      width={width}
      borderRadius={borderRadius}
      px={paddingX}
      py={paddingY}
      bgcolor={bgcolor}
      display="flex"
      justifyContent="space-between"
      alignContent="center"
      alignItems="center"
      boxSizing="border-box"
    >
      {noIcon || (
        <Box display="flex" alignItems="center" marginLeft="-5px">
          <Search fill="#787f88" />
        </Box>
      )}
      <Box
        component="input"
        flexGrow={1}
        height="20px"
        bgcolor="transparent"
        border="0"
        paddingLeft="8px"
        style={style}
        placeholder={placeholder}
        fontSize={14}
        value={value}
        onChange={onChange}
      />
      {search !== '' && !noClear && (
        <IconButton onClick={onClear} size="small">
          <Clear />
        </IconButton>
      )}
    </Box>
  );
};

SearchBar.propTypes = {
  search: string.isRequired,
  setSearch: func.isRequired,
  bgcolor: string,
  borderRadius: string,
  paddingX: string,
  placeholder: string,
  width: string,
  noClear: bool,
  paddingY: string,
  height: string,
  noIcon: bool,
};
SearchBar.defaultProps = {
  bgcolor: '#F5F6F7',
  borderRadius: '8px',
  paddingX: '20px',
  placeholder: 'Search',
  width: 'auto',
  noClear: false,
  paddingY: '8px',
  height: '40px',
  noIcon: false,
};

export { SearchBar };
