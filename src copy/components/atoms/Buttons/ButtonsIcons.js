import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { string, arrayOf, func, shape } from 'prop-types';
import Button from './Button';

import SimplePopover from '../../modals/Popover';
import THEME from '../../../constants/theme';
import { L14 } from '../Typography/L14';
import { FlexContainer } from '../flex/FlexContainer';

const useStyles = makeStyles(() => ({
  root: {
    flexWrap: 'wrap',

    '& > *': {
      marginRight: '8px!important',
      marginBottom: '8px!important',
    },
  },
}));

const ButtonsIcons = ({ bgButton, buttonsList, clearFilter }) => {
  const classes = useStyles({ bg: bgButton });
  return (
    <FlexContainer justifyContent="flex-start" className={classes.root} margin="12px 0">
      {buttonsList.map((item) => (
        <SimplePopover key={item.name} {...item} />
      ))}

      <Button link transparent margin="0 8px" onClick={clearFilter}>
        <L14 color={THEME.secondaryColors.blue}>Clear Filters</L14>
      </Button>
    </FlexContainer>
  );
};

ButtonsIcons.propTypes = {
  bgButton: string.isRequired,
  buttonsList: arrayOf(
    shape({
      name: string.isRequired,
    })
  ).isRequired,
  clearFilter: func,
};

ButtonsIcons.defaultProps = {
  clearFilter: () => {},
};

export default ButtonsIcons;
