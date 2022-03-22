import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import RadioGroup from '@material-ui/core/RadioGroup';
import Box from '@material-ui/core/Box';
import { StyledFormControlLabel } from './styled';
import { CircleImage, Radio } from '../../../../../atoms';
import { selectTypes } from './types';

const RadioButtons = ({ name, options = [], value, onChange, selectType }) => {
  return (
    <FormControl component="fieldset" fullWidth>
      <RadioGroup aria-label={name} name={name} value={value} onChange={onChange} selectType={selectType}>
        {options.map(({ value: val, title, company }) => (
          <StyledFormControlLabel
            key={val}
            value={val}
            control={<Radio color="primary" size="small" />}
            label={
              <>
                {selectType === selectTypes.connections && (
                  <Box display="flex" alignItems="center">
                    {company && <CircleImage src={company?.logo} alt={title} size="24" />}
                    <Box ml={1}> {title}</Box>
                  </Box>
                )}
                {selectType === selectTypes.people && (
                  <Box display="flex" alignItems="center">
                    <CircleImage src={company?.logo} alt={title} size="24" />
                    <Box ml={1}> {title}</Box>
                  </Box>
                )}
                {!selectType && title}
              </>
            }
            name={name}
            selected={val === value}
            selectType={selectType}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

RadioButtons.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selectType: PropTypes.oneOf([selectTypes.connections, selectTypes.people]),
};

RadioButtons.defaultProps = {
  selectType: '',
};

export default RadioButtons;
