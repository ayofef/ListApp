import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import Box from '@material-ui/core/Box';
import { useField } from 'formik';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'react-i18next';

import { P14, StyledSelect } from '../../../../../../../components/atoms';
import { NONE_VALUE } from './formSettings';
import EmptyState from './EmptyState';
import { StyledDropdownPaper } from './styled';
import LoadingState from './LoadingState';

const PaymentFlowList = ({ name, linkedPaymentFlows, paymentFlowLoading }) => {
  const [{ value, onChange }] = useField(name);
  const { t } = useTranslation();

  const options = useMemo(
    () => [
      {
        value: NONE_VALUE,
        text: { text: 'None' },
      },
      ...linkedPaymentFlows.map((flow) => ({
        value: flow?.id,
        text: { text: flow?.name },
      })),
    ],
    [linkedPaymentFlows]
  );

  return (
    <Box>
      {paymentFlowLoading && <LoadingState />}
      {!paymentFlowLoading && isEmpty(linkedPaymentFlows) && <EmptyState />}
      {!paymentFlowLoading && !isEmpty(linkedPaymentFlows) && (
        <Box>
          <P14 fontWeight="600">{t('Select a Payment flow')}</P14>

          <StyledSelect
            value={value}
            name={name}
            onChange={onChange}
            options={options}
            paperComponent={StyledDropdownPaper}
            margin="8px 0 12px 0"
          />
        </Box>
      )}
    </Box>
  );
};

PaymentFlowList.propTypes = {
  name: PropTypes.string.isRequired,
  linkedPaymentFlows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  paymentFlowLoading: PropTypes.bool.isRequired,
};

export default PaymentFlowList;
