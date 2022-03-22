import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import DefaultText from './DefaultText';

const DateComponent = ({ value }) => {
  const parsedDate = moment(value).format('MMM DD, LT');
  return <DefaultText value={parsedDate} />;
};
DateComponent.propTypes = {
  value: PropTypes.string.isRequired,
};

export default DateComponent;
