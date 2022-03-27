import PropTypes from 'prop-types';
import React from 'react';
import capitalize from '@material-ui/core/utils/capitalize';
import { isDefined } from '../../../utils/isDefined';
import { StyledListItem, StyledPopover, StyledOptionsPaper } from './styled';

function Popover({ open, anchorEl, handleClose, width, options }) {
  return (
    <StyledPopover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      width={width}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      PaperProps={{ component: StyledOptionsPaper }}
    >
      {options?.map((option) => (
        <StyledListItem
          key={option?.key}
          $disabled={Boolean(option?.disabled)}
          onClick={option?.onClick}
          disableRipple
          $isSelect={isDefined(option?.value)}
          $dangerItem={Boolean(option?.dangerItem)}
        >
          {capitalize(option?.label ?? '')}
        </StyledListItem>
      ))}
    </StyledPopover>
  );
}

Popover.propTypes = {
  anchorEl: PropTypes.shape({}),
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      label: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ).isRequired,
  width: PropTypes.string,
};
Popover.defaultProps = {
  anchorEl: {},
  width: undefined,
};

export default Popover;
