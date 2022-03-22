import React, { useCallback } from 'react';
import { useField } from 'formik';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { InputField, L12, P } from '../../atoms';
import THEME from '../../../constants/theme';

const Error = styled(L12)`
  margin-top: 8px;
  font-weight: 500;

  & + & {
    margin-top: 0;
  }
`;

const Label = styled.label`
  display: block;
  text-align: left;
  width: 100%;

  > p:nth-child(1) {
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
  }
`;

const Input = ({
  name,
  type,
  label,
  customLabel,
  customLabelProps,
  normalize,
  normalizeProps,
  customErrorProps,
  skipError,
  width,
  ...rest
}) => {
  const [{ value, onBlur }, { touched, error }, { setValue }] = useField(name);
  const { t } = useTranslation();
  const handleOnChange = useCallback(
    (e) => {
      const { value: _value } = e.target;

      if (normalize) {
        setValue(normalize(_value, normalizeProps));
        return;
      }
      setValue(_value);
    },
    [setValue, normalize, normalizeProps]
  );

  return (
    <Box mb="16px" width={width}>
      <Label>
        {customLabel && (
          <P
            fontSize="12px !important"
            fontWeight={600}
            width="100%"
            textAlign="left"
            lineHeight="30px"
            {...(customLabelProps && customLabelProps)}
          >
            {t(label)}
          </P>
        )}

        <InputField
          {...rest}
          variant="outlined"
          type={type}
          autoComplete="new-password"
          name={name}
          label={!customLabel && label}
          value={value}
          onChange={handleOnChange}
          onBlur={onBlur}
        />
      </Label>

      {touched && !skipError && Array.isArray(error)
        ? error?.map((message) => (
            <Error
              key={message}
              data-cy="error"
              color={THEME.secondaryColors.danger}
              {...(customErrorProps && customErrorProps)}
            >
              {t(message)}
            </Error>
          ))
        : touched &&
          !skipError && (
            <Error data-cy="error" color={THEME.secondaryColors.danger} {...(customErrorProps && customErrorProps)}>
              {t(error)}
            </Error>
          )}
    </Box>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  customLabel: PropTypes.bool,
  type: PropTypes.oneOf(['text', 'password', 'email']).isRequired,
  customLabelProps: PropTypes.shape({}),
  normalize: PropTypes.func,
  customErrorProps: PropTypes.shape({}),
  normalizeProps: PropTypes.shape({}),
  skipError: PropTypes.bool,
  width: PropTypes.string,
};

Input.defaultProps = {
  customLabel: null,
  customLabelProps: {},
  normalize: undefined,
  customErrorProps: {},
  normalizeProps: {},
  skipError: false,
  width: undefined,
};

export default Input;
export { Label, Error };
