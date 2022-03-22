import React, { useCallback } from 'react';
import { useToggle } from 'react-use';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { useSearchInput } from '../../../hooks/useSearchInput';
import { StyledRoundedTextField } from '../../styled/StyledRoundedTextField';
import { StyledIconButton } from '../../atoms/Buttons/StyledIconButton';

const SearchInput = () => {
  const [isOpen, toggle] = useToggle(false);
  const [value, setValue] = useSearchInput();
  const onChange = useCallback((event) => setValue(event.target.value), [setValue]);

  return (
    <Box display="flex" bgcolor="#fff">
      <Box width="350px" mr="-40px">
        {isOpen && <StyledRoundedTextField opened={isOpen} value={value} onChange={onChange} fullWidth autoFocus />}
      </Box>

      <StyledIconButton type="button" onClick={toggle} opened={isOpen ? 1 : 0}>
        {isOpen ? <CloseIcon /> : <SearchIcon />}
      </StyledIconButton>
    </Box>
  );
};

export default SearchInput;
