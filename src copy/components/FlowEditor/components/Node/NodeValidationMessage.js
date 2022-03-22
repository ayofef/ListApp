import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next';
import THEME from '../../../../constants/theme';

const NodeValidationMessage = ({ visible, isFlowMonitor }) => {
  const { t } = useTranslation();

  return (
    <Box position="absolute" left="50%" bottom="-36px">
      <Box
        position="relative"
        left="-50%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        visibility={visible ? 'visible' : 'hidden'}
        bgcolor="rgba(223, 91, 91, .1)"
        borderRadius="4px"
        color={THEME.statusColors.failed}
        px="8px"
        py="6px"
        m="0 auto"
        fontWeight={600}
        fontSize="12px"
        lineHeight="12px"
        whiteSpace="nowrap"
      >
        {t(isFlowMonitor ? 'Error' : 'Incomplete configuration')}
      </Box>
    </Box>
  );
};

NodeValidationMessage.propTypes = {
  visible: PropTypes.bool.isRequired,
  isFlowMonitor: PropTypes.bool,
};

NodeValidationMessage.defaultProps = {
  isFlowMonitor: false,
};

export { NodeValidationMessage };
