import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import { arrayOf, node, string, func, objectOf, bool } from 'prop-types';
import CallMadeIcon from '@material-ui/icons/CallMadeRounded';
import capitalize from '@material-ui/core/utils/capitalize';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Menu } from '@material-ui/core';
import { StyledIcon, StyledDropdownIcon } from './styled';
import THEME from '../../../constants/theme';

const useStyles = makeStyles(() => ({
  paper: {
    borderRadius: '6px !important',
    minWidth: ({ maxWidth }) => (maxWidth ? 'min-content' : '160px !important'),
    boxShadow: ' 0px 2px 4px rgba(0, 0, 0, 0.02) !important',
    border: '0.5px solid rgba(193, 195, 198, 0.3) !important',
    maxWidth: ({ maxWidth }) => maxWidth || '100%',
  },
  list: {
    borderRadius: '8px',
    color: '#000 !important',
    padding: '4px',
    '& li': {
      fontWeight: '600',
      borderRadius: '6px',

      '&:hover': {
        height: 'min-content',
        background: THEME.primaryColors.lightBlue,

        '& svg': {
          color: THEME.primaryColors.primary,
          stroke: THEME.primaryColors.primary,
        },
      },

      '&:last-child': {
        color: ({ lastItemDanger }) => (lastItemDanger ? '#B74242 !important' : '#232629 !important'),

        '&:hover': {
          color: ({ lastItemDanger }) => lastItemDanger && '#B74242 !important',
        },
      },
    },
  },
}));

/* TODO: rework asap */
const DropDownMenu = ({
  options,
  button,
  id,
  handleShow,
  freezHover,
  transformOrigin,
  anchorOrigin,
  lastItemDanger,
  maxWidth,
  width,
}) => {
  const classes = useStyles({ maxWidth, lastItemDanger });
  const [anchorEl, setAnchorEl] = useState(null);
  const { t } = useTranslation();

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    freezHover(true);
  };
  const handleChoose = (event, option, key) => {
    event.stopPropagation();
    option[key]?.(event, id);
    setAnchorEl(null);
    handleShow(false);
    freezHover(false);
  };
  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
    handleShow(false);
    freezHover(false);
  };
  const renderOption = (option, key) => {
    const withIcon = key?.includes('.com');
    return (
      <MenuItem key={key} onClick={(event) => handleChoose(event, option, key)}>
        {capitalize(t(key) ?? '')}
        {withIcon && (
          <StyledIcon>
            <CallMadeIcon />
          </StyledIcon>
        )}
      </MenuItem>
    );
  };

  const renderOptions = (incomeOptions) => {
    return incomeOptions.map((option) => {
      const dataKeys = Object.keys(option ?? {});
      return dataKeys?.map((key) => renderOption(option, key));
    });
  };

  return (
    <>
      <StyledDropdownIcon aria-haspopup="true" aria-controls={id} onClick={handleClick}>
        {button}
      </StyledDropdownIcon>

      <Menu
        id={id}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        getContentAnchorEl={null}
        classes={classes}
        PaperProps={{
          style: {
            width: width ?? 200,
            zIndex: '10000',
            fontSize: 14,
          },
        }}
      >
        {renderOptions(options)}
      </Menu>
    </>
  );
};

DropDownMenu.propTypes = {
  options: arrayOf(objectOf(func)),
  button: node.isRequired,
  id: string.isRequired,
  handleShow: func,
  freezHover: func,
  transformOrigin: objectOf(string),
  anchorOrigin: objectOf(string),
  lastItemDanger: bool,
  maxWidth: string,
  width: string,
};

DropDownMenu.defaultProps = {
  lastItemDanger: false,
  options: [],
  handleShow: () => null,
  freezHover: () => null,
  transformOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
  maxWidth: undefined,
  width: '',
};
export default DropDownMenu;
