import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { StyledLabel, StyledRadio, StyledFormControlLabel } from './styled';

const InputGroup = ({ value, color, control }) => {
  const { t } = useTranslation();

  return (
    <StyledFormControlLabel
      value={value}
      control={<StyledRadio color="default" brandcolor={color} display={control ? 1 : 0} />}
      display={control ? 1 : 0}
      label={
        <StyledLabel
          brandcolor={color}
          type={control ? value : 'SOLID'}
          control={control}
          margin={control ? '0 24 0 0' : '4px'}
          padding="16px"
        >
          {control ? t('Action') : ''}
        </StyledLabel>
      }
      labelPlacement="top"
    />
  );
};

InputGroup.propTypes = {
  value: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  control: PropTypes.bool,
};
InputGroup.defaultProps = {
  control: true,
};
export default InputGroup;
