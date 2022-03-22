import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import Title from '../Header/Title';
import { FilterListIcon } from '../../../assets/icons';
import { CustomStyledButton, StyledBadge } from './styled';
import useSearch from '../../../hooks/useSearch';
import { useRightAsideContext } from '../../../providers/RightAsideProvider';
import CustomSwitch from '../../../components/atoms/Switcher/CustomSwitch';
import useFilter from '../../../hooks/useFilter';
import THEME from '../../../constants/theme';

const RESOLVED_KEY = 'resolved';

const Header = ({ drawerOpen, toggleDrawer }) => {
  const { toggleGlobalFilterState } = useRightAsideContext();
  const { t } = useTranslation();
  const [searchParams] = useSearch();
  const numberOfFilters = searchParams?.filter ? Object.keys(searchParams?.filter)?.length : 0;
  const filterIsActive = numberOfFilters > 0;

  const [filter, setFilter] = useFilter();

  const handleDrawer = useCallback(() => {
    toggleDrawer();
    toggleGlobalFilterState(!drawerOpen);
  }, [toggleDrawer, drawerOpen, toggleGlobalFilterState]);

  const handleShowIssuesResolvedClick = () => {
    if (Array.isArray(filter?.issueStatus) && filter?.issueStatus?.includes(RESOLVED_KEY)) {
      setFilter({ ...filter, issueStatus: filter?.issueStatus?.filter((status) => status !== RESOLVED_KEY) });
    } else {
      setFilter({ ...filter, issueStatus: [...(filter?.issueStatus || []), RESOLVED_KEY] });
    }
  };

  return (
    <Box display="flex" alignItems="center" mb="24px">
      <Box flexGrow="1">
        <Title primary="Issues" />
      </Box>

      <Box display="flex" alignItems="center">
        <Box display="flex" alignItems="center" margin="0 26px 0 0">
          <CustomSwitch
            label="Show resolved"
            checked={filter?.issueStatus?.includes('resolved')}
            onClick={handleShowIssuesResolvedClick}
          />
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
    </Box>
  );
};

Header.propTypes = {
  drawerOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default Header;
