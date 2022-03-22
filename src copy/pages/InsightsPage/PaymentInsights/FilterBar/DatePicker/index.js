import PropTypes, { oneOf } from 'prop-types';
import React from 'react';
import RangeTypeSelect from './RangeTypeSelect';
import DateRangePicker from '../DateComponents/DateRangePicker/index';
import DatePresets from '../DateComponents/DatePresets';
import SingleDatePicker from '../DateComponents/SingleDatePicker';
import { DATEPICKER_VARIANTS, RANGE_TYPE_DICTIONARY } from '../constant';
import useFilter from '../../../../../hooks/useFilter';

import { CustomPopper, StyledOptionsPaper, StyledWrapper } from './styled';

const DatePicker = ({
  anchorEl,
  open,
  handleDateRange,
  handleRangeType,
  togglePopover,
  handlePresetFilter,
  customPopperCss,
  variant,
}) => {
  const [{ rangeType, date: dateRange }] = useFilter();

  const isDateRangeType = rangeType === RANGE_TYPE_DICTIONARY.between;

  const handleDateChange = (value) => {
    const date = typeof value === 'object' && value?.startDate ? value : { startDate: value, endDate: value };
    handleDateRange(date);
    togglePopover();
  };

  return (
    <CustomPopper
      $customPopperCss={customPopperCss}
      open={open}
      anchorEl={anchorEl}
      onClose={togglePopover}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      PaperProps={{ component: StyledOptionsPaper, $isDateRangeType: isDateRangeType }}
    >
      <StyledWrapper>
        <div>
          {dateRange && (
            <RangeTypeSelect dateRange={dateRange} rangeType={rangeType} handleRangeType={handleRangeType} />
          )}
          {isDateRangeType ? (
            <DateRangePicker dateRange={dateRange} handleDateChange={handleDateChange} />
          ) : (
            <SingleDatePicker handleDateChange={handleDateChange} dateRange={dateRange} rangeType={rangeType} />
          )}
        </div>
        <DatePresets variant={variant} handlePresetFilter={handlePresetFilter} togglePopover={togglePopover} />
      </StyledWrapper>
    </CustomPopper>
  );
};

DatePicker.propTypes = {
  anchorEl: PropTypes.shape({}).isRequired,
  handleDateRange: PropTypes.func.isRequired,
  handleRangeType: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  togglePopover: PropTypes.func.isRequired,
  handlePresetFilter: PropTypes.func.isRequired,
  customPopperCss: PropTypes.arrayOf(PropTypes.string),
  variant: oneOf(Object.keys(DATEPICKER_VARIANTS)),
};
DatePicker.defaultProps = {
  customPopperCss: undefined,
  variant: DATEPICKER_VARIANTS.insights,
};
export default DatePicker;
