import { func, string } from 'prop-types';
import React from 'react';
import { StyledSelect } from '../../../../components/atoms';
import { chartUpdateOptions } from './constant';
import DateRange from './DateRange';
import useFilterHook from './useFilterHook';
import { FlexSpaceBetween } from '../../../../components/atoms/flex/FlexSpaceBetween';
import { FlexStart } from '../../../../components/atoms/flex/FlexStart';
import { FlexEnd } from '../../../../components/atoms/flex/FlexEnd';

const FilterBar = ({ setChartDataKey, dataKey }) => {
  const { handlePresetFilter, handleDateRange, handleRangeType } = useFilterHook();

  return (
    <FlexSpaceBetween justifyContent="space-between">
      <FlexStart>
        <DateRange
          handleDateRange={handleDateRange}
          handleRangeType={handleRangeType}
          handlePresetFilter={handlePresetFilter}
        />
      </FlexStart>
      <FlexEnd>
        <StyledSelect
          name="chart-data-key"
          value={dataKey}
          label=""
          onChange={(e) => setChartDataKey(e.target.value)}
          options={chartUpdateOptions}
          backgroundColor="#F5F6F7"
          width="auto"
          height="32px"
          boxSizing="border-box"
          margin="0 0 10px"
          fontSize="12px !important"
        />
      </FlexEnd>
    </FlexSpaceBetween>
  );
};

FilterBar.propTypes = {
  setChartDataKey: func.isRequired,
  dataKey: string.isRequired,
};

export default FilterBar;
