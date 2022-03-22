import 'date-fns';
import React, { useState } from 'react';
import { func, shape, string } from 'prop-types';
import Grid from '@material-ui/core/Grid';

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import { StyledGrid, StyledButtonCover } from './styled';
import { Button, L12 } from '../../atoms';
import THEME from '../../../constants/theme';

const DateRangePicker = ({ action, value }) => {
  const [selectedDateStart, setSelectedDateStart] = useState(
    value?.start
      ? value.start
      : moment()
          .utc()
          .startOf('day')
          .toISOString()
  );
  const [selectedDateEnd, setSelectedDateEnd] = useState(
    value?.end
      ? value.end
      : moment()
          .utc()
          .endOf('day')
          .toISOString()
  );
  const [errors, setErrors] = useState({});

  const validateDate = (date, key) => {
    const valid =
      key === 'start'
        ? moment().diff(date) > 0 && moment(date).diff(selectedDateEnd) < 0
        : moment(selectedDateStart).diff(date) < 0;

    if (!valid) {
      setErrors({ [key]: 'Date is not Valid' });
    }
    return valid;
  };

  const handleDateChange = (date) => {
    setErrors({});
    validateDate(date, 'start');
    setSelectedDateStart(
      moment(date)
        .startOf('day')
        .toISOString()
    );
  };

  const handleDateChangeEnd = (date) => {
    setErrors({});
    validateDate(date, 'end');
    setSelectedDateEnd(
      moment(date)
        .endOf('day')
        .toISOString()
    );
  };

  const handleDateSubmit = () => {
    validateDate();
    if (Object.keys(errors).length === 0) {
      action({ start: selectedDateStart, end: selectedDateEnd });
    }
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <StyledGrid container spacing={2}>
        <Grid item md={5} sm={12} xs={12}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Start Date"
            value={selectedDateStart && selectedDateStart.toString()}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          {errors.start && (
            <L12 margin="10px 0 10px 0" color={THEME.secondaryColors.danger}>
              {errors.start}
            </L12>
          )}
        </Grid>
        <Grid item md={5} sm={12} xs={12}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="End Date"
            value={selectedDateEnd && selectedDateEnd.toString()}
            onChange={handleDateChangeEnd}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          {errors.end && (
            <L12 margin="10px 0 10px 0" color={THEME.secondaryColors.danger}>
              {errors.end}
            </L12>
          )}
        </Grid>
        <StyledButtonCover item md={2} sm={12} xs={12}>
          <Button className="blue" smaller onClick={() => handleDateSubmit()}>
            Ok
          </Button>
        </StyledButtonCover>
      </StyledGrid>
    </MuiPickersUtilsProvider>
  );
};

DateRangePicker.propTypes = {
  action: func.isRequired,
  value: shape({
    start: string,
    end: string,
  }),
};

DateRangePicker.defaultProps = {
  value: {
    start: undefined,
    end: undefined,
  },
};

export default DateRangePicker;
