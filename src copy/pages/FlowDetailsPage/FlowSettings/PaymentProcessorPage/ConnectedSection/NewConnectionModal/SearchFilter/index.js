import React, { useCallback } from 'react';
import Box from '@material-ui/core/Box';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { useSearchInput } from '../../../../../../../hooks/useSearchInput';
import useSearch from '../../../../../../../hooks/useSearch';
import { StyledWrapper } from './styled';
import { InputField, StyledSelect } from '../../../../../../../components/atoms';
import { SORT_MAP } from '../../../../hooks/useListConnections';

const OPTIONS = SORT_MAP.map((sortKey) => ({ value: sortKey, text: { text: sortKey } }));

const SearchFilter = () => {
  const [value, setValue] = useSearchInput();
  const [searchParams, setSearchParams] = useSearch();

  const handleInputChange = useCallback(
    (e) => {
      setValue(e.target.value);
    },
    [setValue]
  );
  const handleSort = useCallback(
    (e) => {
      setSearchParams({ ...searchParams, sort: e.target.value });
    },
    [setSearchParams, searchParams]
  );

  return (
    <StyledWrapper>
      <Box width="336px" boxSizing="border-box" mr="16px">
        <InputField
          label=""
          onChange={handleInputChange}
          value={value}
          padding="0"
          noBorder
          size="small"
          variant="outlined"
          type="text"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment>
                <Box mt="4px" color="#787F88" fontSize="14px">
                  <SearchIcon fontSize="inherit" color="inherit" />
                </Box>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box width="160px" boxSizing="border-box">
        <StyledSelect
          name="sort-connection"
          value={searchParams?.sort || OPTIONS[0]?.value}
          label=""
          onChange={handleSort}
          options={OPTIONS}
          backgroundColor="#F5F6F7"
          width="100%"
          variant="outlined"
          margin="4px 0px 13px"
        />
      </Box>
    </StyledWrapper>
  );
};

export default SearchFilter;
