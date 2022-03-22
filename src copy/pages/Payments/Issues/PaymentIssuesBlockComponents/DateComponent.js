import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { P14 } from '../../../../components/atoms';

const DateComponent = ({ issueData, dataKey }) => {
  return <P14>{moment(issueData[dataKey]).format('MMM DD, LT')}</P14>;
};

DateComponent.propTypes = {
  dataKey: PropTypes.string.isRequired,
  issueData: PropTypes.shape({}).isRequired,
};

export default DateComponent;
