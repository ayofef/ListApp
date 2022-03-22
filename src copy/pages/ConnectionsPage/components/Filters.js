import React, { useState } from 'react';
import { string, arrayOf, shape } from 'prop-types';

import Box from '@material-ui/core/Box';
import { StyledFormControlLabel } from '../styled';
import { Checkbox } from '../../../components/atoms';
import useSearch from '../../../hooks/useSearch';
import Select from '../../Payments/FilterList/fields/Select';
import { StyledFlexContainer, StyledListItem } from './styled';

const showField = ({ key, children = [] }) => {
  return (key === 'category' && children.length > 0) || key !== 'category';
};

const FiltersList = ({ fields }) => {
  const [searchParams, setSearchParams] = useSearch();
  const [active, setActive] = useState(searchParams || {});
  const handleChange = (key, children) => {
    const newParams = {
      ...active,
      [key]: !active[key],
    };

    Object.keys(newParams).forEach((paramKey) => {
      if (newParams[paramKey] === false) {
        delete newParams[paramKey];
      }
    });

    if (newParams[key] === false) {
      delete newParams[key];
      setSearchParams(newParams);
    }

    setActive(newParams);

    if (children?.length > 0 && !active[key]) {
      return;
    }

    setSearchParams(newParams);
  };

  const handleSelect = (value, key) => {
    setActive({ ...active, [key]: value });
    setSearchParams({ ...active, [key]: value });
  };
  return (
    <StyledFlexContainer flexWrap>
      {fields.map(({ label, key, children }) => (
        <React.Fragment key={key}>
          {showField({ key, children }) && (
            <StyledListItem dense>
              <Box width="100%" p="10px 16px" bgcolor={active[key] ? '#DDE1E6' : '#EAECEE'} borderRadius="6px">
                <StyledFormControlLabel
                  control={
                    <Checkbox
                      defaultChecked={active[key]}
                      onChange={() => handleChange(key, children)}
                      name={label}
                      color="primary"
                    />
                  }
                  label={
                    <Box mt="-5px" ml="4px">
                      {label}
                    </Box>
                  }
                />
                {children?.length > 0 && active[key] && (
                  <Box mt="6px" mb="12px" width>
                    <Select
                      value={active[key]}
                      options={children}
                      onChange={(e) => handleSelect(e.target.value, key)}
                    />
                  </Box>
                )}
              </Box>
            </StyledListItem>
          )}
        </React.Fragment>
      ))}
    </StyledFlexContainer>
  );
};

FiltersList.propTypes = {
  fields: arrayOf({
    label: string,
    key: string,
    children: arrayOf(shape({})),
  }).isRequired,
};

export default FiltersList;
