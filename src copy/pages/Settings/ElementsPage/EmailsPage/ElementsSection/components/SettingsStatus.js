import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import { StyledBadge } from '../../../../../../components/atoms/Typography/StyledText';

const SettingsStatus = ({ value, message, status, variant, loading }) => {
  const { t } = useTranslation();
  const fontWeight = value ? '600' : 'normal';
  const color = value ? '#232629' : '#787F88';
  const text = value || t(message);

  return loading ? (
    'Loading...'
  ) : (
    <Box display="flex" flex="1" maxWidth="400px">
      <Box component="p" m="0" fontWeight={fontWeight} color={color}>
        {text}
      </Box>

      {status && (
        <Box m="0 0 0 auto">
          <StyledBadge variant={StyledBadge.variants[variant]}>{t(status)}</StyledBadge>
        </Box>
      )}
    </Box>
  );
};

SettingsStatus.propTypes = {
  value: PropTypes.string,
  message: PropTypes.string,
  status: PropTypes.string,
  variant: PropTypes.oneOf(['fulfilled', 'pending']),
  loading: PropTypes.bool,
};

SettingsStatus.defaultProps = {
  value: '',
  message: '',
  status: '',
  variant: 'pending',
  loading: false,
};

export default SettingsStatus;
