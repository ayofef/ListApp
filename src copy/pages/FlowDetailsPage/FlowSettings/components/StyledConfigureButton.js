import PropTypes from 'prop-types';
import React from 'react';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';

import { StyledBar } from './styled';
import { P14, ButtonRounded } from '../../../../components/atoms';
import THEME from '../../../../constants/theme';

const StyledConfigureButton = ({ title, buttonLabel, onClick, disabled }) => {
  const { t } = useTranslation();

  return (
    <StyledBar>
      <P14 color={THEME.greyColors.grey11}>{t(title)}</P14>

      <Box display="flex" alignItems="center" justifyContent="flex-end" className="button-label">
        <ButtonRounded type="button" variant="contained" color="primary" onClick={onClick} disabled={disabled}>
          {t(buttonLabel)}
        </ButtonRounded>
      </Box>
    </StyledBar>
  );
};

StyledConfigureButton.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
StyledConfigureButton.defaultProps = {
  disabled: false,
};

export default StyledConfigureButton;
