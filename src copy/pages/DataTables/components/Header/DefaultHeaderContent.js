import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@material-ui/core';
import useSearchChanges from '../../../../hooks/useSearchChanges';
import SearchInput from '../../../../components/SearchInput';
import { StyledBadge, CustomStyledButton } from './styled';
import { Columns, FilterListIcon, Export } from '../../../../assets/icons';
import { ButtonRounded } from '../../../../components/atoms';
import useSearch from '../../../../hooks/useSearch';
import { useTableStarterContext } from '../../hooks/useTableStarter';
import { useRightAsideContext } from '../../../../providers/RightAsideProvider';
import PlainSearchInput from '../../../../components/common/SearchInput';
import THEME from '../../../../constants/theme';
import { DICTIONARY } from '../../../../components/SmartTable/OptionsDrawer/constant';
import usePermission from '../../../../permissions/hooks/usePermission';
import { PAYMENTS_PERMISSIONS_IDS } from '../../../Payments/permissions';
import { generateUserPilotAttribute } from '../../../../constants/generateUserPilotLabel';

const USER_PILOT_SECTION_ID = 'data-tables';

const DefaultHeaderContent = ({ customButton, disableExport, primaryText }) => {
  const { t } = useTranslation();
  const {
    activeDrawer,
    setActiveDrawer,
    shouldSaveTable,
    selected,
    toggleSaveViewDialog,
    toggleExportDialog,
    searchSelectRef,
  } = useTableStarterContext();
  const { toggleGlobalFilterState } = useRightAsideContext();

  const [hasPaymentManagementPermission] = usePermission(PAYMENTS_PERMISSIONS_IDS.paymentsManagement);

  const [searchParams] = useSearch();
  const { hasChanges } = useSearchChanges();
  const saveTable = shouldSaveTable || hasChanges;

  const numberOfFilters = searchParams?.filter ? Object.keys(searchParams?.filter)?.length : 0;
  const filterIsActive = Boolean(numberOfFilters);
  const CustomButton = customButton;
  const handleDrawer = useCallback(
    (event) => {
      event.stopPropagation();
      const { label } = event.currentTarget.dataset;

      if (activeDrawer?.subMenu === label) {
        setActiveDrawer({});
        toggleGlobalFilterState(false);
        return;
      }

      setActiveDrawer({
        menu: DICTIONARY.options,
        subMenu: label,
      });
      toggleGlobalFilterState(true);
    },
    [setActiveDrawer, activeDrawer?.subMenu, toggleGlobalFilterState]
  );

  return (
    <>
      {/* <Typography component="div">
    <Switch>{t('Group by bank')}</Switch>
  </Typography> */}

      {disableExport ? <PlainSearchInput /> : <SearchInput searchSelectRef={searchSelectRef} />}

      {/** If hasPaymentManagementPermission is false, the button is shown in the bottom drawer component at /src/pages/DataTables/BottomDrawer/index.js */}
      {hasPaymentManagementPermission && selected?.length > 0 && !disableExport && (
        <Box pl={2} flexShrink={0}>
          <ButtonRounded
            type="button"
            color="secondary"
            variant="contained"
            startIcon={<Export size={20} />}
            onClick={toggleExportDialog}
          >
            <Box component="span" color={THEME.secondaryColors.black2}>
              {t('Export')}
            </Box>
          </ButtonRounded>
        </Box>
      )}

      {!disableExport && (
        <Box pl={2} display={saveTable ? 'block' : 'none'} flexShrink={0}>
          <ButtonRounded type="button" color="secondary" variant="contained" onClick={toggleSaveViewDialog}>
            {t('Save view')}
          </ButtonRounded>
        </Box>
      )}

      <Box pl={2} flexShrink={0}>
        <CustomStyledButton
          type="button"
          color={filterIsActive && customButton ? 'primary' : 'secondary'}
          variant="contained"
          startIcon={<Columns />}
          onClick={handleDrawer}
          data-label={DICTIONARY.home}
          {...generateUserPilotAttribute(USER_PILOT_SECTION_ID, primaryText, 'options')}
          {...(customButton && {
            endIcon: filterIsActive && !!numberOfFilters ? <StyledBadge badgeContent={numberOfFilters} /> : '',
          })}
        >
          <Box component="span" color={filterIsActive && customButton ? 'inherit' : THEME.secondaryColors.black2}>
            {t('Options')}
          </Box>
        </CustomStyledButton>
      </Box>

      <Box pl={2} flexShrink={0}>
        {CustomButton ? (
          <CustomButton />
        ) : (
          <CustomStyledButton
            type="button"
            color={filterIsActive ? 'primary' : 'secondary'}
            variant="contained"
            startIcon={<FilterListIcon />}
            onClick={handleDrawer}
            data-label={DICTIONARY.filter}
            endIcon={filterIsActive && !!numberOfFilters ? <StyledBadge badgeContent={numberOfFilters} /> : ''}
          >
            <Box component="span" color={filterIsActive ? 'inherit' : THEME.secondaryColors.black2}>
              {t(`${filterIsActive ? 'Filter' : 'Add filter'}`)}
            </Box>
          </CustomStyledButton>
        )}
      </Box>
    </>
  );
};

DefaultHeaderContent.propTypes = {
  customButton: PropTypes.func,
  disableExport: PropTypes.bool.isRequired,
  primaryText: PropTypes.string,
};
DefaultHeaderContent.defaultProps = {
  customButton: undefined,
  primaryText: 'payments',
};

export default DefaultHeaderContent;
