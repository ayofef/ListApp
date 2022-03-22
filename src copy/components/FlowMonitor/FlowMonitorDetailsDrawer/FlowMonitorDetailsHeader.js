import React from 'react';
import { arrayOf, func, string } from 'prop-types';
import { StyledSelect } from '../../atoms';
import DateRange from '../../../pages/InsightsPage/PaymentInsights/FilterBar/DateRange';
import { DATE_COMPONENT_CSS, StyledFlowMonitorDetailsHeader } from './styled';
import { isStatusOptions } from './helpers';
import { DATEPICKER_VARIANTS } from '../../../pages/InsightsPage/PaymentInsights/FilterBar/constant';

const FlowMonitorDetailsHeader = ({
  handleDateRange,
  handleRangeType,
  handlePresetFilter,
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <StyledFlowMonitorDetailsHeader>
      <DateRange
        handleDateRange={handleDateRange}
        handleRangeType={handleRangeType}
        handlePresetFilter={handlePresetFilter}
        customPopperCss={DATE_COMPONENT_CSS}
        variant={DATEPICKER_VARIANTS.monitor}
      />

      <StyledSelect
        name="in-status"
        value={selectedStatus}
        label=""
        onChange={(e) => setSelectedStatus(e.target.value)}
        options={isStatusOptions}
        backgroundColor="#fff"
        hoverbg="#fff"
        width="auto"
        height="32px"
        boxSizing="border-box"
        margin="0 0 0 25px"
        fontSize="14px !important"
      />
    </StyledFlowMonitorDetailsHeader>
  );
};

FlowMonitorDetailsHeader.propTypes = {
  handleDateRange: func.isRequired,
  handleRangeType: func.isRequired,
  handlePresetFilter: func.isRequired,
  selectedStatus: arrayOf(string).isRequired,
  setSelectedStatus: func.isRequired,
};

export default FlowMonitorDetailsHeader;
