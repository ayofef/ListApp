import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes, { arrayOf, node, oneOfType, shape, string } from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import isEqual from 'lodash/isEqual';
import Checkbox from './Checkbox';
import { StyledFormControlLabel } from './styled';

const DataLookupAllConnectionsSelect = ({ options, selectedTypes, onSelect, selectType }) => {
  const _onSelect = ({ target }) => {
    const { name, checked } = target;
    if (checked) {
      onSelect(name?.split(','));
    } else {
      onSelect([]);
    }
  };

  return (
    <Box mb="8px">
      <FormControl component="fieldset" fullWidth>
        <StyledFormControlLabel
          key={options?.value}
          value={options?.value}
          control={<Checkbox name={options?.value} color="primary" size="small" />}
          label={<Box order={1}>{options?.title}</Box>}
          checked={isEqual(options?.value, selectedTypes)}
          onChange={_onSelect}
          selectType={selectType}
        />
      </FormControl>
    </Box>
  );
};

DataLookupAllConnectionsSelect.propTypes = {
  options: shape({ value: string.isRequired, title: oneOfType([node, arrayOf(node)]) }),
  selectedTypes: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func.isRequired,
  selectType: PropTypes.string.isRequired,
};

DataLookupAllConnectionsSelect.defaultProps = {
  options: [],
  selectedTypes: [],
};

export default DataLookupAllConnectionsSelect;
