import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useField, useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import { range } from 'lodash';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import get from 'lodash/get';
import Box from '@material-ui/core/Box';
import moment from 'moment';
import { ThemeProvider } from '@material-ui/core/styles';
import { useToggle } from 'react-use';
import { DATE_THEME } from './DateTheme';
import { StyledTimeContainer } from '../../styled';
import { StyledTextField } from '../../../../../components/forms/_common/styled';
import { GT, LT } from '../../../../../utils/filterToSearchParams/constants';
import { AbsoluteBlock, P, StyledSelect } from '../../../../../components/atoms';
import { StyledPaper } from './styled';
import { FlexContainer } from '../../../../../components/atoms/flex/FlexContainer';

/** @description
 * Documentation: https://material-ui-pickers.dev/api/DatePicker
 * */

const FORMAT = 'dd/MM/yyyy';

const minutesOptionsArray = range(0, 60).map((item) => ({
  value: `${(item < 10 && '0') || ''}${item}`,
  text: { text: item },
}));
const hoursOptionsArray = range(1, 13).map((item) => ({
  value: `${(item < 10 && '0') || ''}${item}`,
  text: { text: item },
}));

const dayOptions = [
  {
    value: 'AM',
    text: { text: 'AM' },
  },
  {
    value: 'PM',
    text: { text: 'PM' },
  },
];

const getHours24from12 = (timeObj) => {
  const hours12 = Number(timeObj.hours);
  const hours12fix = Number(timeObj.hours) === 12 ? -12 : 0;
  const pmFix = timeObj.half === 'PM' ? 12 : 0;
  return hours12 + hours12fix + pmFix;
};

const CustomField = ({ name, id }) => {
  const oppositeKey = useMemo(() => name.replace(id, id === LT ? GT : LT), [name, id]);
  const { values, isSubmitting } = useFormikContext();
  const [{ value }, , helpers] = useField(name);
  const [showSelects, toggleShowSelect] = useToggle(false);
  //open calendar
  const [isOpen, setIsOpen] = useState(false);

  // default date passed to state - empty string with moment() returns "Invalid date"
  const defaultDate = value || new Date();

  const helpersRef = useRef(helpers);
  const [time, setTime] = useState({
    hours: moment(defaultDate).format('hh'),
    minutes: moment(defaultDate).format('mm'),
    half: moment(defaultDate).format('A'),
  });

  const { minDate, maxDate } = useMemo(() => {
    const oppositeValue = get(values, oppositeKey, undefined);

    return {
      maxDate: id === GT ? oppositeValue : undefined,
      minDate: id === LT ? oppositeValue : undefined,
    };
  }, [id, oppositeKey, values]);

  useEffect(() => () => helpersRef.current.setValue(undefined), []);

  const onChangeHandler = useCallback(
    (date) => {
      const hours = getHours24from12(time);
      const currentValue = moment(date);
      const newDate = moment(currentValue)
        .set('hours', hours || 0)
        .set('minutes', time.minutes || 0)
        .toISOString();
      helpersRef.current.setValue(newDate);
    },
    [time]
  );

  const handleTimeChange = (data) => {
    const newTime = { ...time, [data.key]: data.value };
    const hours = getHours24from12(newTime);
    const currentValue = moment(value);
    const newValue = moment(currentValue)
      .set('hours', hours)
      .set('minutes', newTime.minutes)
      .toISOString();
    helpersRef.current.setValue(newValue);
    setTime({ ...time, [data.key]: data.value });
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box width="60%" mr="14px">
        <ThemeProvider theme={DATE_THEME}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              id={name}
              name={name}
              value={value}
              variant="inline"
              format={FORMAT}
              placeholder={FORMAT.toUpperCase()}
              inputVariant="outlined"
              minDate={minDate}
              maxDate={maxDate}
              TextFieldComponent={StyledTextField}
              onChange={onChangeHandler}
              disabled={isSubmitting}
              disableFuture
              disableToolbar
              autoOk
              open={isOpen}
              onOpen={() => setIsOpen(true)}
              onClose={() => setIsOpen(false)}
              PopoverProps={{
                PaperProps: { component: StyledPaper },
              }}
            />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </Box>
      {showSelects && (
        <FlexContainer
          onClick={toggleShowSelect}
          zIndex={1}
          top="0"
          left="0"
          position="fixed"
          width="100vw"
          height="100vh"
        />
      )}

      <StyledTimeContainer
        width="40%"
        onClick={showSelects ? () => null : toggleShowSelect}
        border={`1px solid ${showSelects ? '#4E40EF' : '#fff'};`}
        {...(showSelects && { boxShadow: '0 0 2px 1px rgba(150, 160, 255, 0.2)' })}
        backgroundColor="white"
        borderRadius="6px"
        height="40px"
      >
        <P fontSize="12px" color="232629">
          {time.hours}:{time.minutes} {time.half}
        </P>

        {showSelects && (
          <AbsoluteBlock
            width="236px"
            height="64px"
            top="calc(100% + 10px)"
            right="-20px"
            backgroundColor="#FFFFFF"
            boxShadow=" 0px 1px 6px rgba(0, 0, 0, 0.12)"
            borderRadius="6px"
            zIndex={2}
            display="flex"
            justifyContent="space-between"
            padding="16px 16px"
            alignItems="center"
          >
            <FlexContainer width="33%">
              <StyledSelect
                padding="0 32px 0 16px"
                backgroundColor="#F5F6F7"
                value={time.hours}
                onChange={({ target: { value: hoursValue } }) => handleTimeChange({ key: 'hours', value: hoursValue })}
                options={hoursOptionsArray}
                name="hours"
              />
            </FlexContainer>

            <FlexContainer width="33%">
              <StyledSelect
                padding="0 32px 0 16px"
                backgroundColor="#F5F6F7"
                value={time.minutes}
                onChange={({ target: { value: minutesValue } }) =>
                  handleTimeChange({ key: 'minutes', value: minutesValue })
                }
                options={minutesOptionsArray}
                name="minutes"
              />
            </FlexContainer>
            <FlexContainer width="33%">
              <StyledSelect
                padding="0 32px 0 16px"
                backgroundColor="#F5F6F7"
                value={time.half}
                onChange={({ target: { value: halfValue } }) => handleTimeChange({ key: 'half', value: halfValue })}
                options={dayOptions}
                name="half"
              />
            </FlexContainer>
          </AbsoluteBlock>
        )}
      </StyledTimeContainer>
    </Box>
  );
};

CustomField.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default CustomField;
