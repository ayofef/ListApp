import React, { useCallback } from 'react';
import { capitalize } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/KeyboardArrowRightRounded';
import { useLocation } from 'react-router-dom';
import { options, DICTIONARY } from '../constant';
import { StyledWrapper, StyledButton } from './styled';
import useTableContext from '../../TableContext';

const AllOptions = () => {
  const {
    toggleSaveDialog,
    handleReset,
    data,
    setSelected,
    toggleExportDialog,
    setActiveDrawer,
    shouldSaveTable,
  } = useTableContext();
  const location = useLocation();
  const [, page] = location.pathname.split('/').filter(Boolean);
  const handleExport = () => {
    const ids = data?.reduce((acc, item, index) => {
      acc[index] = item?.id;
      return acc;
    }, []);
    setSelected(ids);
    toggleExportDialog();
  };
  const handleSubMenu = useCallback(
    (event) => {
      event.stopPropagation();
      const { label } = event.currentTarget.dataset;

      setActiveDrawer((prevState) => ({ ...prevState, subMenu: label }));
    },
    [setActiveDrawer]
  );

  const actionObj = {
    [DICTIONARY.save]: toggleSaveDialog,
    [DICTIONARY.reset]: handleReset,
    [DICTIONARY.export]: handleExport,
  };

  return (
    <StyledWrapper>
      <ul>
        {options({ page }).map((option) => {
          const Icon = option?.icon;
          if (option.label === DICTIONARY.save && !shouldSaveTable) {
            return <li key={option?.label} />;
          }
          return (
            <li key={option?.label}>
              <StyledButton
                type="button"
                onClick={option?.subMenu ? handleSubMenu : actionObj[option?.label]}
                data-label={option?.label}
              >
                {Icon && <Icon />}
                <span>{capitalize(option?.label)}</span>
                {option?.subMenu && <ArrowRightIcon color="inherit" fontSize="inherit" />}
              </StyledButton>
            </li>
          );
        })}
      </ul>
    </StyledWrapper>
  );
};

export default AllOptions;
