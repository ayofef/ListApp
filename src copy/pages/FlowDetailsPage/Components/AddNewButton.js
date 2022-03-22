import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

import AddIcon from './AddIcon';
import { P14 } from '../../../components/atoms';
import THEME from '../../../constants/theme';

const AddNewButton = ({ onClick, label, iconBorderRadius }) => {
  const { t } = useTranslation();

  return (
    <Box display="flex" alignItems="center" className="connection-button connection-button-cta" onClick={onClick}>
      <AddIcon mr="16px" borderRadius={iconBorderRadius} />
      <P14 color={THEME.primaryColors.primary} fontWeight="500">
        {t(label)}
      </P14>
    </Box>
  );
};

AddNewButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  iconBorderRadius: PropTypes.string,
};

AddNewButton.defaultProps = {
  iconBorderRadius: '50%',
};

export default AddNewButton;
