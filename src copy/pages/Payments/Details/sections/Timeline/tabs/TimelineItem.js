import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

import { LI } from './styled';
import IconFormingComponent from './IconFormingComponent';
import { getIconOptions, getStatusColor, TIMELINE_STATUS_MAP } from './constant';

const TimelineItem = ({ dataObj, isPaymentTimeline }) => {
  const { title, time, date, status } = dataObj;

  const currentStatus = isPaymentTimeline ? TIMELINE_STATUS_MAP.COMPLETE : status;

  const timeStamp = time || date;

  const uiDataAndTime = timeStamp ? moment(timeStamp).format('MMM DD, YYYY, LT') : '';

  const { iconSize } = getIconOptions();
  const markColor = getStatusColor(currentStatus);

  return (
    <LI markColor={markColor} iconSize={iconSize} status={currentStatus}>
      <IconFormingComponent time={time} data={date} status={currentStatus} />
      <div>
        <Box position="relative" component="p" m={0} fontSize="14px" fontWeight={600}>
          {title}
        </Box>
        {(time || date) && (
          <Box component="p" m="2px 0 0" fontSize="12px" color="#787F88">
            {uiDataAndTime}
          </Box>
        )}
      </div>
    </LI>
  );
};

TimelineItem.propTypes = {
  dataObj: PropTypes.shape({
    date: PropTypes.string,
    key: PropTypes.string,
    status: PropTypes.string,
    time: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  isPaymentTimeline: PropTypes.bool,
};
TimelineItem.defaultProps = {
  isPaymentTimeline: false,
};

export default TimelineItem;
