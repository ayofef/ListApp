import React from 'react';

/**
 * @typedef {Object} Field
 * @property {string} name
 * @property {string} label
 * @property {Function} component
 * @property {Object} props
 * @property {Object} defaultValue
 * @property {Object} schema
 * */

/**
 * @param {Field[]} fields
 * */
const createFilterPropsFromSettings = (fields) =>
  fields.reduce(
    (acc, { name, label, component: Component, props, defaultValue, schema }) => {
      acc.FIELDS.push({
        name,
        label,
        component: () => <Component name={name} {...props} />,
      });
      acc.DEFAULT_VALUES[name] = defaultValue;

      if (schema) {
        acc.SHAPE[name] = schema;
      }

      return acc;
    },
    { FIELDS: [], SHAPE: {}, DEFAULT_VALUES: {} }
  );

export { createFilterPropsFromSettings };
