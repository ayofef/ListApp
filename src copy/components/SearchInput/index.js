import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import useSearch from '../../hooks/useSearch';
import { StyledWrapper } from './styled';
import ReactSelect from './ReactSelect';
import { StyledIconButton } from '../atoms/Buttons/StyledIconButton';

const SearchInput = ({ searchSelectRef }) => {
  const searchRef = useRef();
  const [{ search }, setSearchParams] = useSearch();
  const [query, setQuery] = useState(search ?? '');
  const [isOpen, setIsOpen] = useState(false);
  const toggleSearchBar = useCallback(() => setIsOpen((prevState) => !prevState), []);

  const onInputChange = (value, action) => {
    if (action.action === 'input-change') {
      setQuery(value);
    }
  };

  useEffect(() => {
    searchRef.current = search;
    setQuery(search ?? '');
  }, [search]);

  useEffect(() => {
    const prevValue = searchRef.current;
    const nextValue = query || undefined;

    if (nextValue === prevValue) {
      return undefined;
    }

    const timerId = setTimeout(() => {
      setSearchParams((prevSearchParams) => {
        return { ...prevSearchParams, search: nextValue };
      });
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [query, setSearchParams]);

  const resetSearch = useCallback(() => {
    setSearchParams('');
    searchSelectRef?.current?.select?.clearValue();
  }, [setSearchParams, searchSelectRef]);

  const handleButton = useCallback(() => {
    if (isOpen) {
      resetSearch();
      toggleSearchBar();
      return;
    }
    toggleSearchBar();
  }, [toggleSearchBar, resetSearch, isOpen]);

  return (
    <Box display="flex" position="relative" pl={2}>
      <StyledWrapper open={isOpen}>
        {isOpen && <ReactSelect onInputChange={onInputChange} query={query} selectRef={searchSelectRef} />}
        <StyledIconButton type="button" onClick={handleButton} opened={isOpen ? 1 : 0}>
          {isOpen ? <CloseIcon /> : <SearchIcon />}
        </StyledIconButton>
      </StyledWrapper>
    </Box>
  );
};

SearchInput.propTypes = {
  searchSelectRef: PropTypes.shape({
    current: PropTypes.shape({
      select: PropTypes.shape({
        clearValue: PropTypes.func,
      }),
    }),
  }),
};
SearchInput.defaultProps = {
  searchSelectRef: {},
};

export default SearchInput;
