import PropTypes from 'prop-types';
import React from 'react';
import capitalize from '@material-ui/core/utils/capitalize';
import Box from '@material-ui/core/Box';
import IdInput from './IdInput';
import Input from '../../../../components/forms/_common/Input';
import { P16B } from '../../../../components/atoms';
import PhoneInput from './PhoneInput';
import CardData from './CardData';
import CountrySelect from './CountrySelect';
import CustomerIdInput from './CustomerIdInput';

const LABEL_PROPS = {
  fontWeight: '600 !important',
  fontSize: '12px',
  lineHeight: '12px',
};

const COMPONENT_MAP = {
  id: IdInput,
  input: Input,
  phone: PhoneInput,
  cardData: CardData,
  countrySelect: CountrySelect,
  CustomerId: CustomerIdInput,
};

const CreateCustomerForm = ({ fieldsArr }) => {
  return (
    <>
      {fieldsArr.map(({ name, type, componentType, fields, label, placeholder }) => {
        const Component = COMPONENT_MAP[componentType] ?? COMPONENT_MAP.input;

        if (fields) {
          return (
            <Box>
              <P16B margin="32px 0 16px 0">{capitalize(name)}</P16B>
              <CreateCustomerForm fieldsArr={fields} />
            </Box>
          );
        }

        return (
          <Component
            key={name}
            name={name}
            label={capitalize(label ?? name ?? '')}
            type={type}
            field={fields}
            customLabel
            customLabelProps={LABEL_PROPS}
            placeholder={placeholder}
          />
        );
      })}
    </>
  );
};

CreateCustomerForm.propTypes = {
  fieldsArr: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default CreateCustomerForm;
