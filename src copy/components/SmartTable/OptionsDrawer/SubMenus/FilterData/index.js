import React from 'react';
import Box from '@material-ui/core/Box';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { FIELDS, DEFAULT_VALUES, validationSchema } from '../../../../../pages/Payments/FilterList/fieldsSettings';
import FilterList from '../../../../../pages/Payments/FilterList';
import { CUSTOMER_FIELDS, CUSTOMER_DEFAULT_VALUES, customerValidationSchema } from './customerFilterData';
import { CARD_FIELDS, cardValidationSchema, CARD_DEFAULT_VALUES } from './cardFilterData';

const FilterData = () => {
  const { pathname } = useLocation();
  const { params } = useRouteMatch(pathname.includes('payments') ? '/payments' : '/data-tables/:page');

  const { page } = params;

  return (
    <Box mt="-6px" height="90vh" overflow="hidden">
      {!page && <FilterList fields={FIELDS} defaultValues={DEFAULT_VALUES} validationSchema={validationSchema} />}
      {page === 'customers' && (
        <FilterList
          fields={CUSTOMER_FIELDS}
          defaultValues={CUSTOMER_DEFAULT_VALUES}
          validationSchema={customerValidationSchema}
        />
      )}
      {page === 'cards' && (
        <FilterList fields={CARD_FIELDS} defaultValues={CARD_DEFAULT_VALUES} validationSchema={cardValidationSchema} />
      )}
    </Box>
  );
};
export default FilterData;
