import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import capitalize from '@material-ui/core/utils/capitalize';
import { useTranslation } from 'react-i18next';
import { P14B, P14, CustomSwitch } from '../../../../../../components/atoms';
import { usePaymentFlowContext } from '../../../../paymentFlowContext';
import { parseConnectionId } from './constant';
import THEME from '../../../../../../constants/theme';

const IconFallback = () => <div />;

const checkIsChecked = (enabledPaymentMethods, option) => {
  const parentConnection = enabledPaymentMethods?.find(
    (el) => parseConnectionId(el?.connectionId) === option?.connectionId
  );
  return parentConnection && parentConnection?.methods.includes(option?.value);
};

const PaymentMethodItem = ({ option, handleSwitch }) => {
  const { t } = useTranslation();
  const { enabledPaymentMethods, saving } = usePaymentFlowContext();
  const [isChecked, setIsChecked] = useState(false);
  const Icon = option?.icon ?? IconFallback;

  useEffect(() => {
    setIsChecked(checkIsChecked(enabledPaymentMethods, option));
  }, [enabledPaymentMethods, option]);

  const handleClick = () => {
    if (!saving) {
      setIsChecked(!isChecked);
      handleSwitch(option);
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center" justifyContent="space-between" mr="auto">
        <Box mr="12px">
          <Icon />
        </Box>
        <Box display="flex" alignItems="center">
          <P14B margin="0 12px 0 0">{capitalize(t(option?.label) ?? '')}</P14B>
          <P14 color={THEME.greyColors.grey1}>{capitalize(t(option?.connectionName) ?? '')}</P14>
        </Box>
      </Box>
      <Box>
        <CustomSwitch checked={isChecked} onClick={handleClick} />
      </Box>
    </Box>
  );
};

PaymentMethodItem.propTypes = {
  option: PropTypes.shape({
    connectionIcon: PropTypes.string,
    connectionName: PropTypes.string,
    paymentMethod: PropTypes.string,
    icon: PropTypes.elementType,
    label: PropTypes.string,
  }).isRequired,
  handleSwitch: PropTypes.func.isRequired,
};

export default PaymentMethodItem;
