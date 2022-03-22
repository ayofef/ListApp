import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';

import { SearchBar } from '../../../atoms';
import { NodeLibraryList } from './NodeLibraryList';
import { DrawerSearchContainer } from './styled';
import THEME from '../../../../constants/theme';

const NodeLibraryComponent = ({ drawerStatus }) => {
  const [search, setSearch] = useState('');
  const { t } = useTranslation();

  return (
    <>
      <DrawerSearchContainer open={drawerStatus}>
        <Box flex={1} pr="16px">
          <SearchBar
            paddingX="16px"
            bgcolor={THEME.primaryColors.white}
            setSearch={setSearch}
            search={search}
            borderRadius="6px"
            placeholder={t('Search nodes ...')}
            noIcon
          />
        </Box>
      </DrawerSearchContainer>
      <NodeLibraryList open={drawerStatus} search={search} />
    </>
  );
};

NodeLibraryComponent.propTypes = {
  drawerStatus: PropTypes.bool.isRequired,
};

export default NodeLibraryComponent;
