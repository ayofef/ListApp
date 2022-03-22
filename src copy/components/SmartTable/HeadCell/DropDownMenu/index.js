import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ArrowDownIcon from '@material-ui/icons/KeyboardArrowDownRounded';
import { v4 as uniqueID } from 'uuid';
import Box from '@material-ui/core/Box';
import NotificationManager from 'react-notifications/lib/NotificationManager';
import { useTranslation } from 'react-i18next';

import { useRouteMatch } from 'react-router-dom';
import { StyledWrapper, StyledDropdownWrapper } from './styled';
import MenuItem from './MenuItem';
import useSearchSort from '../../../../hooks/useSearchSort';
import useTableContext from '../../TableContext';
import { usePaymentsHandler } from '../../hooks';
import { SORT_DICTIONARY_UI, getPageDropdownOptions, handleSort } from './constant';

const HeadCellDropDown = ({ id }) => {
  const { t } = useTranslation();
  const [subMenu, setSubMenu] = useState(null);
  const [order, handleRequestSort] = useSearchSort();
  const match = useRouteMatch('/data-tables/:page');
  const page = match?.params?.page;
  const {
    toggleCheckboxEditMode,
    setLocalHiddenColumn,
    setShouldSaveTable,
    shouldSaveTable,
    disableHideColumns,
  } = useTableContext();
  const { handleHideColumn } = usePaymentsHandler({
    setLocalHiddenColumn,
  });

  const isActive = SORT_DICTIONARY_UI[order[id]];
  const dropdownOptions = getPageDropdownOptions(page);

  const handleSubMenu = (event) => {
    event.stopPropagation();
    const { label } = event.currentTarget.dataset;
    setSubMenu(label);
  };

  const subMenuItems = () => dropdownOptions.filter((option) => option?.label === subMenu)[0]?.subMenuLabels ?? [];

  const handleEditMode = () => {
    toggleCheckboxEditMode();
  };

  const hideColumn = () => {
    if (disableHideColumns) {
      NotificationManager.info(t('At least one visible column is required.'), t('Edit columns'), 5000);
      return;
    }
    handleHideColumn(id);

    if (!shouldSaveTable) {
      setShouldSaveTable(true);
    }
  };

  const controlObj = {
    none: (event) => handleSort({ handleRequestSort, id, event }),
    ascending: (event) => handleSort({ handleRequestSort, id, event }),
    descending: (event) => handleSort({ handleRequestSort, id, event }),
    hide: hideColumn,
    'edit columns': handleEditMode,
  };

  return (
    <StyledWrapper>
      <span>
        <ArrowDownIcon color="inherit" fontSize="inherit" />
      </span>

      <StyledDropdownWrapper className="HeadCell_DropdownMenu">
        <Box
          className="dropdown_facade"
          component="i"
          position="absolute"
          top="-4px"
          bgcolor="transparent"
          left="0"
          width="30px"
          height="6px"
        >
          &nbsp;
        </Box>
        <ul>
          {subMenu ? (
            <>
              <MenuItem className="subMenuBack" label={subMenu} withIcon={true} subMenu handleSelect={handleSubMenu} />

              {subMenuItems() &&
                subMenuItems()?.map((subMenuItem) => (
                  <MenuItem
                    isActive={isActive}
                    key={uniqueID()}
                    label={subMenuItem}
                    handleSelect={controlObj[subMenuItem]}
                  />
                ))}
            </>
          ) : (
            dropdownOptions.map(({ label, withIcon }) => (
              <MenuItem
                key={uniqueID()}
                label={label}
                withIcon={withIcon}
                handleSelect={withIcon ? handleSubMenu : controlObj[label]}
              />
            ))
          )}
        </ul>
      </StyledDropdownWrapper>
    </StyledWrapper>
  );
};

HeadCellDropDown.propTypes = {
  id: PropTypes.string.isRequired,
};

export default HeadCellDropDown;
