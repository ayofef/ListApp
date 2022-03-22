import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import Title from '../Header/Title';
import { CustomStyledButton, StyledBadge } from '../Issues/styled';
import { FilterListIcon } from '../../../assets/icons';
import { useRightAsideContext } from '../../../providers/RightAsideProvider';
import useSearch from '../../../hooks/useSearch';
import THEME from '../../../constants/theme';

const Header = ({ drawerOpen, toggleDrawer }) => {
  const { toggleGlobalFilterState } = useRightAsideContext();
  const { t } = useTranslation();
  const [searchParams] = useSearch();
  const numberOfFilters = searchParams?.filter ? Object.keys(searchParams?.filter)?.length : 0;
  const filterIsActive = numberOfFilters > 0;

  const handleDrawer = useCallback(() => {
    toggleDrawer();
    toggleGlobalFilterState(!drawerOpen);
  }, [toggleDrawer, drawerOpen, toggleGlobalFilterState]);

  return (
    <Box display="flex" mb="16px" mt="1px">
      <Box display="flex" alignItems="center" flexGrow="1" width="auto" overflow="hidden">
        <Title primary="Intents" />
      </Box>
      <Box ml="auto">
        <CustomStyledButton
          type="button"
          color={filterIsActive ? 'primary' : 'secondary'}
          variant="contained"
          startIcon={<FilterListIcon />}
          onClick={handleDrawer}
          endIcon={filterIsActive ? <StyledBadge badgeContent={numberOfFilters} /> : ''}
        >
          <Box component="span" color={filterIsActive ? 'inherit' : THEME.secondaryColors.black2}>
            {t(`${filterIsActive ? 'Filter' : 'Add Filter'}`)}
          </Box>
        </CustomStyledButton>
      </Box>
    </Box>
  );
};

Header.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default Header;
