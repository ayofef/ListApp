import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { P14 } from '../../../../components/atoms';
import { isDefined } from '../../../../utils/helpers';

const DateComponent = ({ dataObj }) => {
  const date = isDefined(dataObj.value) ? moment(dataObj.value).format('MMM DD, LT') : 'N/A';

  return <P14>{date}</P14>;
};

DateComponent.propTypes = {
  dataObj: PropTypes.shape({
    value: PropTypes.string,
  }),
};
DateComponent.defaultProps = {
  dataObj: {},
};

export default DateComponent;
