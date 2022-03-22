import React, { useCallback, useMemo } from 'react';
import { shape, string, arrayOf, bool } from 'prop-types';
import { Formik } from 'formik';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import FilterForm from './FilterForm';
import useFilter from '../../../hooks/useFilter';
import useSearch from '../../../hooks/useSearch';
import { isDefined } from '../../../utils/helpers';

const transformFilterValues = (values) =>
  Object.entries(values).reduce((acc, [key, value]) => {
    let fieldValue = value || undefined;

    if (typeof fieldValue === 'object') {
      fieldValue = pickBy(fieldValue, identity);
    }

    return fieldValue ? { ...acc, [key]: fieldValue } : acc;
  }, {});

const FilterList = ({ fields, validationSchema, defaultValues, customIsClearDisabled, filterKeysToMerge }) => {
  const [filter, setFilter] = useFilter();
  const [searchParams, setSearchParams] = useSearch();
  console.log('🚀 ~ file: index.js ~ line 38 ~ FilterList ~ filter', filter);

  const initialValues = useMemo(
    () =>
      fields.reduce(
        (acc, { name }) => ({
          ...acc,
          [name]: filter[name] || defaultValues[name],
        }),
        {}
      ),
    [filter, filter.issueStatus?.length, fields, defaultValues]
  );
  const onSubmitHandler = useCallback(
    (values, actions) => {
      actions.setSubmitting(true);
      const transformedValues = transformFilterValues(values);
      const filtersToMerge = filterKeysToMerge?.reduce(
        (acc, current) => ({ ...acc, [current]: filter[current] || undefined }),
        {}
      );

      const newFilter = !isEmpty(filterKeysToMerge) ? { ...filtersToMerge, ...transformedValues } : transformedValues;

      // reset the page when new filters are applied
      if (isDefined(searchParams?.page)) {
        setSearchParams(omit(searchParams, 'page'));
      }

      setFilter(newFilter);
      actions.setSubmitting(false);
    },
    [setFilter, filter, filterKeysToMerge, searchParams, setSearchParams]
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmitHandler}
      enableReinitialize
    >
      <FilterForm fields={fields} defaultValues={defaultValues} customIsClearDisabled={customIsClearDisabled} />
    </Formik>
  );
};

FilterList.propTypes = {
  fields: arrayOf(
    shape({
      name: string,
    })
  ).isRequired,
  validationSchema: shape({}).isRequired,
  defaultValues: shape({}).isRequired,
  customIsClearDisabled: bool,
  filterKeysToMerge: arrayOf(string),
};
FilterList.defaultProps = {
  customIsClearDisabled: false,
  filterKeysToMerge: [],
};

export default FilterList;
