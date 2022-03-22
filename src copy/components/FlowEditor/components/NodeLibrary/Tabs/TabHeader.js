import React from 'react';
import PropTypes from 'prop-types';

import { StyledTabList, StyledTab } from './styled';
import { TABS, a11yProps } from './constant';
import { generateUserPilotAttribute } from '../../../../../constants/generateUserPilotLabel';
import { USER_PILOT_SECTION_ID } from '../../constant';

const ID = `node-tabs`;

const TabHeader = ({ setTabValue }) => {
  const handleChange = (event, newValue) => {
    event.stopPropagation();
    setTabValue(newValue);
  };

  return (
    <StyledTabList onChange={handleChange} aria-label={ID} id={ID}>
      {TABS.map(({ label, value }) => {
        const { id, ariaControls } = a11yProps(value);
        return (
          <StyledTab
            key={label}
            label={label}
            value={value}
            aria-controls={ariaControls}
            id={id}
            {...generateUserPilotAttribute(USER_PILOT_SECTION_ID, 'node-header', label)}
          />
        );
      })}
    </StyledTabList>
  );
};

TabHeader.propTypes = {
  setTabValue: PropTypes.func.isRequired,
};

export default TabHeader;
