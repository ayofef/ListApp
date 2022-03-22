import React from 'react';
import PropTypes from 'prop-types';
import { Box, capitalize } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { P } from '../../atoms';
import { Automation, PaymentGateway } from '../../../assets/icons/FlowList';
import THEME from '../../../constants/theme';

const ICON_MAP = {
  automations: Automation,
  'payment gateways': PaymentGateway,
};

const CardSlab = ({
  title,
  count,
  boxShadow,
  bgcolor,
  width,
  height,
  padding,
  color,
  fontWeight,
  fontSize,
  lineHeight,
}) => {
  const { t } = useTranslation();
  const configured = count > 0;

  const Icon = ICON_MAP[title] ?? ICON_MAP.automation;

  return (
    <Box
      width={width}
      height={height}
      bgcolor={bgcolor}
      borderRadius="8px"
      marginRight="16px"
      p={padding}
      boxShadow={boxShadow}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="50%"
        bgcolor={configured ? THEME.primaryColors.blue : '#787F88'}
        width="24px"
        height="24px"
      >
        <Icon size={16} />
      </Box>

      <Box>
        <P fontSize={fontSize} {...(fontWeight && { fontWeight })} {...(lineHeight && { lineHeight })}>
          {count}
        </P>
        <P fontSize="12px" color={color} {...(fontWeight && { fontWeight })}>
          {capitalize(t(title))}
        </P>
      </Box>
    </Box>
  );
};

CardSlab.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.number, PropTypes?.string]).isRequired,

  boxShadow: PropTypes.string,
  bgcolor: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  padding: PropTypes.string,
  color: PropTypes.string,
  fontWeight: PropTypes.string,
  fontSize: PropTypes.string,
  lineHeight: PropTypes.string,
};
CardSlab.defaultProps = {
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.04)',
  bgcolor: '#fff',
  width: '140px',
  height: '100px',
  padding: '16px 12px',
  color: '#C1C3C6',
  fontWeight: 'normal',
  fontSize: '12px',
  lineHeight: 'initial',
};
export default CardSlab;
