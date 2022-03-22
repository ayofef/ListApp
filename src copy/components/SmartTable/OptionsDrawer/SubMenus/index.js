import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, capitalize } from '@material-ui/core';
import ArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeftRounded';
import CloseIcon from '@material-ui/icons/Close';
import EditColumns from './EditColumns';
import { useStyles, IconButton } from '../../../../pages/Payments/styled';
import { P16B } from '../../../atoms';
import { subMenuHeader, DICTIONARY } from '../constant';
import { StyledHeaderButton } from './styled';
import FilterData from './FilterData';
import useTableContext from '../../TableContext';
// import ThirdPartyData from './ThirdPartyData';

const SubMenus = ({ handleCloseDrawer }) => {
  const { setActiveDrawer, activeDrawer } = useTableContext();
  const subMenu = useMemo(() => activeDrawer?.subMenu, [activeDrawer?.subMenu]);
  const classes = useStyles();
  const header = subMenuHeader[activeDrawer?.subMenu];

  const handleCloseMenu = useCallback(() => {
    setActiveDrawer((prevState) => ({ ...prevState, subMenu: DICTIONARY.home }));
  }, [setActiveDrawer]);

  return (
    <>
      {subMenu !== DICTIONARY.home && (
        <div className={classes.drawerHeader}>
          <StyledHeaderButton type="button" onClick={handleCloseMenu}>
            <Box color="#787F88" mr="4px">
              <ArrowLeftIcon />
            </Box>
            <Box textAlign="left">
              <P16B margin="-3px 0 0 0">{capitalize(header ?? '')}</P16B>
              {/* {menuDescription && <P12 color="#787F88">{capitalize(t(menuDescription))}</P12>} */}
            </Box>
          </StyledHeaderButton>
          <IconButton bgcolor="#fff" onClick={handleCloseDrawer}>
            <CloseIcon />
          </IconButton>
        </div>
      )}
      {subMenu === DICTIONARY.column && <EditColumns />}
      {/*  Hide ThirdPartyData  */}
      {/* {subMenu === DICTIONARY.data && <ThirdPartyData />} */}
      {subMenu === DICTIONARY.filter && <FilterData />}
    </>
  );
};

SubMenus.propTypes = {
  handleCloseDrawer: PropTypes.func.isRequired,
};

export default SubMenus;
