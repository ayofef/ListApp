import React, { useMemo } from 'react';
import { shape, arrayOf } from 'prop-types';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'react-i18next/src/index';
import Overview from './tabs/Overview';
import IntentIcon from '../../../../../assets/icons/TimelineIcons/IntentIcon';
import PaymentIcon from '../../../../../assets/icons/TimelineIcons/PaymentIcon';
import { INTENT_TIMELINE_ARRAY, TIMELINE_KEYS_MAP } from '../constant';
import { TimetableLine } from './tabs/styled';
import FinishIcon from '../../../../../assets/icons/TimelineIcons/FinishIcon';
import TimelineHead from './tabs/TimelineHead';
import { P16B } from '../../../../../components/atoms';

const headConsts = {
  intent: {
    title: 'Intent',
    comment: 'Potential sales',
    icon: IntentIcon,
    iconSize: '16',
  },
  payment: {
    title: 'Payment',
    comment: 'Finishing payment',
    icon: PaymentIcon,
    iconSize: '16',
  },
  finish: {
    title: '',
    comment: 'Finished payment',
    icon: FinishIcon,
    iconSize: '16',
  },
};

const Timeline = ({ timelineData }) => {
  const { t } = useTranslation();

  const paymentDataArray = useMemo(() => timelineData?.paymentData?.value || [], [timelineData]);
  const paymentData = useMemo(() => {
    let flowsData = {};
    let paymentTimeline = {};
    let intentData = {};
    paymentDataArray.forEach((item) => {
      switch (item.key) {
        case 'overview':
          paymentTimeline = item;
          break;
        case 'intent':
          intentData = item;
          break;
        case 'flows':
          flowsData = item;
          break;
        default:
          return null;
      }
      return null;
    });
    return {
      paymentTimeline,
      flowsData,
      intentData,
    };
  }, [paymentDataArray]);

  const paymentTimeline = paymentData?.paymentTimeline?.value?.map((timelineItem) => ({
    ...timelineItem,
    key: `${timelineItem.title?.split(' ')?.join('_')}_${timelineItem.time}`,
  }));

  const intentData = useMemo(() => {
    return INTENT_TIMELINE_ARRAY.map(({ key, title }) => {
      if (key === TIMELINE_KEYS_MAP.paymentIntent) {
        return {
          key,
          title,
          paymentAttempts: timelineData?.intentData?.[key],
        };
      }

      return {
        ...timelineData?.intentData?.[key],
        key,
        title,
      };
    });
  }, [timelineData]);

  return (
    <Box component="section" maxWidth="336px">
      <P16B>{t('Timeline')}</P16B>
      <Box position="relative" mt="8px">
        <TimetableLine />
        <Overview head={headConsts?.intent} value={intentData || []} />
        <Overview head={headConsts?.payment} value={paymentTimeline || []} isPaymentTimeline />
        <TimelineHead hasLine={false} data={headConsts.finish} />
      </Box>
    </Box>
  );
};

Timeline.propTypes = {
  timelineData: shape({
    paymentData: shape({
      value: arrayOf(shape({})),
    }),
    intentData: shape({
      value: shape({}),
    }),
  }).isRequired,
};

export default Timeline;
