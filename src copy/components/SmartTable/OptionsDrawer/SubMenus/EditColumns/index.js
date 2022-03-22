import React, { useState, useMemo } from 'react';
import { Box } from '@material-ui/core';
import get from 'lodash/get';
import { SearchBar } from '../../../../atoms';
import { StyledWrapper } from './styled';
import ColumnSection from './ColumnSection';
import useTableContext from '../../../TableContext';
import { FlexContainer } from '../../../../atoms/flex/FlexContainer';

const EditColumns = () => {
  const [search, setSearch] = useState('');
  const { localHiddenColumn, headerGroups, headCells: availableColumns } = useTableContext();
  const headCells = useMemo(() => headerGroups[0]?.headers ?? [], [headerGroups]);

  const hiddenList = useMemo(
    () => availableColumns.filter((column) => localHiddenColumn?.includes(column.accessor)) ?? [],
    [availableColumns, localHiddenColumn]
  );

  const filteredList = useMemo(
    () =>
      [...headCells, ...hiddenList].filter((item) => {
        const value = get(item, 'Header');
        return value?.toLowerCase().indexOf(search?.toLowerCase()) > -1;
      }),
    [search, headCells, hiddenList]
  );

  return (
    <FlexContainer
      justifyContent="flex-start"
      alignItems="flex-start"
      flexDirection="column"
      width="90%"
      flex={1}
      padding="0 10px 0 4px"
      margin=" 0 0 0 20px"
    >
      <StyledWrapper>
        <SearchBar search={search} setSearch={setSearch} borderRadius="6px" paddingX="16px" />
        <Box marginTop="32px">
          {headCells?.length > 0 && search === '' && (
            <ColumnSection type="visible" list={headCells} searchActive={search !== ''} />
          )}
          {hiddenList?.length > 0 && search === '' && (
            <ColumnSection type="hidden" list={hiddenList} searchActive={search !== ''} />
          )}
          {search !== '' && <ColumnSection type="Search" list={filteredList} searchActive={search !== ''} />}
        </Box>
      </StyledWrapper>
    </FlexContainer>
  );
};

export default EditColumns;
