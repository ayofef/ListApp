import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { DateRangePicker as DateRangePickerComponent } from 'materialui-daterange-picker';
import noop from 'lodash/noop';

import { StyledWrapper } from './styled';

const DateRangePicker = ({ dateRange, handleDateChange }) => {
  return (
    <StyledWrapper>
      <DateRangePickerComponent
        open
        onChange={handleDateChange}
        initialDateRange={{
          startDate: dateRange?.gt,
          endDate: dateRange?.lt,
        }}
        definedRanges={[]} // we have custom defined ranges
        maxDate={moment().endOf('day')}
        wrapperClassName="wt-date-range-picker"
        toggle={noop}
      />
    </StyledWrapper>
  );
};

DateRangePicker.propTypes = {
  dateRange: PropTypes.shape({
    lt: PropTypes.string.isRequired,
    gt: PropTypes.string.isRequired,
  }).isRequired,
  handleDateChange: PropTypes.func.isRequired,
};

export default DateRangePicker;
