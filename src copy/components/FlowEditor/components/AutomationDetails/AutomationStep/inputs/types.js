import { arrayOf, node, oneOfType, shape, string } from 'prop-types';

export const OptionsType = arrayOf(shape({ value: string.isRequired, title: oneOfType([node, arrayOf(node)]) }));

export const selectTypes = {
  connections: 'connections',
  people: 'people',
};
