import React from 'react';
import { components } from 'react-select';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import head from 'lodash/head';
import { StyledOptionWrapper } from './styled';
import { CircleIndicator } from '../../../atoms/Indicator';
import { PAYMENT_METHOD_ICON_MAP } from '../../../../assets/icons/PaymentMethods';

const ReactSelectOption = ({ options, value, ...props }) => {
  const type = head(options)?.label;

  return (
    <StyledOptionWrapper className="custom-option">
      {(() => {
        switch (type) {
          case 'status': {
            return <CircleIndicator variant={value?.toLowerCase()} />;
          }
          case 'paymentMethod': {
            const Icon = PAYMENT_METHOD_ICON_MAP[value] ?? PAYMENT_METHOD_ICON_MAP.UNKNOWN_CARD;
            return <Icon />;
          }
          default: {
            return null;
          }
        }
      })()}
      <Box width="100%" marginLeft={type === 'status' ? '0' : '10px'}>
        <components.Option {...props} />
      </Box>
    </StyledOptionWrapper>
  );
};

ReactSelectOption.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      options: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string,
          label: PropTypes.string,
        })
      ),
      label: PropTypes.string,
    })
  ),
  value: PropTypes.string,
};

ReactSelectOption.defaultProps = {
  options: [],
  value: '',
};

export default ReactSelectOption;
