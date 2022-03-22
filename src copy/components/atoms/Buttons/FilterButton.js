import React from 'react';
import { withStyles, Badge } from '@material-ui/core';
import PropTypes from 'prop-types';
import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import Box from '@material-ui/core/Box';
import { ButtonRounded } from './ButtonRounded';
import THEME from '../../../constants/theme';

export const StyledBadge = withStyles({
  root: {
    margin: '1px 8px 0 10px',
  },
  badge: {
    padding: '3px',
    backgroundColor: '#4E40EF',
    color: '#fff',
  },
})(Badge);
export const CustomStyledButton = withStyles({
  root: {
    fontSize: ({ fontSize }) => fontSize || '14px',
  },
  containedPrimary: {
    color: '#4E40EF !important',
    boxShadow: 'none !important',
    '& svg': {
      '& rect': {
        fill: '#3023C8',
      },
      '& path': {
        stroke: '#3023C8',
      },
    },
    backgroundColor: '#F5F2FF !important',
    '&:hover': {
      backgroundColor: 'rgba(156, 160, 255, .3) !important',
    },
  },
})(ButtonRounded);

const FilterButton = ({ isOpen, handleDrawerClose, handleDrawerOpen, children, numberOfFilters }) => {
  return (
    <CustomStyledButton
      type="button"
      color={numberOfFilters ? 'primary' : 'secondary'}
      variant="contained"
      startIcon={<FilterListOutlinedIcon />}
      onClick={isOpen ? handleDrawerClose : handleDrawerOpen}
      endIcon={numberOfFilters ? <StyledBadge badgeContent={numberOfFilters} /> : ''}
    >
      <Box component="span" color={numberOfFilters ? 'inherit' : THEME.secondaryColors.black2}>
        {' '}
        {children}
      </Box>
    </CustomStyledButton>
  );
};

FilterButton.propTypes = {
  handleDrawerClose: PropTypes.func.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  numberOfFilters: PropTypes.number.isRequired,
};

export default FilterButton;
