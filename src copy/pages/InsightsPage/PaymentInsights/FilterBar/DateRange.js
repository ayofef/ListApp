import capitalize from '@material-ui/core/utils/capitalize';
import moment from 'moment';
import { func, string, arrayOf, oneOf } from 'prop-types';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DashboardCalendar } from '../../../../assets/icons';
import useFilter from '../../../../hooks/useFilter';
import { DATEPICKER_VARIANTS, RANGE_TYPE_DICTIONARY, RANGE_TYPE_LABEL_MAP } from './constant';
import DatePicker from './DatePicker';
import { StyledButton, StyledLabel } from './styled';
import ChevronDown from '../../../../assets/icons/ChevronDown';

const getDateLabel = (dateRange, rangeType) => {
  if (!dateRange) throw new Error('Date range is required');

  if (rangeType === RANGE_TYPE_DICTIONARY.before) {
    return `${capitalize(RANGE_TYPE_LABEL_MAP[RANGE_TYPE_DICTIONARY.before] ?? '')} - ${moment(dateRange.lt).format(
      'MMM DD, YYYY'
    )}`;
  }

  if (rangeType === RANGE_TYPE_DICTIONARY.after) {
    return `${capitalize(RANGE_TYPE_LABEL_MAP[RANGE_TYPE_DICTIONARY.after] ?? '')} - ${moment(dateRange.gt).format(
      'MMM DD, YYYY'
    )}`;
  }
  return `${moment(dateRange.gt).format('MMM DD')} - ${moment(dateRange.lt).format('MMM DD')}`;
};

const ID = 'wt-date-picker';

const DateRange = ({ handleDateRange, handleRangeType, handlePresetFilter, customPopperCss, variant }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { t } = useTranslation();
  const [{ date: dateRange, rangeType }] = useFilter();
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const togglePopover = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const Icon = variant !== DATEPICKER_VARIANTS.monitor ? DashboardCalendar : ChevronDown;
  const label = dateRange ? getDateLabel(dateRange, rangeType) : t('All time');
  return (
    <div>
      <StyledButton
        onClick={handleClick}
        aria-describedby={ID}
        type="button"
        smaller
        ghost
        filterBtn
        open={open}
        $variant={variant}
      >
        <Icon />
        <StyledLabel>{label}</StyledLabel>
      </StyledButton>
      {anchorEl && (
        <DatePicker
          anchorEl={anchorEl}
          open={open}
          handleDateRange={handleDateRange}
          togglePopover={togglePopover}
          handleRangeType={handleRangeType}
          rangeType={rangeType}
          dateRange={dateRange}
          handlePresetFilter={handlePresetFilter}
          customPopperCss={customPopperCss}
          variant={variant}
        />
      )}
    </div>
  );
};

DateRange.propTypes = {
  handleDateRange: func.isRequired,
  handleRangeType: func.isRequired,
  handlePresetFilter: func.isRequired,
  customPopperCss: arrayOf(string),
  variant: oneOf(Object.keys(DATEPICKER_VARIANTS)),
};

DateRange.defaultProps = {
  customPopperCss: undefined,
  variant: DATEPICKER_VARIANTS.insights,
};

export default DateRange;
