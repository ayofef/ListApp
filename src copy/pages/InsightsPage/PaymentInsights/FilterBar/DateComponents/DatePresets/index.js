import PropTypes, { oneOf } from 'prop-types';
import React from 'react';
import { DATEPICKER_VARIANTS, monitorRangeOptions, rangeOptions } from '../../constant';
import { StyledPresetList, StyledButton } from './styled';

const DatePresets = ({ handlePresetFilter, togglePopover, variant }) => {
  const handleClick = (event) => {
    const { value } = event.currentTarget.dataset;
    handlePresetFilter({ target: { value } });
    togglePopover();
  };
  const optionsToDisplay = variant === DATEPICKER_VARIANTS.monitor ? monitorRangeOptions : rangeOptions;

  return (
    <StyledPresetList>
      {optionsToDisplay.map((range) => (
        <li key={range.value}>
          <StyledButton type="button" data-value={range.value} onClick={handleClick}>
            {range.text.text}
          </StyledButton>
        </li>
      ))}
    </StyledPresetList>
  );
};

DatePresets.propTypes = {
  handlePresetFilter: PropTypes.func.isRequired,
  togglePopover: PropTypes.func.isRequired,
  variant: oneOf(Object.keys(DATEPICKER_VARIANTS)),
};
DatePresets.defaultProps = {
  variant: DATEPICKER_VARIANTS.insights,
};

export default DatePresets;
