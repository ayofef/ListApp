import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import compact from 'lodash/compact';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from './Checkbox';
import CircleImage from '../../../../../table/CircleImage';

import { OptionsType, selectTypes } from './types';
import { StyledFormControlLabel } from './styled';

const MultiSelect = ({ options, selectedOptionIds, onSelect, selectType, selectAll }) => {
  const _onSelect = ({ target }) => {
    const { name, checked } = target;
    if (checked) {
      onSelect(compact([...(selectedOptionIds ?? []), name]));
    } else {
      onSelect((selectedOptionIds ?? []).filter((id) => id !== name));
    }
  };

  return (
    <FormControl component="fieldset" fullWidth>
      {options.map(({ value, title, company, avatar }) => (
        <StyledFormControlLabel
          key={value}
          value={value}
          control={<Checkbox name={value} color="primary" size="small" />}
          label={
            <>
              {selectType === selectTypes.connections && (
                <Box display="flex" alignItems="center">
                  <CircleImage logo={company?.logo} text={title} size={24} />
                  <Box ml={1}>{title}</Box>
                </Box>
              )}
              {selectType === selectTypes.people && (
                <Box display="flex" alignItems="center">
                  <CircleImage logo={avatar} text={title} size={32} />
                  <Box ml={2}>{title}</Box>
                </Box>
              )}
              {!selectType && title}
            </>
          }
          checked={(selectedOptionIds ?? []).includes(value)}
          onChange={_onSelect}
          selectType={selectType}
          selectAll={selectAll}
        />
      ))}
    </FormControl>
  );
};

MultiSelect.propTypes = {
  options: OptionsType,
  selectedOptionIds: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func.isRequired,
  selectType: PropTypes.oneOf([selectTypes.connections, selectTypes.people]),
  selectAll: PropTypes.bool,
};

MultiSelect.defaultProps = {
  options: [],
  selectedOptionIds: [],
  selectType: '',
  selectAll: false,
};

export default MultiSelect;
