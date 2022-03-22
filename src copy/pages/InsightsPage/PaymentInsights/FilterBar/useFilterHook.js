import { useCallback, useEffect, useState } from 'react';
import moment from 'moment';

import { useGetCountries } from '../../../../hooks/useGetOptions';
import useFilter from '../../../../hooks/useFilter';
import {
  getAfterDate,
  getBeforeDate,
  getDateRange,
  RANGE_DICTIONARY,
  RANGE_TYPE_DICTIONARY,
  transformDateValues,
} from './constant';

const useFilterHook = (defaultValue) => {
  const { options } = useGetCountries();
  const [dateRange, setDateRange] = useState(getDateRange(RANGE_DICTIONARY.thisWeek));
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useFilter();

  useEffect(() => {
    if (options.length > 0) {
      const array = options.map((item) => {
        return {
          text: {
            text: item.title,
          },
          value: item.value,
        };
      });
      setCountries(array);
      setCountry(array[0].value);
    }
  }, [options]);

  const handlePresetFilter = useCallback(
    ({ target: { value } }, shouldReplace) => {
      const range = getDateRange(value);
      const { date, ...prevFilter } = filter;
      const { gt, lt } = range ? transformDateValues(range) : {};
      setFilter(
        {
          ...prevFilter,
          ...(range && { date: { gt, lt } }),
          rangeType: RANGE_TYPE_DICTIONARY.between,
        },
        shouldReplace
      );
    },
    [filter, setFilter]
  );

  const handleCountryFilter = useCallback(
    ({ target: { value } }) => {
      setCountry(value);
      setFilter({ ...filter, country: value });
    },
    [filter, setFilter]
  );

  const handleDateRange = useCallback(
    (range) => {
      const { gt, lt, gtStartOfYear, today } = transformDateValues(range);

      if (filter?.rangeType === RANGE_TYPE_DICTIONARY.before) {
        setFilter({ ...filter, date: { gt: gtStartOfYear, lt: getBeforeDate(range?.startDate) } });
        return;
      }

      if (filter?.rangeType === RANGE_TYPE_DICTIONARY.after) {
        setFilter({ ...filter, date: { gt: getAfterDate(range?.startDate), lt: today } });
        return;
      }

      if (filter?.rangeType === RANGE_TYPE_DICTIONARY.between) {
        setFilter({ ...filter, date: { gt, lt } });
        return;
      }

      setFilter({ ...filter, date: { gt, lt } });
    },
    [setFilter, filter]
  );

  const handleRangeType = useCallback(
    (type) => {
      const startOfYear = moment()
        .startOf('year')
        .toISOString();

      const today = moment()
        .endOf('day')
        .toISOString();

      if (type === RANGE_TYPE_DICTIONARY.before) {
        setFilter({
          ...filter,
          date: {
            ...filter?.date,
            lt: getBeforeDate(filter?.date?.gt),
            gt: startOfYear,
          },
          rangeType: type,
        });
        return;
      }

      if (type === RANGE_TYPE_DICTIONARY.after) {
        setFilter({
          ...filter,
          date: {
            ...filter?.date,
            gt: getAfterDate(filter?.date?.lt),
            lt: today,
          },
          rangeType: type,
        });
        return;
      }

      if (type === RANGE_TYPE_DICTIONARY.between) {
        setFilter({ ...filter, rangeType: type });
        return;
      }

      setFilter({ ...filter, rangeType: type });
    },
    [filter, setFilter]
  );

  //set default date filter if there is no date filter applied
  useEffect(() => {
    if (!filter?.date) {
      handlePresetFilter({ target: { value: defaultValue ?? RANGE_DICTIONARY.thisWeek } }, true);
    }
  }, [defaultValue, filter, handlePresetFilter]);

  //set rangeType if it doesn't exist
  useEffect(() => {
    if (!filter?.rangeType) {
      setFilter({ ...filter, rangeType: RANGE_TYPE_DICTIONARY.between }, true);
    }
  }, [filter, setFilter]);

  //set there is date filter, sync them with state
  useEffect(() => {
    if (filter?.date) {
      setDateRange({ startDate: filter?.date?.gt, endDate: filter?.date?.lt });
    }
  }, [filter?.date]);

  return {
    handleCountryFilter,
    handlePresetFilter,
    handleDateRange,
    dateRange,
    countries,
    country,
    handleRangeType,
  };
};

export default useFilterHook;
