import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import capitalize from '@material-ui/core/utils/capitalize';

import moment from 'moment/moment';
import { useTranslation } from 'react-i18next/src';
import reduceValue from '../../_utils/reduceValue';
import { PAYMENT_METHOD_ICON_MAP } from '../../../../../assets/icons/PaymentMethods';
import { TopBox, TopBoxesWrapper, StyledCardTypeIcon } from '../../../../../components/GridSystem/styled';
import { H2, P14, P12 } from '../../../../../components/atoms';
import THEME from '../../../../../constants/theme';
import { Tag } from '../../../../../components/common/Tag/styled';
import { PAYMENT_STATUS_MAP, INTENT_STATUSES } from '../../constant';
import { STATUS_UI_LABEL_MAP, transformStatusUiLabel } from '../../../../../components/table/Cells/constant';
import { transformUiStatusLabel } from '../constant';
import IntentTrackingId from './components/IntentTrackingId';

const TITLE_COLOR = '#787F88';
const PT = '5px';

const Summary = ({ payment, intentTrackingId, customer }) => {
  const { t } = useTranslation();
  const paymentAmount = payment.amount?.value || payment.amount?.formattedAmount || '';
  const paymentDate = payment.date?.value || payment.date || '';
  const isIntent = INTENT_STATUSES.includes(payment?.status?.value);
  const isRefundPayment = payment?.status?.value === PAYMENT_STATUS_MAP.REFUNDED;
  const isDeclinedPayment = payment?.status?.value === PAYMENT_STATUS_MAP.DECLINED;
  const paymentCustomer = Array.isArray(customer?.value) ? reduceValue(customer.value) : customer;
  const { method, processorStatus, declineCode, refundedAmount } = useMemo(() => {
    const core = reduceValue(payment.paymentCore?.value);
    const outcome = reduceValue(core?.outcome);

    return {
      method: core.paymentMethod,
      processorStatus: core.processorStatus,
      declineCode: outcome?.declineCode,
      refundedAmount: payment?.refundedAmount,
    };
  }, [payment]);

  const paymentStatus = payment.status?.value;
  const cols = useMemo(() => {
    const common = [
      { title: 'Date', children: paymentDate ? moment(paymentDate).format('MMM DD, LT') : 'N/A' },
      { title: 'Customer', children: paymentCustomer?.name || 'Guest' },
    ];

    if (!isIntent) {
      const Icon = PAYMENT_METHOD_ICON_MAP[method] ?? PAYMENT_METHOD_ICON_MAP.UNKNOWN_CARD;
      common.push({
        title: 'Payment Method',
        children: (
          <Box display="flex" justifyContent="flex-start" alignItems="center">
            <StyledCardTypeIcon component="span" $margin="-4px 0 0 0">
              <Icon />
            </StyledCardTypeIcon>
            <Box component="span" mb="4px" ml="8px">
              {method?.toUpperCase() || 'N/A'}
            </Box>
          </Box>
        ),
      });

      common.push({ title: 'Processor Status', children: transformUiStatusLabel(processorStatus) || 'N/A' });

      if (isRefundPayment) {
        common.push({
          title: refundedAmount?.label || 'Refunded Amount',
          children: refundedAmount?.value || 'N/A',
        });
      }

      if (isDeclinedPayment) {
        common.push({ title: 'Decline Reason', children: transformUiStatusLabel(declineCode) || 'N/A' });
      }
    }

    return common;
  }, [
    declineCode,
    method,
    paymentDate,
    processorStatus,
    refundedAmount,
    isRefundPayment,
    isDeclinedPayment,
    isIntent,
    paymentCustomer,
  ]);

  return (
    <Box component="section" mt="34px" mb="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <P12 color={THEME.greyColors.grey18}>{capitalize(t(isIntent ? 'Intent' : 'Payment'))}</P12>
        {isIntent && intentTrackingId && <IntentTrackingId intentTrackingId={intentTrackingId} />}
      </Box>

      <Box alignItems="center" display="flex" mt="-4px" mb="25px">
        <H2 fontSize="32px" mr="16px" fontWeight="700">
          {paymentAmount}
        </H2>
        {paymentStatus && (
          <Box ml="16px">
            <Tag variant={paymentStatus?.toLowerCase()}>
              {STATUS_UI_LABEL_MAP[paymentStatus]?.toUpperCase() || transformStatusUiLabel(paymentStatus)}
            </Tag>
          </Box>
        )}
      </Box>

      <TopBoxesWrapper>
        {cols.map((col) => (
          <TopBox key={col.title}>
            <P14 color={TITLE_COLOR}>{t(col.title)}</P14>

            <Box pt={PT}>
              {col.children && col.children !== 'N/A' ? col.children : null}
              {(!col.children || col.children === 'N/A') && <span>N/A</span>}
            </Box>
          </TopBox>
        ))}
      </TopBoxesWrapper>
    </Box>
  );
};

Summary.propTypes = {
  payment: PropTypes.shape({
    trackingId: PropTypes.string,
    amount: PropTypes.shape({
      value: PropTypes.string,
      formattedAmount: PropTypes.string,
    }),
    status: PropTypes.shape({
      isEditable: PropTypes.bool,
      label: PropTypes.string,
      type: PropTypes.string,
      value: PropTypes.string,
    }),
    type: PropTypes.shape({
      value: PropTypes.string,
    }),
    date: PropTypes.shape({
      isEditable: PropTypes.bool,
      label: PropTypes.string,
      type: PropTypes.string,
      value: PropTypes.string,
    }),
    paymentCore: PropTypes.shape({
      value: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string,
          value: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
            PropTypes.shape({}),
            PropTypes.arrayOf(PropTypes.shape({})),
          ]),
        })
      ),
    }),
    paymentGateway: PropTypes.shape({
      value: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string,
          value: PropTypes.string,
        })
      ),
    }),
    refundedAmount: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
    intent: PropTypes.shape({
      value: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
        })
      ),
    }),
  }).isRequired,
  intentTrackingId: PropTypes.string,
  customer: PropTypes.oneOfType([
    PropTypes.shape({
      name: PropTypes.string,
    }),
    PropTypes.shape({
      value: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  ]).isRequired,
};
Summary.defaultProps = {
  intentTrackingId: undefined,
};

export default Summary;
