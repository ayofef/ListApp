import React, { useMemo } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { useGetConnectionsLists } from '../../../hooks/connectionsHooks';
import { BlockWrap } from '../../../components/atoms';
import DirectoryConnectionItem from '../components/DirectoryConnectionItem';
import TakeAction from '../../../assets/img/TakeAction.svg';
import { filterFields } from '../connectionConsts';
import Drawer from '../../../components/common/SearchComponents/Drawer';
import SearchFilteringHeader from '../../../components/common/SearchComponents/Header';
import Filters from '../components/Filters';
import useSearch from '../../../hooks/useSearch';
import { useRightAsideContext } from '../../../providers/RightAsideProvider';
import IconBoxScreen from '../../../components/common/IconBoxScreen';
import { FlexContainer } from '../../../components/atoms/flex/FlexContainer';

const DirectoryPage = () => {
  const { directoryConnections: connections, loading, error, refetch } = useGetConnectionsLists();
  const { t } = useTranslation();
  const [searchParams] = useSearch();
  const { scope, state, code, ...params } = searchParams;
  const { globalFilterState, toggleGlobalFilterState } = useRightAsideContext();
  const handleDrawer = () => {
    toggleGlobalFilterState();
  };

  const filteredConnections = useMemo(() => {
    if (Object.keys(params).length === 0) {
      return connections;
    }
    return connections.filter((connectionItem) => {
      return Object.keys(params).every((searchKey) => {
        if (searchKey === 'search') {
          return (
            (connectionItem.name || connectionItem.company.name || '')
              .toLowerCase()
              ?.indexOf(params[searchKey].toLowerCase()) > -1
          );
        }
        if (searchKey === 'category') {
          if (params[searchKey] === true) {
            return true;
          }
          return connectionItem.company.categories.some((item) => item === params[searchKey]);
        }

        return connectionItem.status === searchKey;
      });
    });
  }, [connections, params]);

  const noData = useMemo(() => {
    return !loading && (error || filteredConnections?.length === 0);
  }, [loading, error, filteredConnections]);
  const categoryList = useMemo(() => {
    let duplicatedCategories = [];
    connections.forEach((connection) => {
      duplicatedCategories = [...duplicatedCategories, ...(connection.company?.categories || [])];
    });
    return [...new Set(duplicatedCategories)];
  }, [connections]);

  const updatedFilterFields = useMemo(() => {
    return filterFields.map((field) => {
      if (field.key === 'category') {
        field.children = categoryList.map((value) => ({
          value,
          title: value,
        }));
      }
      return field;
    });
  }, [categoryList]);

  const noDataText = useMemo(() => {
    if (!error && Object.keys(params).length > 0) {
      return 'No connections matching your criteria';
    }
    return !error ? t('connections.noLiveConnections') : t('connections.fetchingError');
  }, [params, error, t]);

  return (
    <FlexContainer
      padding="0 32px 16px 32px"
      flexDirection="column"
      alignItems="flex-start"
      flex={1}
      width="100%"
      justifyContent="flex-start"
      backgroundColor="white"
    >
      <BlockWrap width="100%" margin="0 0 16px 0">
        <SearchFilteringHeader
          title={t('connections.directory')}
          buttonLabel="Add filter"
          isOpen={globalFilterState}
          handleDrawerOpen={handleDrawer}
        />
      </BlockWrap>

      {noData && (
        <Box display="flex" margin="0 auto" justifySelf="center" alignItems="center" minHeight="calc(100vh - 182px)">
          <IconBoxScreen
            icon={<img src={TakeAction} alt="" />}
            iconMargin="0"
            description={noDataText}
            padding="60px 200px"
          />
        </Box>
      )}

      <FlexContainer flex={1} alignItems="flex-start" justifyContent="flex-start" width="100%" flexDirection="column">
        <FlexContainer margin="14px 0 32px" width="100%" flexWrap>
          {loading && (
            <BlockWrap flex={1} margin="46px 0 0">
              <Skeleton width="100%" height={224} />
            </BlockWrap>
          )}
          {!loading && (
            <FlexContainer flexWrap margin="0 0 8px" flex={1} alignItems="flex-start" justifyContent="flex-start">
              {filteredConnections.map((connection) => (
                <DirectoryConnectionItem key={connection.id} connection={connection} refetch={refetch} />
              ))}
            </FlexContainer>
          )}
        </FlexContainer>
      </FlexContainer>
      <Drawer open={globalFilterState} handleDrawerClose={handleDrawer}>
        <Filters fields={updatedFilterFields} />
      </Drawer>
    </FlexContainer>
  );
};

export default DirectoryPage;
