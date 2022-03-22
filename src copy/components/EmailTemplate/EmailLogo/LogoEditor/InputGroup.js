import React from 'react';
import PropTypes from 'prop-types';
import { Box, capitalize } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { v4 as uniqueID } from 'uuid';
import { P14B } from '../../../atoms';
import { StyledLabel, StyledFlexWrapper } from './styled';

import left from '../../../../assets/img/AlignLeft.svg';
import right from '../../../../assets/img/AlignRight.svg';
import center from '../../../../assets/img/AlignCenter.svg';

const icons = {
  left,
  center,
  right,
};

const InputGroup = ({ formGroup, options, type, defaultValue, handleChange }) => {
  const { t } = useTranslation();

  const handleInputChange = (e) => {
    handleChange({ type, value: e.target.value });
  };

  return (
    <Box>
      <P14B margin="0 0 16px 0">{t(formGroup)}</P14B>

      <StyledFlexWrapper
        width="240px"
        onChange={handleInputChange}
        borderRadius="8px"
        overflow="hidden"
        boxShadow="0px 0px 0px 2px rgba(155, 159, 171, 0.11)"
      >
        {options.map((el) => (
          <StyledLabel key={uniqueID()}>
            <input type="radio" value={el} name={type} checked={el === defaultValue.toLowerCase()} readOnly />
            <Box padding="8px" color="initial" width="100%" height="100%" display="block">
              {icons[el] ? <img src={icons[el]} alt={el} /> : capitalize(el === 'img' ? 'Logo' : el)}
            </Box>
          </StyledLabel>
        ))}
      </StyledFlexWrapper>
    </Box>
  );
};

InputGroup.propTypes = {
  formGroup: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.oneOf(['logoType', 'logoSize', 'logoPosition']).isRequired,
  defaultValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default InputGroup;
