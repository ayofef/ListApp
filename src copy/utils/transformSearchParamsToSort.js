import { PAYMENT_FIELDS } from '../constants/paymentFields';

const DICTIONARY = {
  [PAYMENT_FIELDS.processor]: 'payment_gateway_name',
  [PAYMENT_FIELDS.customer]: 'payment_customer',
  [PAYMENT_FIELDS.method]: 'payment_method_details',
};

const renameField = (fieldName) => DICTIONARY[fieldName] ?? fieldName;
/**
 * @param {Object.<string, 'asc'|'desc'>} sort
 *
 * @return {Array<{ fieldName: string, order: 'ASC'|'DESC' }>}
 * */
const transformSearchParamsToSort = (sort) =>
  Object.entries(sort).reduce(
    (acc, [fieldName, order]) => [...acc, { fieldName: renameField(fieldName), order: order?.toUpperCase() }],
    []
  );

export { transformSearchParamsToSort };
