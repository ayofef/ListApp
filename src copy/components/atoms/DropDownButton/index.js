import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import capitalize from '@material-ui/core/utils/capitalize';
import { useTranslation } from 'react-i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import Popover from '../OptionsMenu/Popover';
import CaretDown from '../../../assets/icons/CaretDown';
import { StyledButton, StyledIcon, StyledSpinnerBox } from './styled';

const ICON_FILL_MAP = {
  primary: '#fff',
  secondary: '#000',
};

const DropdownButton = ({ buttonLabel, buttonColor, width, lastItemDanger, options, loading }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpen = useCallback(({ currentTarget }) => {
    return setAnchorEl(currentTarget);
  }, []);
  const handleClose = useCallback(() => setAnchorEl(null), []);

  const open = Boolean(anchorEl);

  return (
    <>
      <StyledButton type="button" color={buttonColor} variant="contained" onClick={handleOpen}>
        {loading ? (
          <StyledSpinnerBox px="12px">
            <CircularProgress size={24} color="inherit" />
          </StyledSpinnerBox>
        ) : (
          capitalize(t(buttonLabel))
        )}
        <StyledIcon open={open}>
          <CaretDown fill={ICON_FILL_MAP[buttonColor]} />
        </StyledIcon>
      </StyledButton>
      {anchorEl && (
        <Popover
          open={open}
          anchorEl={anchorEl}
          handleClose={handleClose}
          width={width}
          lastItemDanger={lastItemDanger}
          options={options}
        />
      )}
    </>
  );
};

DropdownButton.propTypes = {
  buttonLabel: PropTypes.string,
  buttonColor: PropTypes.oneOf(['primary', 'secondary']).isRequired,
  lastItemDanger: PropTypes.bool,
  width: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      label: PropTypes.string,

      disabled: PropTypes.bool,
    })
  ).isRequired,
  loading: PropTypes.bool,
};

DropdownButton.defaultProps = {
  buttonLabel: 'options',
  lastItemDanger: false,
  width: undefined,
  loading: false,
};

export default DropdownButton;
