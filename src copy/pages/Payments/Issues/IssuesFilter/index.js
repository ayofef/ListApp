import React from 'react';
import { DEFAULT_VALUES, FIELDS, validationSchema } from './fieldsSettings';
import FilterList from '../../FilterList';

const IssuesFilter = () => (
  <FilterList fields={FIELDS} defaultValues={DEFAULT_VALUES} validationSchema={validationSchema} />
);

export default IssuesFilter;
