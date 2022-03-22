import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import capitalize from '@material-ui/core/utils/capitalize';
import { isDefined } from '../../../utils/helpers';
import { StyledOptionsPaper } from '../../SwitchUser/styled';
import { StyledListItem, StyledList, StyledPopover } from './styled';

const Popover = ({ open, anchorEl, handleClose, width, lastItemDanger, options, handleSelect }) => {
  const { t } = useTranslation();

  return (
    <StyledPopover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      width={width}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      PaperProps={{ component: StyledOptionsPaper }}
    >
      <StyledList onClick={handleClose} lastItemDanger={lastItemDanger}>
        {options &&
          options.map((option) => (
            <StyledListItem
              key={option?.label}
              disabled={option?.disabled}
              onClick={handleSelect ? () => handleSelect(option?.value) : option?.onClick}
              disableRipple
              $isSelect={isDefined(option?.value)}
            >
              {capitalize(t(option?.label) ?? '')}
            </StyledListItem>
          ))}
      </StyledList>
    </StyledPopover>
  );
};

Popover.propTypes = {
  anchorEl: PropTypes.shape({}),
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      value: PropTypes.string,
      label: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  lastItemDanger: PropTypes.bool,
  width: PropTypes.string,
  handleSelect: PropTypes.func,
};
Popover.defaultProps = {
  anchorEl: {},
  lastItemDanger: false,
  width: undefined,
  handleSelect: undefined,
};

export default Popover;
