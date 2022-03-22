import React from 'react';
import PropTypes from 'prop-types';
import TextEditorInput from './TextEditorInput';
import TextInput from './TextInput';
import EnumSelectInput from './EnumSelectInput';

const TYPES = {
  TEXT_EDITOR_INPUT: 'TEXT_EDITOR_INPUT',
  SELECT_DECLINE_CODE_INPUT: 'SELECT_DECLINE_CODE',
  TEXT_INPUT: 'TEXT_INPUT',
  ENUM_SELECT_INPUT: 'ENUM_SELECT_INPUT',
};

const INPUTS = {
  [TYPES.TEXT_EDITOR_INPUT]: TextEditorInput,
  [TYPES.TEXT_INPUT]: TextInput,
  [TYPES.ENUM_SELECT_INPUT]: EnumSelectInput,
};

const InputByType = ({ name, value, onChange, inputType, propertyType }) => {
  const Input = INPUTS[inputType];
  return Input && <Input name={name} value={value} onChange={onChange} propertyType={propertyType} />;
};

InputByType.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  inputType: PropTypes.oneOf(Object.values(TYPES)),
  propertyType: PropTypes.string,
};

InputByType.defaultProps = {
  inputType: TYPES.TEXT_INPUT,
  propertyType: 'STRING',
};

export { TYPES };
export default InputByType;
