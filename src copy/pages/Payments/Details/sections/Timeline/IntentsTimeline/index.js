import React, { useMemo } from 'react';
import { string, shape } from 'prop-types';
import Box from '@material-ui/core/Box/index';
import Tabs from '../../../../../../components/common/Tabs';
import Overview from '../tabs/Overview';

const Timeline = ({ data }) => {
  const value = useMemo(
    () => [
      {
        title: 'Checkout started',
        time: data.date ?? '',
      },
      {
        title: 'Shipping Address Complete',
        time: data.shipping?.date || '',
      },
      {
        title: 'Delivery Address Complete',
        time: data.delivery?.date || '',
      },
      {
        title: 'Payment Complete',
        time: data.paymentIntent?.date || '',
      },
    ],
    [data]
  );

  return (
    <Box component="section" mt="54px">
      <Tabs
        tabs={[
          {
            label: 'All activity',
            node: <Overview value={value} />,
          },
        ]}
      />
    </Box>
  );
};

Timeline.propTypes = {
  data: shape({
    date: string,
    shipping: shape({
      date: string,
    }),
    delivery: shape({
      date: string,
    }),
    paymentIntent: shape({
      date: string,
    }),
  }).isRequired,
};

export default Timeline;
