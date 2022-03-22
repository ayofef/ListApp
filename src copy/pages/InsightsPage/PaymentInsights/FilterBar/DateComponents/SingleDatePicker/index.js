import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';

import { MuiPickersUtilsProvider, Calendar } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { ThemeProvider } from '@material-ui/core/styles';
import { DATE_THEME } from '../../../../../Payments/FilterList/fields/DateField/DateTheme';
import { StyledPaper } from './styled';
import { RANGE_TYPE_DICTIONARY } from '../../constant';

const SingleDatePicker = ({ handleDateChange, dateRange, rangeType }) => {
  const date = rangeType === RANGE_TYPE_DICTIONARY.after ? new Date(dateRange.gt) : new Date(dateRange.lt);

  return (
    <ThemeProvider theme={DATE_THEME}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <StyledPaper>
          <Calendar
            date={date}
            maxDate={moment().endOf('day')}
            onChange={handleDateChange}
            disableFuture
            autoOk
            variant="inline"
            rightArrowButtonProps={{
              disableRipple: true,
            }}
            leftArrowButtonProps={{
              disableRipple: true,
            }}
          />
        </StyledPaper>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

SingleDatePicker.propTypes = {
  handleDateChange: PropTypes.func.isRequired,
  dateRange: PropTypes.shape({
    lt: PropTypes.string,
    gt: PropTypes.string,
  }).isRequired,
  rangeType: PropTypes.oneOf([RANGE_TYPE_DICTIONARY.after, RANGE_TYPE_DICTIONARY.before, RANGE_TYPE_DICTIONARY.between])
    .isRequired,
};

export default SingleDatePicker;
