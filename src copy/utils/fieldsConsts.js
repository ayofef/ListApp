import React from 'react';
import omit from 'lodash/omit';
import set from 'lodash/set';
import THEME from '../constants/theme';
import {
  Checkbox,
  CurrencyAmount,
  Date,
  Link,
  Merchant,
  Number,
  SimpleText,
  TextArea,
} from '../assets/icons/fieldTypesIcons';

export const formKeyList = {
  TEXT: {
    icon: <SimpleText />,
  },
  CURRENCY: {
    icon: <CurrencyAmount />,
  },
  NUMBER: {
    icon: <Number />,
  },
  AMOUNT: {
    icon: <CurrencyAmount />,
  },
  URL: {
    icon: <Link href="/#" />,
  },
  EXTERNAL_SELECT: {
    icon: <Merchant />,
  },
  LONG_TEXT: {
    icon: <TextArea />,
  },
  SELECT: {
    color: THEME.secondaryColors.darkBlue,
    icon: 'Sel',
  },
  CHECKBOXES: {
    icon: <Checkbox />,
  },
  DATE: {
    icon: <Date />,
  },
  CHECKBOX: {
    icon: <Checkbox />,
  },
  RADIO: {
    color: THEME.secondaryColors.darkBlue,
    icon: 'Rb',
  },
  ERROR: {
    color: THEME.secondaryColors.red,
    icon: 'Er',
  },
};

export const typeHandler = (field) => {
  const { element } = field;
  if (!element) {
    return null;
  }
  switch (element.type) {
    case 'plain_text_input': {
      switch (true) {
        case element['x-subtype'] === 'currency':
          return 'AMOUNT';
        case element['x-subtype'] === 'number':
          return 'NUMBER';
        case element.multiline:
          return 'LONG_TEXT';
        // eslint-disable-next-line
        case element['x-subtype'] === 'url':
          return 'URL';
        case element['x-subtype'] === 'copy_value':
          return 'COPY_FIELD';
        default:
          return 'TEXT';
      }
    }
    case 'static_select':
      return 'SELECT';
    case 'checkboxes':
      return 'CHECKBOXES';
    case 'external_select':
      return 'EXTERNAL_SELECT';
    case 'datepicker':
      return 'DATE';
    default:
      return 'ERROR';
  }
};

export const fieldSpecifics = {
  NUMBER: {
    'element.type': 'plain_text_input',
    'element.x-subtype': 'number',
  },
  AMOUNT: {
    'element.type': 'plain_text_input',
    'element.x-subtype': 'currency',
  },
  URL: {
    'element.x-subtype': 'url',
    'element.type': 'plain_text_input',
  },
  LONG_TEXT: {
    'element.multiline': true,
    'element.type': 'plain_text_input',
  },
  TEXT: {
    'element.type': 'plain_text_input',
  },
  EXTERNAL_SELECT: {
    'element.type': 'external_select',
  },
  SELECT: {
    'element.type': 'static_select',
    options: [
      {
        text: {
          type: 'plain_text',
          text: '*this is plain_text text*',
        },
        value: 'value-0',
      },
    ],
  },
  CHECKBOXES: {
    'element.type': 'checkboxes',
    options: [
      {
        text: {
          type: 'plain_text',
          text: '*this is plain_text text*',
        },
        value: 'value-0',
      },
    ],
  },
};

export const updateType = (newFieldType, field) => {
  const oldTypeField = typeHandler(field);
  const clearedObject = omit({ ...field }, [...Object.keys(fieldSpecifics[oldTypeField]), 'x-system']);
  Object.keys(fieldSpecifics[newFieldType]).forEach((fieldPath) => {
    set(clearedObject, fieldPath, fieldSpecifics[newFieldType][fieldPath]);
  });

  return clearedObject;
};

export const fieldTypeSelectOptions = [
  {
    ...formKeyList.TEXT,
    value: 'TEXT',
    text: { text: 'spendRequest.settings.fieldTypeText.shortText' },
  },
  {
    ...formKeyList.LONG_TEXT,
    value: 'LONG_TEXT',
    text: { text: 'spendRequest.settings.fieldTypeText.longText' },
  },

  {
    ...formKeyList.NUMBER,
    value: 'NUMBER',
    text: { text: 'spendRequest.settings.fieldTypeText.numberInput' },
  },
  {
    ...formKeyList.CHECKBOXES,
    value: 'CHECKBOXES',
    text: { text: 'spendRequest.settings.fieldTypeText.checkboxes' },
  },
  {
    ...formKeyList.SELECT,
    value: 'SELECT',
    text: { text: 'spendRequest.settings.fieldTypeText.select' },
  },
  {
    ...formKeyList.URL,
    value: 'URL',
    text: { text: 'spendRequest.settings.fieldTypeText.url' },
  },
  {
    ...formKeyList.EXTERNAL_SELECT,
    value: 'EXTERNAL_SELECT',
    text: { text: 'spendRequest.settings.fieldTypeText.merchantSelect' },
  },
];

export const emptyOption = {
  text: {
    type: 'plain_text',
    text: '',
  },
  value: '',
};

export const emptyField = {
  type: 'input',
  label: {
    type: 'plain_text',
    text: 'Label of input',
  },
  element: {
    type: 'plain_text_input',
    action_id: 'plain_input',
    placeholder: {
      type: 'plain_text',
      text: 'Enter some plain text',
    },
  },
};
