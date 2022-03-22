import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import Box from '@material-ui/core/Box';
import capitalize from '@material-ui/core/utils/capitalize';
import { useTranslation } from 'react-i18next';
import { P14B, CustomSwitch } from '../../../../components/atoms';
import { StyledIconWrapper } from './styled';

const IconFallback = () => <div />;

const PaymentMethodItem = ({ option, handleSwitch, selectedMethods }) => {
  const { t } = useTranslation();
  const Icon = option?.icon ?? IconFallback;
  const isChecked = useMemo(() => selectedMethods?.includes(option?.value), [option?.value, selectedMethods]);

  const handleClick = () => {
    handleSwitch(option?.value);
  };

  return (
    <Box display="flex" alignItems="center">
      <Box display="flex" alignItems="center" justifyContent="space-between" mr="auto">
        <StyledIconWrapper>
          <Icon />
        </StyledIconWrapper>
        <Box>
          <P14B>{capitalize(t(option?.label) ?? '')}</P14B>
        </Box>
      </Box>

      <CustomSwitch checked={isChecked} onClick={handleClick} />
    </Box>
  );
};

PaymentMethodItem.propTypes = {
  option: PropTypes.shape({
    icon: PropTypes.elementType,
    label: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  selectedMethods: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSwitch: PropTypes.func.isRequired,
};

export default PaymentMethodItem;
