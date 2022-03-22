import React from 'react';
import { useField } from 'formik';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import RadioGroup from '@material-ui/core/RadioGroup/RadioGroup';
import { L12, P, Radio } from '../../atoms';
import THEME from '../../../constants/theme';
import { StyledFormControlLabel } from './styled';
import { FlexContainer } from '../../atoms/flex/FlexContainer';

const Error = styled(L12)`
  margin-top: -10px;

  & + & {
    margin-top: 0;
  }
`;

export const StyledRadioGroup = styled(RadioGroup)`
  margin-top: 14px;
  width: 100%;
`;

const RadioGroupItem = ({ name, label, radioOptions }) => {
  const [{ value }, { touched, error }, { setValue }] = useField(name);
  const handleUpdate = (formData) => {
    setValue(formData);
  };

  return (
    <>
      <P fontSize="14px" fontWeight={600} width="100%" textAlign="left" margin="19px 0 0">
        {label}
      </P>
      <StyledRadioGroup aria-label="name-action" name="name-action" value={value}>
        <FlexContainer width="100%" justifyContent="flex-start">
          {(radioOptions || []).map((option) => (
            <StyledFormControlLabel
              key={option.label}
              checked={option.value === value}
              control={<Radio color="primary" />}
              onChange={() => handleUpdate(option.value)}
              label={<P>{option.label}</P>}
              disabled={false}
              margin="0 20px 0 0"
            />
          ))}
        </FlexContainer>
      </StyledRadioGroup>

      {touched &&
        error?.map((message) => (
          <Error key={message} data-cy="error" color={THEME.secondaryColors.danger}>
            {message}
          </Error>
        ))}
    </>
  );
};

RadioGroupItem.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  radioOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
};

export default RadioGroupItem;
