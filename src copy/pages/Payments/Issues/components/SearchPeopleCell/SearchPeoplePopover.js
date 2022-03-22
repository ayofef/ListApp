import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import isEmpty from 'lodash/isEmpty';

import { StyledOptionsPaper } from '../../../../../components/SwitchUser/styled';
import { StyledPopover } from '../../../../../components/atoms/OptionsMenu/styled';
import Processor from '../../../../../components/table/Processor';
import { ListPopoverItem } from '../../styled';
import SearchPeopleInput from './SearchPeopleInput';
import LoadingState from './LoadingState';
import EmptyState from './EmptyState';

const SearchPeoplePopover = ({
  open,
  anchorEl,
  handleClose,
  width,
  searchedUsersValues,
  handleSelect,
  loading,
  search,
  setSearch,
}) => {
  const handleOnSelect = (e, item) => {
    e.stopPropagation();

    handleSelect(item?.id);
    handleClose(e);
  };

  return (
    <StyledPopover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      width={width}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      PaperProps={{ component: StyledOptionsPaper }}
    >
      <Box padding="4px 0 0 6px">
        <Box pr="6px">
          <SearchPeopleInput search={search} setSearch={setSearch} />
        </Box>
        {loading && <LoadingState />}
        {!loading && isEmpty(searchedUsersValues) && <EmptyState search={search} />}
        {!loading && !isEmpty(searchedUsersValues) && (
          <Box height="300px" overflow="auto" pr="6px" pb="6px">
            {searchedUsersValues?.map((item) => (
              <ListPopoverItem onClick={(e) => handleOnSelect(e, item)} key={`ListPopover-${item.name}`}>
                <Processor name={item.name} logo={item.logo} />
              </ListPopoverItem>
            ))}
          </Box>
        )}
      </Box>
    </StyledPopover>
  );
};

SearchPeoplePopover.propTypes = {
  anchorEl: PropTypes.shape({}),
  handleClose: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  search: PropTypes.string.isRequired,
  searchedUsersValues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    })
  ),
  width: PropTypes.string,
};
SearchPeoplePopover.defaultProps = {
  width: undefined,
  searchedUsersValues: [],
  anchorEl: undefined,
};
export default SearchPeoplePopover;
