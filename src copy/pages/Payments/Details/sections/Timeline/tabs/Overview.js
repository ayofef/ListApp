import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

import { UL } from '../../../../../../components/Timeline';
import TimelineHead from './TimelineHead';
import { TIMELINE_KEYS_MAP } from '../../constant';
import TimelineItem from './TimelineItem';
import PaymentAttemptTimelineItems from './PaymentAttemptTimelineItems';

const Overview = ({ value, addMargin, head, isPaymentTimeline }) => {
  return (
    <UL addMargin={addMargin}>
      {value?.length > 0 && <TimelineHead hasLine={value.length > 0} data={head} />}

      <Box position="relative">
        {value.map((timelineItem) => {
          if (timelineItem?.key === TIMELINE_KEYS_MAP.paymentIntent) {
            return (
              <PaymentAttemptTimelineItems key={timelineItem.key} paymentAttempts={timelineItem.paymentAttempts} />
            );
          }

          return <TimelineItem key={timelineItem.key} dataObj={timelineItem} isPaymentTimeline={isPaymentTimeline} />;
        })}
      </Box>
    </UL>
  );
};

Overview.propTypes = {
  value: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      time: PropTypes.string,
      date: PropTypes.string,
    })
  ),
  addMargin: PropTypes.bool,
  head: PropTypes.shape({}),
  isPaymentTimeline: PropTypes.bool,
};

Overview.defaultProps = {
  value: null,
  addMargin: false,
  head: {},
  isPaymentTimeline: false,
};

export default Overview;
