import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import TimelineItem from './TimelineItem';

const PAYMENT_ATTEMPT_LABEL = 'Payment attempt';

const PaymentAttemptTimelineItems = ({ paymentAttempts }) => {
  const transformPaymentAttempts = paymentAttempts.map((paymentAttempt, index) => {
    const title = isEmpty(paymentAttempt) ? PAYMENT_ATTEMPT_LABEL : `${PAYMENT_ATTEMPT_LABEL} #${index + 1}`;

    return {
      ...paymentAttempt,
      title,
      key: `${title}_${index}_${paymentAttempt.date || ''}`,
    };
  });

  return (
    <>
      {transformPaymentAttempts.map((paymentAttempt) => (
        <TimelineItem key={paymentAttempt.key} dataObj={paymentAttempt} />
      ))}
    </>
  );
};

PaymentAttemptTimelineItems.propTypes = {
  paymentAttempts: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string,
      date: PropTypes.string,
    })
  ),
};
PaymentAttemptTimelineItems.defaultProps = {
  paymentAttempts: [{}],
};

export default PaymentAttemptTimelineItems;
