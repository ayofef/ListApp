import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { func, bool, string } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { H3, FilterButton } from '../../../atoms';
import { StyledRoundedTextField } from '../../../styled/StyledRoundedTextField';
import { StyledBox } from '../../../../pages/Payments/Header/StyledBox';
import { useSearchInput } from '../../../../hooks/useSearchInput';
import useSearch from '../../../../hooks/useSearch';
import { StyledIconButton } from '../../../atoms/Buttons/StyledIconButton';

const SearchComponent = ({ title, isOpen, buttonLabel, handleDrawerOpen }) => {
  const [searchValue, setSearchValue] = useSearchInput();
  const [searchParams] = useSearch();
  const { t } = useTranslation();
  const numberOfFilters = searchParams ? Object.keys(searchParams)?.length : 0;

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const [searchActive, setSearchActive] = useState(false);
  return (
    <StyledBox component="div" display="flex" alignItems="center" width="100%" m="0" py="16px">
      <Box display="flex" width="100%">
        <H3 margin="0 auto 0 0">{title}</H3>

        <Box display="flex" alignItems="center">
          <Box width="350px" mr="-40px">
            {searchActive && (
              <StyledRoundedTextField
                opened={searchActive}
                value={searchValue}
                onChange={handleSearch}
                fullWidth
                autoFocus
              />
            )}
          </Box>

          <StyledIconButton type="button" onClick={() => setSearchActive(!searchActive)} opened={searchActive ? 1 : 0}>
            {searchActive ? <CloseIcon /> : <SearchIcon />}
          </StyledIconButton>

          <Box pl={2}>
            <FilterButton
              numberOfFilters={numberOfFilters}
              isOpen={isOpen}
              handleDrawerOpen={handleDrawerOpen}
              handleDrawerClose={handleDrawerOpen}
            >
              {numberOfFilters ? t('Filter') : buttonLabel}
            </FilterButton>
          </Box>
        </Box>
      </Box>
    </StyledBox>
  );
};

SearchComponent.propTypes = {
  title: string.isRequired,
  isOpen: bool.isRequired,
  buttonLabel: string.isRequired,
  handleDrawerOpen: func.isRequired,
};

export default SearchComponent;
