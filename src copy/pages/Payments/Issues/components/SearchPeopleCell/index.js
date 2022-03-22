import React, { useState } from 'react';
import { func, string } from 'prop-types';
import { Box } from '@material-ui/core';
import SearchPeoplePopover from './SearchPeoplePopover';
import { StyledButton } from '../styled';
import { useGetInvitedUsers } from '../../../../../hooks/useGetInvitedUsers';

const SearchPeople = ({ handleChange, children, padding, pseudoWidth }) => {
  const [search, setSearch] = useState('');
  const { loading, users: usersSearchData } = useGetInvitedUsers();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (e) => {
    e.stopPropagation();
    return setAnchorEl(e.currentTarget);
  };
  const handleClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const searchedUsersValues =
    search.length === 0
      ? usersSearchData
      : usersSearchData.filter((user) => {
          return user?.name?.toLowerCase()?.includes(search) || user?.email?.toLowerCase()?.includes(search);
        });

  return (
    <Box>
      <StyledButton type="button" onClick={handleOpen} $padding={padding} $pseudoWidth={pseudoWidth}>
        <div>{children}</div>
      </StyledButton>
      <SearchPeoplePopover
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        searchedUsersValues={searchedUsersValues}
        handleSelect={handleChange}
        loading={loading}
        search={search}
        setSearch={setSearch}
        width="300px"
      />
    </Box>
  );
};

SearchPeople.propTypes = {
  handleChange: func.isRequired,
  padding: string,
  pseudoWidth: string,
};
SearchPeople.defaultProps = {
  padding: undefined,
  pseudoWidth: undefined,
};

export default SearchPeople;
